#ifndef PRESCRIPTION_H
#define PRESCRIPTION_H

#include <string>
#include <vector>
#include <iostream>

class Prescription {
private:
    std::string id;
    std::string patient;
    std::string doctor;
    std::string diagnosis;
    std::string date;
    std::string duration;
    std::string status;
    std::vector<std::string> medications;
    std::string followUp;
    std::string description;

public:
    Prescription() {}

    Prescription(std::string id, std::string patient, std::string doctor,
                 std::string diagnosis, std::string date, std::string duration,
                 std::string status, std::vector<std::string> meds,
                 std::string followUp, std::string desc)
        : id(id), patient(patient), doctor(doctor), diagnosis(diagnosis),
          date(date), duration(duration), status(status), medications(meds),
          followUp(followUp), description(desc) {}

    void display() const {
        std::cout << "=== Prescription ===" << std::endl;
        std::cout << "RX ID: " << id << std::endl;
        std::cout << "Patient: " << patient << " | Doctor: " << doctor << std::endl;
        std::cout << "Diagnosis: " << diagnosis << std::endl;
        std::cout << "Medications:" << std::endl;
        for (size_t i = 0; i < medications.size(); i++) {
            std::cout << "  " << (i + 1) << ". " << medications[i] << std::endl;
        }
        std::cout << "Duration: " << duration << " | Follow-up: " << followUp << std::endl;
        std::cout << "Description: " << description << std::endl;
        std::cout << "====================" << std::endl;
    }

    std::string toJSON() const {
        std::string medsJSON = "[";
        for (size_t i = 0; i < medications.size(); i++) {
            if (i > 0) medsJSON += ",";
            medsJSON += "\"" + medications[i] + "\"";
        }
        medsJSON += "]";

        return "{\"id\":\"" + id + "\",\"patient\":\"" + patient +
               "\",\"doctor\":\"" + doctor + "\",\"diagnosis\":\"" + diagnosis +
               "\",\"date\":\"" + date + "\",\"duration\":\"" + duration +
               "\",\"status\":\"" + status + "\",\"medications\":" + medsJSON +
               ",\"followUp\":\"" + followUp +
               "\",\"description\":\"" + description + "\"}";
    }

    // Getters
    std::string getId() const { return id; }
    std::string getPatient() const { return patient; }
    std::string getDoctor() const { return doctor; }
    std::string getDiagnosis() const { return diagnosis; }
    std::vector<std::string> getMedications() const { return medications; }

    // Setters
    void addMedication(const std::string& med) { medications.push_back(med); }
    void setStatus(const std::string& val) { status = val; }
};

#endif // PRESCRIPTION_H
