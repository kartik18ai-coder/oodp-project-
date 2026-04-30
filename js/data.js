// ===== MedCore HMS - Mock Data Store =====

const DataStore = {
  patients: [
    { id: 'P-001', name: 'John Smith', age: 45, gender: 'Male', phone: '(555) 123-4567', bloodGroup: 'A+', condition: 'Hypertension Stage 2', doctor: 'Dr. Sarah Wilson', status: 'Active', description: 'Patient has chronic hypertension requiring regular monitoring. Currently on Amlodipine 5mg and Losartan 50mg. Blood pressure trending downward with medication compliance.' },
    { id: 'P-002', name: 'Emma Davis', age: 32, gender: 'Female', phone: '(555) 234-5678', bloodGroup: 'B+', condition: 'Diabetes Type 2', doctor: 'Dr. James Chen', status: 'Active', description: 'Type 2 Diabetes diagnosed 3 years ago. HbA1c levels at 7.2%. Managing with Metformin 500mg and dietary changes. Regular glucose monitoring required.' },
    { id: 'P-003', name: 'Michael Brown', age: 58, gender: 'Male', phone: '(555) 345-6789', bloodGroup: 'O-', condition: 'Cardiac Arrhythmia', doctor: 'Dr. Sarah Wilson', status: 'Active', description: 'Atrial fibrillation diagnosed during routine checkup. On Warfarin for anticoagulation. Echocardiogram shows mild left atrial enlargement.' },
    { id: 'P-004', name: 'Anna Martinez', age: 27, gender: 'Female', phone: '(555) 456-7890', bloodGroup: 'AB+', condition: 'Chronic Migraine', doctor: 'Dr. James Chen', status: 'Active', description: 'Recurring migraines 3-4 times per month. Triggers include stress and lack of sleep. Currently using Sumatriptan for acute episodes and Propranolol for prevention.' },
    { id: 'P-005', name: 'Robert Wilson', age: 63, gender: 'Male', phone: '(555) 567-8901', bloodGroup: 'A-', condition: 'Osteoarthritis', doctor: 'Dr. Priya Patel', status: 'Inactive', description: 'Bilateral knee osteoarthritis. Scheduled for physical therapy sessions. Using NSAIDs for pain management. May require surgical consultation if conservative treatment fails.' },
    { id: 'P-006', name: 'Lisa Chang', age: 41, gender: 'Female', phone: '(555) 678-9012', bloodGroup: 'O+', condition: 'Asthma', doctor: 'Dr. Mark Thompson', status: 'Active', description: 'Moderate persistent asthma. Using Fluticasone/Salmeterol inhaler daily and Albuterol as rescue inhaler. Pulmonary function tests show FEV1 at 78% predicted.' }
  ],

  doctors: [
    { id: 'D-001', name: 'Dr. Sarah Wilson', specialty: 'Cardiology', phone: '(555) 111-2222', experience: '12 years', patients: 45, rating: 4.9, status: 'Active', description: 'Board-certified cardiologist specializing in interventional cardiology and heart failure management. Fellowship trained at Johns Hopkins.' },
    { id: 'D-002', name: 'Dr. James Chen', specialty: 'Neurology', phone: '(555) 222-3333', experience: '8 years', patients: 38, rating: 4.8, status: 'Active', description: 'Neurologist with expertise in headache disorders and epilepsy. Published researcher in migraine pathophysiology.' },
    { id: 'D-003', name: 'Dr. Priya Patel', specialty: 'Orthopedics', phone: '(555) 333-4444', experience: '15 years', patients: 52, rating: 4.7, status: 'Active', description: 'Orthopedic surgeon specializing in joint replacement and sports medicine. Pioneer in minimally invasive knee surgery techniques.' },
    { id: 'D-004', name: 'Dr. Mark Thompson', specialty: 'Pediatrics', phone: '(555) 444-5555', experience: '10 years', patients: 61, rating: 4.9, status: 'Active', description: 'Pediatrician with special interest in childhood respiratory diseases and developmental pediatrics.' },
    { id: 'D-005', name: 'Dr. Emily Rodriguez', specialty: 'Dermatology', phone: '(555) 555-6666', experience: '6 years', patients: 33, rating: 4.6, status: 'Active', description: 'Dermatologist specializing in cosmetic procedures and skin cancer screening. Expert in laser treatments.' },
    { id: 'D-006', name: 'Dr. David Kim', specialty: 'General Surgery', phone: '(555) 666-7777', experience: '20 years', patients: 28, rating: 4.8, status: 'Active', description: 'General surgeon with extensive experience in laparoscopic procedures. Chief of Surgery department.' }
  ],

  appointments: [
    { id: 'A-001', patient: 'John Smith', doctor: 'Dr. Sarah Wilson', date: '2026-04-30', time: '09:00 AM', type: 'Checkup', status: 'Confirmed', description: 'Regular blood pressure monitoring and medication review. Follow-up on Amlodipine dosage adjustment.' },
    { id: 'A-002', patient: 'Emma Davis', doctor: 'Dr. James Chen', date: '2026-04-30', time: '10:30 AM', type: 'Checkup', status: 'Confirmed', description: 'Quarterly diabetes review. HbA1c test results discussion and dietary plan update.' },
    { id: 'A-003', patient: 'Michael Brown', doctor: 'Dr. Sarah Wilson', date: '2026-05-01', time: '02:00 PM', type: 'Emergency', status: 'Pending', description: 'Urgent consultation for increased palpitations. ECG and Holter monitor evaluation needed.' },
    { id: 'A-004', patient: 'Anna Martinez', doctor: 'Dr. James Chen', date: '2026-05-01', time: '11:00 AM', type: 'Checkup', status: 'Confirmed', description: 'Migraine frequency assessment. Consider switching from Propranolol to Topiramate.' },
    { id: 'A-005', patient: 'Lisa Chang', doctor: 'Dr. Mark Thompson', date: '2026-05-02', time: '03:30 PM', type: 'Checkup', status: 'Pending', description: 'Asthma control assessment and pulmonary function test. Inhaler technique review.' },
    { id: 'A-006', patient: 'Robert Wilson', doctor: 'Dr. Priya Patel', date: '2026-05-03', time: '09:30 AM', type: 'Checkup', status: 'Confirmed', description: 'Post-physical therapy evaluation. Knee X-ray review and treatment plan discussion.' }
  ],

  prescriptions: [
    { id: 'RX-001', patient: 'John Smith', doctor: 'Dr. Sarah Wilson', diagnosis: 'Hypertension Stage 2', date: '2026-04-28', duration: '30 days', status: 'Active', medications: ['Amlodipine 5mg - Once daily morning', 'Losartan 50mg - Once daily evening', 'Aspirin 75mg - Once daily after lunch'], followUp: '2026-05-28', description: 'Antihypertensive regimen adjusted. Monitor blood pressure twice daily. Report any dizziness or swelling.' },
    { id: 'RX-002', patient: 'Emma Davis', doctor: 'Dr. James Chen', diagnosis: 'Diabetes Type 2', date: '2026-04-25', duration: '60 days', status: 'Active', medications: ['Metformin 500mg - Twice daily with meals', 'Glimepiride 1mg - Once before breakfast'], followUp: '2026-06-25', description: 'Continue current regimen. Maintain fasting blood sugar log. Low-carb diet recommended.' },
    { id: 'RX-003', patient: 'Michael Brown', doctor: 'Dr. Sarah Wilson', diagnosis: 'Cardiac Arrhythmia', date: '2026-04-27', duration: '45 days', status: 'Active', medications: ['Warfarin 5mg - Once daily evening', 'Metoprolol 25mg - Twice daily', 'Digoxin 0.25mg - Once daily'], followUp: '2026-06-11', description: 'Anticoagulation therapy ongoing. INR monitoring every 2 weeks. Avoid vitamin K-rich foods.' },
    { id: 'RX-004', patient: 'Anna Martinez', doctor: 'Dr. James Chen', diagnosis: 'Chronic Migraine', date: '2026-04-29', duration: '30 days', status: 'Active', medications: ['Sumatriptan 50mg - As needed for acute attacks', 'Propranolol 40mg - Twice daily', 'Riboflavin 400mg - Once daily'], followUp: '2026-05-29', description: 'Prophylactic therapy with Propranolol. Keep headache diary. Avoid known triggers.' }
  ],

  billing: [
    { id: 'INV-2026-001', patient: 'John Smith', date: '2026-04-28', description: 'General Checkup + Lab Tests', amount: 350, method: 'Credit Card', status: 'Paid' },
    { id: 'INV-2026-002', patient: 'Emma Davis', date: '2026-04-25', description: 'Diabetes Consultation + Medication', amount: 520, method: 'Insurance', status: 'Paid' },
    { id: 'INV-2026-003', patient: 'Michael Brown', date: '2026-04-27', description: 'Cardiac Evaluation + ECG', amount: 890, method: 'Cash', status: 'Pending' },
    { id: 'INV-2026-004', patient: 'Anna Martinez', date: '2026-04-29', description: 'Neurology Consultation', amount: 400, method: 'Credit Card', status: 'Paid' },
    { id: 'INV-2026-005', patient: 'Robert Wilson', date: '2026-04-26', description: 'Orthopedic Consultation + X-Ray', amount: 750, method: 'Insurance', status: 'Paid' },
    { id: 'INV-2026-006', patient: 'Lisa Chang', date: '2026-04-30', description: 'Pulmonary Function Test', amount: 785, method: 'Cash', status: 'Pending' }
  ],

  departments: [
    { name: 'Cardiology', patients: 45, color: '#2563eb' },
    { name: 'Neurology', patients: 38, color: '#7c3aed' },
    { name: 'Orthopedics', patients: 52, color: '#059669' },
    { name: 'Pediatrics', patients: 61, color: '#d97706' },
    { name: 'Dermatology', patients: 33, color: '#dc2626' },
    { name: 'General Surgery', patients: 28, color: '#0891b2' }
  ],

  getStats() {
    const totalRevenue = this.billing.reduce((s, b) => s + b.amount, 0);
    const collected = this.billing.filter(b => b.status === 'Paid').reduce((s, b) => s + b.amount, 0);
    return {
      totalPatients: this.patients.length,
      activeDoctors: this.doctors.filter(d => d.status === 'Active').length,
      totalAppointments: this.appointments.length,
      totalRevenue, collected, pending: totalRevenue - collected
    };
  }
};
