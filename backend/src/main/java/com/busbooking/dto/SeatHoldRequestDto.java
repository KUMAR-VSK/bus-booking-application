package com.busbooking.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

public class SeatHoldRequestDto {
    private Long busId;
    private LocalDate travelDate;
    private List<String> seatNumbers;
    private String userEmail; // User requesting the hold

    public SeatHoldRequestDto() {}

    public SeatHoldRequestDto(Long busId, LocalDate travelDate, List<String> seatNumbers, String userEmail) {
        this.busId = busId;
        this.travelDate = travelDate;
        this.seatNumbers = seatNumbers;
        this.userEmail = userEmail;
    }

    // Getters and Setters
    public Long getBusId() { return busId; }
    public void setBusId(Long busId) { this.busId = busId; }

    public LocalDate getTravelDate() { return travelDate; }
    public void setTravelDate(LocalDate travelDate) { this.travelDate = travelDate; }

    public List<String> getSeatNumbers() { return seatNumbers; }
    public void setSeatNumbers(List<String> seatNumbers) { this.seatNumbers = seatNumbers; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SeatHoldRequestDto that = (SeatHoldRequestDto) o;
        return Objects.equals(busId, that.busId) && 
               Objects.equals(travelDate, that.travelDate) && 
               Objects.equals(seatNumbers, that.seatNumbers);
    }

    @Override
    public int hashCode() {
        return Objects.hash(busId, travelDate, seatNumbers);
    }

    @Override
    public String toString() {
        return "SeatHoldRequestDto{" +
                "busId=" + busId +
                ", travelDate=" + travelDate +
                ", seatNumbers=" + seatNumbers +
                ", userEmail='" + userEmail + '\'' +
                '}';
    }
}
