#ifndef DOCTOR_H
#define DOCTOR_H

#include "Person.h"
#include <string>

// Inheritance: Doctor extends Person
class Doctor : public Person {
private:
    std::string specialty;
    std::string experience;
    int patientCount;
    double rating;
    std::string status;

public:
    Doctor() : patientCount(0), rating(0.0) {}

    Doctor(std::string id, std::string name, int age, std::string gender,
           std::string phone, std::string specialty, std::string experience,
           int patients, double rating, std::string status, std::string desc)
        : Person(id, name, age, gender, phone, desc),
          specialty(specialty), experience(experience),
          patientCount(patients), rating(rating), status(status) {}

    // Polymorphism - overriding virtual functions
    void display() const override {
        std::cout << "=== Doctor Profile ===" << std::endl;
        std::cout << "ID: " << getId() << std::endl;
        std::cout << "Name: " << getName() << std::endl;
        std::cout << "Specialty: " << specialty << std::endl;
        std::cout << "Experience: " << experience << std::endl;
        std::cout << "Patients: " << patientCount << std::endl;
        std::cout << "Rating: " << rating << "/5.0" << std::endl;
        std::cout << "Status: " << status << std::endl;
        std::cout << "Description: " << getDescription() << std::endl;
        std::cout << "======================" << std::endl;
    }

    std::string toJSON() const override {
        return "{\"id\":\"" + getId() + "\",\"name\":\"" + getName() +
               "\",\"specialty\":\"" + specialty +
               "\",\"phone\":\"" + getPhone() +
               "\",\"experience\":\"" + experience +
               "\",\"patients\":" + std::to_string(patientCount) +
               ",\"rating\":" + std::to_string(rating) +
               ",\"status\":\"" + status +
               "\",\"description\":\"" + getDescription() + "\"}";
    }

    std::string getType() const override { return "Doctor"; }

    // Getters & Setters
    std::string getSpecialty() const { return specialty; }
    std::string getExperience() const { return experience; }
    int getPatientCount() const { return patientCount; }
    double getRating() const { return rating; }
    std::string getStatus() const { return status; }

    void setSpecialty(const std::string& val) { specialty = val; }
    void setExperience(const std::string& val) { experience = val; }
    void setPatientCount(int val) { patientCount = val; }
    void setRating(double val) { rating = val; }
    void setStatus(const std::string& val) { status = val; }
};

#endif // DOCTOR_H
