/*
 * MedCore HMS - Hospital Management System
 * C++ Backend with OOP Concepts
 * 
 * Demonstrates: Encapsulation, Inheritance, Polymorphism, Abstraction, STL
 */

#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <algorithm>

#include "Person.h"
#include "Patient.h"
#include "Doctor.h"
#include "Appointment.h"
#include "Prescription.h"
#include "Billing.h"

using namespace std;

// ===== Hospital Management System Class =====
class HospitalSystem {
private:
    vector<Patient> patients;
    vector<Doctor> doctors;
    vector<Appointment> appointments;
    vector<Prescription> prescriptions;
    vector<Billing> billings;

    string dataPath;

public:
    HospitalSystem(string path = "../data/") : dataPath(path) {
        cout << "=== MedCore HMS Backend Initialized ===" << endl;
    }

    // ===== Patient Management =====
    void addPatient(const Patient& p) {
        patients.push_back(p);
        cout << "Patient added: " << p.getName() << endl;
    }

    void displayAllPatients() const {
        cout << "\n=== All Patients (" << patients.size() << ") ===" << endl;
        for (const auto& p : patients) {
            p.display();  // Polymorphism in action
        }
    }

    // ===== Doctor Management =====
    void addDoctor(const Doctor& d) {
        doctors.push_back(d);
        cout << "Doctor added: " << d.getName() << endl;
    }

    void displayAllDoctors() const {
        cout << "\n=== All Doctors (" << doctors.size() << ") ===" << endl;
        for (const auto& d : doctors) {
            d.display();  // Polymorphism in action
        }
    }

    // ===== Appointment Management =====
    void addAppointment(const Appointment& a) {
        appointments.push_back(a);
        cout << "Appointment added: " << a.getId() << endl;
    }

    // ===== Prescription Management =====
    void addPrescription(const Prescription& p) {
        prescriptions.push_back(p);
        cout << "Prescription added: " << p.getId() << endl;
    }

    // ===== Billing Management =====
    void addBilling(const Billing& b) {
        billings.push_back(b);
        cout << "Invoice added: " << b.getId() << endl;
    }

    double getTotalRevenue() const {
        double total = 0;
        for (const auto& b : billings) total += b.getAmount();
        return total;
    }

    // ===== Polymorphism Demo =====
    void displayPersonInfo(const Person& p) const {
        // Polymorphism: calls the correct derived class display()
        cout << "[" << p.getType() << "] ";
        p.display();
    }

    // ===== File I/O - Save to JSON =====
    void saveToFiles() const {
        // Save patients
        ofstream pFile(dataPath + "patients.json");
        pFile << "[\n";
        for (size_t i = 0; i < patients.size(); i++) {
            pFile << "  " << patients[i].toJSON();
            if (i < patients.size() - 1) pFile << ",";
            pFile << "\n";
        }
        pFile << "]" << endl;
        pFile.close();

        // Save doctors
        ofstream dFile(dataPath + "doctors.json");
        dFile << "[\n";
        for (size_t i = 0; i < doctors.size(); i++) {
            dFile << "  " << doctors[i].toJSON();
            if (i < doctors.size() - 1) dFile << ",";
            dFile << "\n";
        }
        dFile << "]" << endl;
        dFile.close();

        // Save appointments
        ofstream aFile(dataPath + "appointments.json");
        aFile << "[\n";
        for (size_t i = 0; i < appointments.size(); i++) {
            aFile << "  " << appointments[i].toJSON();
            if (i < appointments.size() - 1) aFile << ",";
            aFile << "\n";
        }
        aFile << "]" << endl;
        aFile.close();

        // Save prescriptions
        ofstream rxFile(dataPath + "prescriptions.json");
        rxFile << "[\n";
        for (size_t i = 0; i < prescriptions.size(); i++) {
            rxFile << "  " << prescriptions[i].toJSON();
            if (i < prescriptions.size() - 1) rxFile << ",";
            rxFile << "\n";
        }
        rxFile << "]" << endl;
        rxFile.close();

        // Save billing
        ofstream bFile(dataPath + "billing.json");
        bFile << "[\n";
        for (size_t i = 0; i < billings.size(); i++) {
            bFile << "  " << billings[i].toJSON();
            if (i < billings.size() - 1) bFile << ",";
            bFile << "\n";
        }
        bFile << "]" << endl;
        bFile.close();

        cout << "\n✓ All data saved to " << dataPath << endl;
    }

    // ===== Display Summary =====
    void displaySummary() const {
        cout << "\n========================================" << endl;
        cout << "       MedCore HMS - System Summary     " << endl;
        cout << "========================================" << endl;
        cout << "  Total Patients:     " << patients.size() << endl;
        cout << "  Total Doctors:      " << doctors.size() << endl;
        cout << "  Total Appointments: " << appointments.size() << endl;
        cout << "  Total Prescriptions:" << prescriptions.size() << endl;
        cout << "  Total Revenue:      $" << getTotalRevenue() << endl;
        cout << "========================================" << endl;
    }
};

// ===== Main Function =====
int main() {
    HospitalSystem hms("../data/");

    // Add sample patients (Inheritance: Patient IS-A Person)
    hms.addPatient(Patient("P-001", "John Smith", 45, "Male", "(555) 123-4567",
        "A+", "Hypertension Stage 2", "Dr. Sarah Wilson", "Active",
        "Chronic hypertension requiring regular monitoring."));

    hms.addPatient(Patient("P-002", "Emma Davis", 32, "Female", "(555) 234-5678",
        "B+", "Diabetes Type 2", "Dr. James Chen", "Active",
        "Type 2 Diabetes managed with Metformin."));

    // Add sample doctors (Inheritance: Doctor IS-A Person)
    hms.addDoctor(Doctor("D-001", "Dr. Sarah Wilson", 42, "Female", "(555) 111-2222",
        "Cardiology", "12 years", 45, 4.9, "Active",
        "Board-certified cardiologist."));

    hms.addDoctor(Doctor("D-002", "Dr. James Chen", 38, "Male", "(555) 222-3333",
        "Neurology", "8 years", 38, 4.8, "Active",
        "Neurologist with expertise in headache disorders."));

    // Add appointments
    hms.addAppointment(Appointment("A-001", "John Smith", "Dr. Sarah Wilson",
        "2026-04-30", "09:00 AM", "Checkup", "Confirmed",
        "Regular blood pressure monitoring."));

    // Add prescriptions (uses STL vector for medications)
    vector<string> meds = {"Amlodipine 5mg - Once daily", "Losartan 50mg - Once daily evening"};
    hms.addPrescription(Prescription("RX-001", "John Smith", "Dr. Sarah Wilson",
        "Hypertension Stage 2", "2026-04-28", "30 days", "Active",
        meds, "2026-05-28", "Monitor blood pressure twice daily."));

    // Add billing
    hms.addBilling(Billing("INV-2026-001", "John Smith", "2026-04-28",
        "General Checkup + Lab Tests", 350.0, "Credit Card", "Paid"));

    hms.addBilling(Billing("INV-2026-002", "Emma Davis", "2026-04-25",
        "Diabetes Consultation", 520.0, "Insurance", "Paid"));

    // Polymorphism demonstration
    cout << "\n=== Polymorphism Demo ===" << endl;
    Patient p1("P-001", "John Smith", 45, "Male", "(555) 123-4567",
        "A+", "Hypertension", "Dr. Wilson", "Active", "Test patient");
    Doctor d1("D-001", "Dr. Wilson", 42, "Female", "(555) 111-2222",
        "Cardiology", "12 years", 45, 4.9, "Active", "Cardiologist");

    // Same function, different behavior - Polymorphism
    hms.displayPersonInfo(p1);
    hms.displayPersonInfo(d1);

    // Display summary
    hms.displaySummary();

    // Save all data to JSON files
    hms.saveToFiles();

    cout << "\n=== MedCore HMS Backend Complete ===" << endl;
    return 0;
}
