package com.busbooking.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

public class SeatReleaseRequestDto {
    private String holdId;
    private List<String> seatNumbers;
    private Long busId;
    private LocalDate travelDate;

    public SeatReleaseRequestDto() {}

    public SeatReleaseRequestDto(String holdId, List<String> seatNumbers, Long busId, LocalDate travelDate) {
        this.holdId = holdId;
        this.seatNumbers = seatNumbers;
        this.busId = busId;
        this.travelDate = travelDate;
    }

    // Getters and Setters
    public String getHoldId() { return holdId; }
    public void setHoldId(String holdId) { this.holdId = holdId; }

    public List<String> getSeatNumbers() { return seatNumbers; }
    public void setSeatNumbers(List<String> seatNumbers) { this.seatNumbers = seatNumbers; }

    public Long getBusId() { return busId; }
    public void setBusId(Long busId) { this.busId = busId; }

    public LocalDate getTravelDate() { return travelDate; }
    public void setTravelDate(LocalDate travelDate) { this.travelDate = travelDate; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SeatReleaseRequestDto that = (SeatReleaseRequestDto) o;
        return Objects.equals(holdId, that.holdId) && 
               Objects.equals(busId, that.busId) && 
               Objects.equals(travelDate, that.travelDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(holdId, busId, travelDate);
    }

    @Override
    public String toString() {
        return "SeatReleaseRequestDto{" +
                "holdId='" + holdId + '\'' +
                ", seatNumbers=" + seatNumbers +
                ", busId=" + busId +
                ", travelDate=" + travelDate +
                '}';
    }
}
