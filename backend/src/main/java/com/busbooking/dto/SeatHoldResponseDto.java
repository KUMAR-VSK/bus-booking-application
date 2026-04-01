package com.busbooking.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

public class SeatHoldResponseDto {
    private String holdId;
    private List<String> heldSeats;
    private LocalDateTime holdExpiryTime;
    private Long busId;
    private LocalDate travelDate;
    private String status; // "HELD", "FAILED", "EXPIRED"

    public SeatHoldResponseDto() {}

    public SeatHoldResponseDto(String holdId, List<String> heldSeats, LocalDateTime holdExpiryTime, 
                              Long busId, LocalDate travelDate, String status) {
        this.holdId = holdId;
        this.heldSeats = heldSeats;
        this.holdExpiryTime = holdExpiryTime;
        this.busId = busId;
        this.travelDate = travelDate;
        this.status = status;
    }

    // Getters and Setters
    public String getHoldId() { return holdId; }
    public void setHoldId(String holdId) { this.holdId = holdId; }

    public List<String> getHeldSeats() { return heldSeats; }
    public void setHeldSeats(List<String> heldSeats) { this.heldSeats = heldSeats; }

    public LocalDateTime getHoldExpiryTime() { return holdExpiryTime; }
    public void setHoldExpiryTime(LocalDateTime holdExpiryTime) { this.holdExpiryTime = holdExpiryTime; }

    public Long getBusId() { return busId; }
    public void setBusId(Long busId) { this.busId = busId; }

    public LocalDate getTravelDate() { return travelDate; }
    public void setTravelDate(LocalDate travelDate) { this.travelDate = travelDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SeatHoldResponseDto that = (SeatHoldResponseDto) o;
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
        return "SeatHoldResponseDto{" +
                "holdId='" + holdId + '\'' +
                ", heldSeats=" + heldSeats +
                ", holdExpiryTime=" + holdExpiryTime +
                ", busId=" + busId +
                ", travelDate=" + travelDate +
                ", status='" + status + '\'' +
                '}';
    }
}
