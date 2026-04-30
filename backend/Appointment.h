#ifndef APPOINTMENT_H
#define APPOINTMENT_H

#include <string>
#include <iostream>

class Appointment {
private:
    std::string id;
    std::string patient;
    std::string doctor;
    std::string date;
    std::string time;
    std::string type;
    std::string status;
    std::string description;

public:
    Appointment() {}

    Appointment(std::string id, std::string patient, std::string doctor,
                std::string date, std::string time, std::string type,
                std::string status, std::string desc)
        : id(id), patient(patient), doctor(doctor), date(date),
          time(time), type(type), status(status), description(desc) {}

    void display() const {
        std::cout << "=== Appointment ===" << std::endl;
        std::cout << "ID: " << id << " | Patient: " << patient << std::endl;
        std::cout << "Doctor: " << doctor << std::endl;
        std::cout << "Date: " << date << " | Time: " << time << std::endl;
        std::cout << "Type: " << type << " | Status: " << status << std::endl;
        std::cout << "Description: " << description << std::endl;
        std::cout << "===================" << std::endl;
    }

    std::string toJSON() const {
        return "{\"id\":\"" + id + "\",\"patient\":\"" + patient +
               "\",\"doctor\":\"" + doctor + "\",\"date\":\"" + date +
               "\",\"time\":\"" + time + "\",\"type\":\"" + type +
               "\",\"status\":\"" + status +
               "\",\"description\":\"" + description + "\"}";
    }

    // Getters
    std::string getId() const { return id; }
    std::string getPatient() const { return patient; }
    std::string getDoctor() const { return doctor; }
    std::string getDate() const { return date; }
    std::string getTime() const { return time; }
    std::string getType() const { return type; }
    std::string getStatus() const { return status; }
    std::string getDescription() const { return description; }

    // Setters
    void setStatus(const std::string& val) { status = val; }
    void setDescription(const std::string& val) { description = val; }
};

#endif // APPOINTMENT_H
