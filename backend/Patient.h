#ifndef PATIENT_H
#define PATIENT_H

#include "Person.h"
#include <string>

// Inheritance: Patient extends Person
class Patient : public Person {
private:
    std::string bloodGroup;
    std::string condition;
    std::string assignedDoctor;
    std::string status;

public:
    Patient() {}

    Patient(std::string id, std::string name, int age, std::string gender,
            std::string phone, std::string bloodGroup, std::string condition,
            std::string doctor, std::string status, std::string desc)
        : Person(id, name, age, gender, phone, desc),
          bloodGroup(bloodGroup), condition(condition),
          assignedDoctor(doctor), status(status) {}

    // Polymorphism - overriding virtual functions
    void display() const override {
        std::cout << "=== Patient Record ===" << std::endl;
        std::cout << "ID: " << getId() << std::endl;
        std::cout << "Name: " << getName() << std::endl;
        std::cout << "Age: " << getAge() << " | Gender: " << getGender() << std::endl;
        std::cout << "Phone: " << getPhone() << std::endl;
        std::cout << "Blood Group: " << bloodGroup << std::endl;
        std::cout << "Condition: " << condition << std::endl;
        std::cout << "Doctor: " << assignedDoctor << std::endl;
        std::cout << "Status: " << status << std::endl;
        std::cout << "Description: " << getDescription() << std::endl;
        std::cout << "======================" << std::endl;
    }

    std::string toJSON() const override {
        return "{\"id\":\"" + getId() + "\",\"name\":\"" + getName() +
               "\",\"age\":" + std::to_string(getAge()) +
               ",\"gender\":\"" + getGender() +
               "\",\"phone\":\"" + getPhone() +
               "\",\"bloodGroup\":\"" + bloodGroup +
               "\",\"condition\":\"" + condition +
               "\",\"doctor\":\"" + assignedDoctor +
               "\",\"status\":\"" + status +
               "\",\"description\":\"" + getDescription() + "\"}";
    }

    std::string getType() const override { return "Patient"; }

    // Getters & Setters
    std::string getBloodGroup() const { return bloodGroup; }
    std::string getCondition() const { return condition; }
    std::string getAssignedDoctor() const { return assignedDoctor; }
    std::string getStatus() const { return status; }

    void setBloodGroup(const std::string& val) { bloodGroup = val; }
    void setCondition(const std::string& val) { condition = val; }
    void setAssignedDoctor(const std::string& val) { assignedDoctor = val; }
    void setStatus(const std::string& val) { status = val; }
};

#endif // PATIENT_H
