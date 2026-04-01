package com.busbooking.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

public class BookingInitiationRequestDto {
    private Long busId;
    private LocalDate travelDate;
    private List<String> selectedSeats;
    private List<PassengerDetailsDto> passengers;
    private String userEmail; // User making the booking
    private String contactPhone;
    private String specialRequests; // Any special requirements

    public BookingInitiationRequestDto() {}

    // Getters and Setters
    public Long getBusId() { return busId; }
    public void setBusId(Long busId) { this.busId = busId; }

    public LocalDate getTravelDate() { return travelDate; }
    public void setTravelDate(LocalDate travelDate) { this.travelDate = travelDate; }

    public List<String> getSelectedSeats() { return selectedSeats; }
    public void setSelectedSeats(List<String> selectedSeats) { this.selectedSeats = selectedSeats; }

    public List<PassengerDetailsDto> getPassengers() { return passengers; }
    public void setPassengers(List<PassengerDetailsDto> passengers) { this.passengers = passengers; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public String getSpecialRequests() { return specialRequests; }
    public void setSpecialRequests(String specialRequests) { this.specialRequests = specialRequests; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BookingInitiationRequestDto that = (BookingInitiationRequestDto) o;
        return Objects.equals(busId, that.busId) && 
               Objects.equals(travelDate, that.travelDate) && 
               Objects.equals(selectedSeats, that.selectedSeats) && 
               Objects.equals(userEmail, that.userEmail);
    }

    @Override
    public int hashCode() {
        return Objects.hash(busId, travelDate, selectedSeats, userEmail);
    }

    @Override
    public String toString() {
        return "BookingInitiationRequestDto{" +
                "busId=" + busId +
                ", travelDate=" + travelDate +
                ", selectedSeats=" + selectedSeats +
                ", passengers=" + passengers +
                ", userEmail='" + userEmail + '\'' +
                ", contactPhone='" + contactPhone + '\'' +
                ", specialRequests='" + specialRequests + '\'' +
                '}';
    }
}
