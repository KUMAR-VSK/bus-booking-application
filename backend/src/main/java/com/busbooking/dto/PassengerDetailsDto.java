package com.busbooking.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

public class PassengerDetailsDto {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private Integer age;
    private String gender; // "Male", "Female", "Other"
    private String idType; // "Aadhaar", "Passport", "Driving License"
    private String idNumber;
    private LocalDate dateOfBirth;
    private String address;
    private String emergencyContactName;
    private String emergencyContactPhone;

    public PassengerDetailsDto() {}

    // Getters and Setters
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getIdType() { return idType; }
    public void setIdType(String idType) { this.idType = idType; }

    public String getIdNumber() { return idNumber; }
    public void setIdNumber(String idNumber) { this.idNumber = idNumber; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getEmergencyContactName() { return emergencyContactName; }
    public void setEmergencyContactName(String emergencyContactName) { this.emergencyContactName = emergencyContactName; }

    public String getEmergencyContactPhone() { return emergencyContactPhone; }
    public void setEmergencyContactPhone(String emergencyContactPhone) { this.emergencyContactPhone = emergencyContactPhone; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PassengerDetailsDto that = (PassengerDetailsDto) o;
        return Objects.equals(email, that.email) && 
               Objects.equals(idNumber, that.idNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, idNumber);
    }

    @Override
    public String toString() {
        return "PassengerDetailsDto{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", age=" + age +
                ", gender='" + gender + '\'' +
                ", idType='" + idType + '\'' +
                ", idNumber='" + idNumber + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", address='" + address + '\'' +
                ", emergencyContactName='" + emergencyContactName + '\'' +
                ", emergencyContactPhone='" + emergencyContactPhone + '\'' +
                '}';
    }
}
