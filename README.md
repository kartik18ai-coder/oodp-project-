# MedCore HMS - Hospital Management System

MedCore HMS is a modern, professional Hospital Management System dashboard designed for healthcare providers. It features a clean, premium UI with a robust C++ backend that follows Object-Oriented Programming (OOP) principles.

## 🚀 Features

### Frontend (Dashboard)
- **Dashboard Summary**: Real-time stats for patients, doctors, appointments, and revenue.
- **Patient Management**: Full CRUD operations for patient records with detailed descriptions.
- **Doctor Management**: Track doctor specialties, ratings, and real-time availability status (Available, On Leave, Surgery, etc.).
- **Appointment Tracking**: Manage patient-doctor consultations with status updates.
- **Prescription System**: Issue and view digital prescriptions with medication lists.
- **Billing & Invoices**: Generate invoices, track payment status, and view detailed bills.
- **Interactive Reports**: Visual charts for weekly appointments and department distribution.
- **Print Functionality**: Export descriptions, prescriptions, and invoices to print-ready formats.

### Backend (OOP C++)
- **Encapsulation**: Private data members with public getters/setters.
- **Inheritance**: Base `Person` class extended by `Patient` and `Doctor`.
- **Polymorphism**: Virtual functions for specialized display and JSON serialization.
- **Abstraction**: Pure virtual base class methods.
- **STL Usage**: Efficient data management using `std::vector` and `std::string`.
- **File I/O**: Automated data persistence to JSON files.

## 📁 Project Structure

```
oodp pro/
├── frontend/
│   ├── index.html          # Main Dashboard UI
│   ├── css/style.css       # Premium Design System
│   └── js/
│       ├── data.js         # Frontend Mock Data Store
│       └── app.js          # Interactive UI Logic
├── backend/
│   ├── main.cpp            # Core System Logic
│   ├── Person.h            # Base Class (Abstract)
│   ├── Patient.h           # Derived Class
│   ├── Doctor.h            # Derived Class
│   ├── Appointment.h       # Appointment Class
│   ├── Prescription.h      # Prescription Class
│   └── Billing.h           # Billing Class
└── data/
    ├── patients.json       # Persisted Patient Data
    └── doctors.json        # Persisted Doctor Data
```

## 🛠️ Technology Stack
- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (ES6+), Chart.js, FontAwesome.
- **Backend**: C++17 (OOP focused).
- **Data Persistence**: JSON.

## 🔧 How to Run

### Frontend
1. Open `frontend/index.html` in any modern web browser.

### Backend
1. Navigate to the `backend/` directory.
2. Compile the source code:
   ```bash
   g++ main.cpp -o hms_backend
   ```
3. Run the executable:
   ```bash
   ./hms_backend
   ```

## 📄 License
This project is for educational purposes under the OODP curriculum.
