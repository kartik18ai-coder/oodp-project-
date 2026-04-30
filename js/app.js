// ===== MedCore HMS - Application Logic =====

// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    item.classList.add('active');
    document.getElementById('page-' + item.dataset.page).classList.add('active');
    if (window.innerWidth < 768) document.getElementById('sidebar').classList.remove('open');
  });
});

document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

// Modal helpers
function openModal(id) {
  document.getElementById(id).classList.add('active');
  populateSelects();
}
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

function populateSelects() {
  const doctorSelects = ['pDoctor', 'aDoctor', 'rxDoctor'];
  const patientSelects = ['aPatient', 'rxPatient', 'bPatient'];
  doctorSelects.forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.innerHTML = DataStore.doctors.map(d => `<option>${d.name}</option>`).join(''); }
  });
  patientSelects.forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.innerHTML = DataStore.patients.map(p => `<option>${p.name}</option>`).join(''); }
  });
}

// ===== RENDER FUNCTIONS =====

function renderDashboard() {
  const s = DataStore.getStats();
  document.getElementById('dashboardCards').innerHTML = `
    <div class="summary-card"><div class="card-icon"><i class="fas fa-users"></i></div><div class="value">${s.totalPatients}</div><div class="label">Total Patients</div></div>
    <div class="summary-card"><div class="card-icon"><i class="fas fa-user-md"></i></div><div class="value">${s.activeDoctors}</div><div class="label">Active Doctors</div></div>
    <div class="summary-card"><div class="card-icon"><i class="fas fa-calendar-check"></i></div><div class="value">${s.totalAppointments}</div><div class="label">Appointments</div></div>
    <div class="summary-card"><div class="card-icon"><i class="fas fa-dollar-sign"></i></div><div class="value">$${s.totalRevenue.toLocaleString()}</div><div class="label">Revenue</div></div>`;
  renderCharts();
}

let weeklyChartInst, statusChartInst;
function renderCharts() {
  if (weeklyChartInst) weeklyChartInst.destroy();
  if (statusChartInst) statusChartInst.destroy();
  const ctx1 = document.getElementById('weeklyChart').getContext('2d');
  weeklyChartInst = new Chart(ctx1, {
    type: 'bar',
    data: { labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], datasets: [{ label: 'Appointments', data: [8,12,6,14,10,4,2], backgroundColor: 'rgba(37,99,235,.7)', borderRadius: 6 }] },
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: '#f1f5f9' } }, x: { grid: { display: false } } } }
  });
  const confirmed = DataStore.appointments.filter(a => a.status === 'Confirmed').length;
  const pending = DataStore.appointments.filter(a => a.status === 'Pending').length;
  const ctx2 = document.getElementById('statusChart').getContext('2d');
  statusChartInst = new Chart(ctx2, {
    type: 'doughnut',
    data: { labels: ['Confirmed','Pending'], datasets: [{ data: [confirmed, pending], backgroundColor: ['#10b981','#f59e0b'], borderWidth: 0 }] },
    options: { responsive: true, cutout: '65%', plugins: { legend: { position: 'bottom' } } }
  });
}

function renderPatients(filter = '') {
  const f = filter.toLowerCase();
  const rows = DataStore.patients.filter(p => !f || p.name.toLowerCase().includes(f) || p.condition.toLowerCase().includes(f));
  document.getElementById('patientsTable').innerHTML = rows.map((p, i) => `<tr>
    <td><strong>${p.name}</strong></td><td>${p.age}</td><td>${p.gender}</td><td>${p.phone}</td><td>${p.bloodGroup}</td><td>${p.condition}</td><td>${p.doctor}</td>
    <td><span class="status-badge status-${p.status.toLowerCase()}">${p.status}</span></td>
    <td><div class="action-btns">
      <button class="btn btn-sm btn-primary btn-icon" title="View" onclick="showDesc('patient',${i})"><i class="fas fa-eye"></i></button>
      <button class="btn btn-sm btn-warning btn-icon" title="Edit" onclick="editPatient(${i})"><i class="fas fa-edit"></i></button>
      <button class="btn btn-sm btn-danger btn-icon" title="Delete" onclick="deleteItem('patients',${i})"><i class="fas fa-trash"></i></button>
    </div></td></tr>`).join('');
}

function renderDoctors(filter = '') {
  const f = filter.toLowerCase();
  const rows = DataStore.doctors.filter(d => !f || d.name.toLowerCase().includes(f) || d.specialty.toLowerCase().includes(f));
  document.getElementById('doctorsTable').innerHTML = rows.map((d, i) => `<tr>
    <td><strong>${d.name}</strong></td><td>${d.specialty}</td><td>${d.phone}</td><td>${d.experience}</td><td>${d.patients}</td><td>⭐ ${d.rating}</td>
    <td><span class="status-badge status-${d.status.toLowerCase()}">${d.status}</span></td>
    <td><div class="action-btns">
      <button class="btn btn-sm btn-primary btn-icon" title="View" onclick="showDesc('doctor',${i})"><i class="fas fa-eye"></i></button>
      <button class="btn btn-sm btn-warning btn-icon" title="Edit Status" onclick="editDoctor(${i})"><i class="fas fa-edit"></i></button>
      <button class="btn btn-sm btn-danger btn-icon" title="Delete" onclick="deleteItem('doctors',${i})"><i class="fas fa-trash"></i></button>
    </div></td></tr>`).join('');
}

function renderAppointments(filter = '') {
  const f = filter.toLowerCase();
  const rows = DataStore.appointments.filter(a => !f || a.patient.toLowerCase().includes(f) || a.doctor.toLowerCase().includes(f));
  document.getElementById('appointmentsTable').innerHTML = rows.map((a, i) => `<tr>
    <td><strong>${a.patient}</strong></td><td>${a.doctor}</td><td>${a.date}</td><td>${a.time}</td>
    <td><span class="status-badge ${a.type === 'Emergency' ? 'status-inactive' : 'status-active'}">${a.type}</span></td>
    <td><span class="status-badge status-${a.status.toLowerCase()}">${a.status}</span></td>
    <td><div class="action-btns">
      <button class="btn btn-sm btn-primary btn-icon" title="View" onclick="showDesc('appointment',${i})"><i class="fas fa-eye"></i></button>
      <button class="btn btn-sm btn-warning btn-icon" title="Edit" onclick="editAppointment(${i})"><i class="fas fa-edit"></i></button>
      <button class="btn btn-sm btn-danger btn-icon" title="Delete" onclick="deleteItem('appointments',${i})"><i class="fas fa-trash"></i></button>
    </div></td></tr>`).join('');
}

function renderPrescriptions(filter = '') {
  const f = filter.toLowerCase();
  const rows = DataStore.prescriptions.filter(p => !f || p.patient.toLowerCase().includes(f) || p.diagnosis.toLowerCase().includes(f));
  document.getElementById('prescriptionsTable').innerHTML = rows.map((p, i) => `<tr>
    <td><strong style="color:var(--primary)">${p.id}</strong></td><td><strong>${p.patient}</strong></td><td>${p.doctor}</td><td>${p.diagnosis}</td><td>${p.date}</td><td>${p.duration}</td>
    <td><span class="status-badge status-${p.status.toLowerCase()}">${p.status}</span></td>
    <td><div class="action-btns">
      <button class="btn btn-sm btn-primary btn-icon" title="View" onclick="viewPrescription(${i})"><i class="fas fa-eye"></i></button>
      <button class="btn btn-sm btn-danger btn-icon" title="Delete" onclick="deleteItem('prescriptions',${i})"><i class="fas fa-trash"></i></button>
    </div></td></tr>`).join('');
}

function renderBilling(filter = '') {
  const s = DataStore.getStats();
  document.getElementById('billingCards').innerHTML = `
    <div class="summary-card"><div class="card-icon"><i class="fas fa-dollar-sign"></i></div><div class="value">$${s.totalRevenue.toLocaleString()}</div><div class="label">Total Revenue</div></div>
    <div class="summary-card"><div class="card-icon"><i class="fas fa-check-circle"></i></div><div class="value">$${s.collected.toLocaleString()}</div><div class="label">Collected</div></div>
    <div class="summary-card"><div class="card-icon"><i class="fas fa-clock"></i></div><div class="value">$${s.pending.toLocaleString()}</div><div class="label">Pending</div></div>`;
  const f = filter.toLowerCase();
  const rows = DataStore.billing.filter(b => !f || b.patient.toLowerCase().includes(f) || b.id.toLowerCase().includes(f));
  document.getElementById('billingTable').innerHTML = rows.map((b, i) => `<tr>
    <td><strong>${b.id}</strong></td><td>${b.patient}</td><td>${b.date}</td><td>${b.description}</td><td><strong>$${b.amount}</strong></td><td>${b.method}</td>
    <td><span class="status-badge status-${b.status.toLowerCase()}">${b.status}</span></td>
    <td><div class="action-btns">
      <button class="btn btn-sm btn-primary btn-icon" title="View Invoice" onclick="viewInvoice(${i})"><i class="fas fa-eye"></i></button>
      <button class="btn btn-sm btn-${b.status === 'Paid' ? 'success' : 'warning'} btn-icon" title="${b.status === 'Paid' ? 'Mark Unpaid' : 'Mark as Paid'}" onclick="toggleBillingStatus(${i})"><i class="fas fa-check"></i></button>
      <button class="btn btn-sm btn-danger btn-icon" title="Delete" onclick="deleteItem('billing',${i})"><i class="fas fa-trash"></i></button>
    </div></td></tr>`).join('');
}

function renderReports() {
  const s = DataStore.getStats();
  document.getElementById('reportCards').innerHTML = `
    <div class="summary-card"><div class="card-icon"><i class="fas fa-users"></i></div><div class="value">${s.totalPatients}</div><div class="label">Total Patients</div></div>
    <div class="summary-card"><div class="card-icon"><i class="fas fa-user-md"></i></div><div class="value">${s.activeDoctors}</div><div class="label">Total Doctors</div></div>
    <div class="summary-card"><div class="card-icon"><i class="fas fa-coins"></i></div><div class="value">$${s.totalRevenue.toLocaleString()}</div><div class="label">Total Revenue</div></div>
    <div class="summary-card"><div class="card-icon"><i class="fas fa-hand-holding-usd"></i></div><div class="value">$${s.collected.toLocaleString()}</div><div class="label">Collected</div></div>`;
  const maxP = Math.max(...DataStore.departments.map(d => d.patients));
  document.getElementById('deptBars').innerHTML = DataStore.departments.map(d => `
    <div class="dept-bar"><div class="bar-value">${d.patients}</div><div class="bar" style="height:${(d.patients/maxP)*150}px;background:${d.color}"></div><div class="bar-label">${d.name}</div></div>`).join('');
  document.getElementById('summaryList').innerHTML = `
    <li>🏥 System is running optimally</li>
    <li>📈 Revenue up 15% this month</li>
    <li>🏢 ${DataStore.departments.length} departments active</li>
    <li>⭐ Average rating: ${(DataStore.doctors.reduce((s,d)=>s+d.rating,0)/DataStore.doctors.length).toFixed(1)}/5.0</li>
    <li>✅ ${Math.round(DataStore.appointments.filter(a=>a.status==='Confirmed').length/DataStore.appointments.length*100)}% appointments confirmed</li>`;
}

// ===== CRUD OPERATIONS =====

function addPatient() {
  const name = document.getElementById('pName').value;
  if (!name) return alert('Please enter patient name');
  DataStore.patients.push({
    id: 'P-' + String(DataStore.patients.length + 1).padStart(3, '0'),
    name, age: +document.getElementById('pAge').value, gender: document.getElementById('pGender').value,
    phone: document.getElementById('pPhone').value, bloodGroup: document.getElementById('pBlood').value,
    condition: document.getElementById('pCondition').value, doctor: document.getElementById('pDoctor').value,
    status: 'Active', description: document.getElementById('pDesc').value || 'No description provided.'
  });
  closeModal('patientModal'); renderAll();
}

function addDoctor() {
  const name = document.getElementById('dName').value;
  if (!name) return alert('Please enter doctor name');
  DataStore.doctors.push({
    id: 'D-' + String(DataStore.doctors.length + 1).padStart(3, '0'),
    name, specialty: document.getElementById('dSpecialty').value, phone: document.getElementById('dPhone').value,
    experience: document.getElementById('dExp').value, patients: 0, rating: 4.5, status: 'Active',
    description: document.getElementById('dDesc').value || 'No description provided.'
  });
  closeModal('doctorModal'); renderAll();
}

function addAppointment() {
  DataStore.appointments.push({
    id: 'A-' + String(DataStore.appointments.length + 1).padStart(3, '0'),
    patient: document.getElementById('aPatient').value, doctor: document.getElementById('aDoctor').value,
    date: document.getElementById('aDate').value, time: document.getElementById('aTime').value,
    type: document.getElementById('aType').value, status: document.getElementById('aStatus').value,
    description: document.getElementById('aDesc').value || 'No description provided.'
  });
  closeModal('appointmentModal'); renderAll();
}

function addPrescription() {
  const meds = document.getElementById('rxMeds').value.split('\n').filter(m => m.trim());
  DataStore.prescriptions.push({
    id: 'RX-' + String(DataStore.prescriptions.length + 1).padStart(3, '0'),
    patient: document.getElementById('rxPatient').value, doctor: document.getElementById('rxDoctor').value,
    diagnosis: document.getElementById('rxDiag').value, date: new Date().toISOString().split('T')[0],
    duration: document.getElementById('rxDur').value, status: 'Active', medications: meds,
    followUp: document.getElementById('rxFollow').value,
    description: document.getElementById('rxDesc').value || 'No additional notes.'
  });
  closeModal('prescriptionModal'); renderAll();
}

function addInvoice() {
  DataStore.billing.push({
    id: 'INV-2026-' + String(DataStore.billing.length + 1).padStart(3, '0'),
    patient: document.getElementById('bPatient').value, date: document.getElementById('bDate').value,
    description: document.getElementById('bDescInput').value, amount: +document.getElementById('bAmount').value,
    method: document.getElementById('bMethod').value, status: document.getElementById('bStatus').value
  });
  closeModal('billingModal'); renderAll();
}

function deleteItem(collection, index) {
  if (confirm('Are you sure you want to delete this record?')) {
    DataStore[collection].splice(index, 1);
    renderAll();
  }
}

function editPatient(index) {
  const p = DataStore.patients[index];
  openModal('patientModal');
  document.getElementById('pName').value = p.name;
  document.getElementById('pAge').value = p.age;
  document.getElementById('pGender').value = p.gender;
  document.getElementById('pPhone').value = p.phone;
  document.getElementById('pBlood').value = p.bloodGroup;
  document.getElementById('pCondition').value = p.condition;
  document.getElementById('pDesc').value = p.description || '';
}

// ===== EDIT APPOINTMENT =====
let editApptIndex = -1;
function editAppointment(index) {
  editApptIndex = index;
  const a = DataStore.appointments[index];
  document.getElementById('eaPatient').value = a.patient;
  document.getElementById('eaDoctor').value = a.doctor;
  document.getElementById('eaDate').value = a.date;
  // Convert time like '09:00 AM' to 24h for input
  const timeParts = a.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (timeParts) {
    let h = parseInt(timeParts[1]);
    if (timeParts[3].toUpperCase() === 'PM' && h !== 12) h += 12;
    if (timeParts[3].toUpperCase() === 'AM' && h === 12) h = 0;
    document.getElementById('eaTime').value = String(h).padStart(2,'0') + ':' + timeParts[2];
  } else {
    document.getElementById('eaTime').value = a.time;
  }
  document.getElementById('eaType').value = a.type;
  document.getElementById('eaStatus').value = a.status;
  document.getElementById('eaDesc').value = a.description || '';
  openModal('editAppointmentModal');
}

function saveEditAppointment() {
  if (editApptIndex < 0) return;
  const a = DataStore.appointments[editApptIndex];
  a.date = document.getElementById('eaDate').value;
  const t = document.getElementById('eaTime').value;
  if (t) {
    const [hh, mm] = t.split(':');
    let h = parseInt(hh); const ampm = h >= 12 ? 'PM' : 'AM';
    if (h > 12) h -= 12; if (h === 0) h = 12;
    a.time = String(h).padStart(2,'0') + ':' + mm + ' ' + ampm;
  }
  a.type = document.getElementById('eaType').value;
  a.status = document.getElementById('eaStatus').value;
  a.description = document.getElementById('eaDesc').value;
  closeModal('editAppointmentModal');
  editApptIndex = -1;
  renderAll();
}

// ===== EDIT DOCTOR STATUS =====
let editDocIndex = -1;
function editDoctor(index) {
  editDocIndex = index;
  const d = DataStore.doctors[index];
  document.getElementById('edName').value = d.name;
  document.getElementById('edSpecialty').value = d.specialty;
  document.getElementById('edStatus').value = d.status;
  document.getElementById('edNotes').value = '';
  openModal('editDoctorModal');
}

function saveEditDoctor() {
  if (editDocIndex < 0) return;
  DataStore.doctors[editDocIndex].status = document.getElementById('edStatus').value;
  closeModal('editDoctorModal');
  editDocIndex = -1;
  renderAll();
}

// ===== TOGGLE BILLING STATUS =====
function toggleBillingStatus(index) {
  const b = DataStore.billing[index];
  b.status = b.status === 'Paid' ? 'Pending' : 'Paid';
  renderAll();
}

// ===== DESCRIPTION & PRINT =====

let currentDescType = '', currentDescIndex = 0;

function showDesc(type, index) {
  currentDescType = type; currentDescIndex = index;
  const panel = document.getElementById(type + 'DescPanel');
  const body = document.getElementById(type + 'DescBody');
  let item;
  if (type === 'patient') item = DataStore.patients[index];
  else if (type === 'doctor') item = DataStore.doctors[index];
  else if (type === 'appointment') item = DataStore.appointments[index];
  
  panel.style.display = 'block';
  body.innerHTML = `<div class="desc-card">
    <h4>${item.name || item.patient}</h4>
    <p>${item.description || 'No description available.'}</p>
    <div class="meta">
      ${type === 'patient' ? `<span><i class="fas fa-tint"></i> ${item.bloodGroup}</span><span><i class="fas fa-stethoscope"></i> ${item.condition}</span><span><i class="fas fa-user-md"></i> ${item.doctor}</span>` : ''}
      ${type === 'doctor' ? `<span><i class="fas fa-briefcase-medical"></i> ${item.specialty}</span><span><i class="fas fa-clock"></i> ${item.experience}</span><span>⭐ ${item.rating}</span>` : ''}
      ${type === 'appointment' ? `<span><i class="fas fa-user-md"></i> ${item.doctor}</span><span><i class="fas fa-calendar"></i> ${item.date}</span><span><i class="fas fa-clock"></i> ${item.time}</span>` : ''}
    </div></div>`;
  panel.scrollIntoView({ behavior: 'smooth' });
}

function printDescription(type) {
  let item;
  if (type === 'patient') item = DataStore.patients[currentDescIndex];
  else if (type === 'doctor') item = DataStore.doctors[currentDescIndex];
  else if (type === 'appointment') item = DataStore.appointments[currentDescIndex];
  
  const content = document.getElementById('printContent');
  content.innerHTML = `
    <div class="hospital-logo"><i class="fas fa-heartbeat"></i></div>
    <div class="hospital-name">MedCore Hospital</div>
    <div class="hospital-info">123 Healthcare Avenue, Medical City | (555) 000-1234</div>
    <hr class="solid-divider">
    <h3 style="margin:12px 0;text-transform:uppercase;font-size:14px;letter-spacing:1px">${type.toUpperCase()} REPORT</h3>
    <hr class="divider">
    <div class="print-info-box"><div class="box-label">Name</div><div class="box-value">${item.name || item.patient}</div></div>
    ${type === 'patient' ? `
      <div class="print-detail-row"><span class="label">Age</span><span class="value">${item.age}</span></div>
      <div class="print-detail-row"><span class="label">Gender</span><span class="value">${item.gender}</span></div>
      <div class="print-detail-row"><span class="label">Blood Group</span><span class="value">${item.bloodGroup}</span></div>
      <div class="print-detail-row"><span class="label">Doctor</span><span class="value">${item.doctor}</span></div>
      <div class="print-detail-row"><span class="label">Condition</span><span class="value">${item.condition}</span></div>` : ''}
    ${type === 'doctor' ? `
      <div class="print-detail-row"><span class="label">Specialty</span><span class="value">${item.specialty}</span></div>
      <div class="print-detail-row"><span class="label">Experience</span><span class="value">${item.experience}</span></div>
      <div class="print-detail-row"><span class="label">Patients</span><span class="value">${item.patients}</span></div>
      <div class="print-detail-row"><span class="label">Rating</span><span class="value">⭐ ${item.rating}</span></div>` : ''}
    ${type === 'appointment' ? `
      <div class="print-detail-row"><span class="label">Doctor</span><span class="value">${item.doctor}</span></div>
      <div class="print-detail-row"><span class="label">Date</span><span class="value">${item.date}</span></div>
      <div class="print-detail-row"><span class="label">Time</span><span class="value">${item.time}</span></div>
      <div class="print-detail-row"><span class="label">Type</span><span class="value">${item.type}</span></div>` : ''}
    <div class="print-info-box" style="margin-top:16px"><div class="box-label">Description</div><div class="box-value" style="font-size:13px;font-weight:400;line-height:1.7">${item.description || 'N/A'}</div></div>`;
  openModal('printModal');
}

function viewPrescription(index) {
  const p = DataStore.prescriptions[index];
  const content = document.getElementById('printContent');
  content.innerHTML = `
    <div class="hospital-logo"><i class="fas fa-heartbeat"></i></div>
    <div class="hospital-name">MedCore Hospital</div>
    <div class="hospital-info">123 Healthcare Avenue, Medical City | (555) 000-1234</div>
    <h3 style="margin:12px 0;font-size:15px">℞ PRESCRIPTION</h3>
    <hr class="solid-divider">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div class="print-info-box"><div class="box-label">Patient</div><div class="box-value">${p.patient}</div></div>
      <div class="print-info-box"><div class="box-label">Doctor</div><div class="box-value">${p.doctor}</div></div>
    </div>
    <div class="print-info-box"><div class="box-label">Diagnosis</div><div class="box-value" style="color:var(--danger)">${p.diagnosis}</div></div>
    <div class="medication-box"><h4>💊 MEDICATIONS</h4><ol>${p.medications.map(m => `<li>${m}</li>`).join('')}</ol></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div class="print-info-box"><div class="box-label">Duration</div><div class="box-value">${p.duration}</div></div>
      <div class="print-info-box"><div class="box-label">Follow-up</div><div class="box-value">${p.followUp || 'TBD'}</div></div>
    </div>
    <div class="print-info-box"><div class="box-label">Notes</div><div class="box-value" style="font-size:13px;font-weight:400">${p.description || 'None'}</div></div>`;
  openModal('printModal');
}

function viewInvoice(index) {
  const b = DataStore.billing[index];
  const content = document.getElementById('printContent');
  content.innerHTML = `
    <div class="hospital-logo"><i class="fas fa-heartbeat"></i></div>
    <div class="hospital-name">MedCore Hospital</div>
    <div class="hospital-info">123 Healthcare Avenue, Medical City<br>Tel: (555) 000-1234 | info@medcore.com</div>
    <hr class="divider">
    <div style="display:flex;justify-content:space-between;padding:8px 0;font-size:12px;color:var(--text-muted)">
      <div>INVOICE NO<br><strong style="font-size:16px;color:var(--text)">${b.id}</strong></div>
      <div style="text-align:right">DATE<br><strong style="font-size:16px;color:var(--text)">${b.date}</strong></div>
    </div>
    <div class="print-info-box"><div class="box-label">Billed To</div><div class="box-value">${b.patient}</div></div>
    <hr class="divider">
    <div class="print-detail-row"><span class="label">Description</span><span class="value">${b.description}</span></div>
    <div class="print-detail-row"><span class="label">Payment Method</span><span class="value">${b.method}</span></div>
    <div class="print-detail-row"><span class="label">Status</span><span class="value"><span class="status-badge status-${b.status.toLowerCase()}">${b.status}</span></span></div>
    <div class="total-box"><div class="total-label">TOTAL AMOUNT</div><div class="total-value">$${b.amount}</div><div style="margin-top:4px">${b.status === 'Paid' ? '✅ PAID' : '⏳ PENDING'}</div></div>`;
  openModal('printModal');
}

// ===== SEARCH =====
document.getElementById('patientSearch')?.addEventListener('input', e => renderPatients(e.target.value));
document.getElementById('doctorSearch')?.addEventListener('input', e => renderDoctors(e.target.value));
document.getElementById('appointmentSearch')?.addEventListener('input', e => renderAppointments(e.target.value));
document.getElementById('prescriptionSearch')?.addEventListener('input', e => renderPrescriptions(e.target.value));
document.getElementById('billingSearch')?.addEventListener('input', e => renderBilling(e.target.value));

// ===== INIT =====
function renderAll() {
  renderDashboard(); renderPatients(); renderDoctors();
  renderAppointments(); renderPrescriptions(); renderBilling(); renderReports();
}
renderAll();
