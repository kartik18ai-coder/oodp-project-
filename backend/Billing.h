#ifndef BILLING_H
#define BILLING_H

#include <string>
#include <iostream>

class Billing {
private:
    std::string id;
    std::string patient;
    std::string date;
    std::string description;
    double amount;
    std::string method;
    std::string status;

public:
    Billing() : amount(0.0) {}

    Billing(std::string id, std::string patient, std::string date,
            std::string desc, double amount, std::string method, std::string status)
        : id(id), patient(patient), date(date), description(desc),
          amount(amount), method(method), status(status) {}

    void display() const {
        std::cout << "=== Invoice ===" << std::endl;
        std::cout << "Invoice: " << id << " | Patient: " << patient << std::endl;
        std::cout << "Date: " << date << std::endl;
        std::cout << "Description: " << description << std::endl;
        std::cout << "Amount: $" << amount << std::endl;
        std::cout << "Method: " << method << " | Status: " << status << std::endl;
        std::cout << "===============" << std::endl;
    }

    std::string toJSON() const {
        return "{\"id\":\"" + id + "\",\"patient\":\"" + patient +
               "\",\"date\":\"" + date + "\",\"description\":\"" + description +
               "\",\"amount\":" + std::to_string(amount) +
               ",\"method\":\"" + method +
               "\",\"status\":\"" + status + "\"}";
    }

    // Getters
    std::string getId() const { return id; }
    std::string getPatient() const { return patient; }
    double getAmount() const { return amount; }
    std::string getStatus() const { return status; }

    // Setters
    void setStatus(const std::string& val) { status = val; }
    void setAmount(double val) { amount = val; }
};

#endif // BILLING_H
