#ifndef PERSON_H
#define PERSON_H

#include <string>
#include <iostream>

// Abstract Base Class - Demonstrates Abstraction
class Person {
private:
    // Encapsulation - private data members
    std::string id;
    std::string name;
    int age;
    std::string gender;
    std::string phone;
    std::string description;

public:
    Person() : age(0) {}
    
    Person(std::string id, std::string name, int age, std::string gender, std::string phone, std::string desc)
        : id(id), name(name), age(age), gender(gender), phone(phone), description(desc) {}
    
    virtual ~Person() {}

    // Pure virtual function - Abstraction
    virtual void display() const = 0;
    virtual std::string toJSON() const = 0;
    virtual std::string getType() const = 0;

    // Getters - Encapsulation
    std::string getId() const { return id; }
    std::string getName() const { return name; }
    int getAge() const { return age; }
    std::string getGender() const { return gender; }
    std::string getPhone() const { return phone; }
    std::string getDescription() const { return description; }

    // Setters - Encapsulation
    void setId(const std::string& val) { id = val; }
    void setName(const std::string& val) { name = val; }
    void setAge(int val) { age = val; }
    void setGender(const std::string& val) { gender = val; }
    void setPhone(const std::string& val) { phone = val; }
    void setDescription(const std::string& val) { description = val; }
};

#endif // PERSON_H
