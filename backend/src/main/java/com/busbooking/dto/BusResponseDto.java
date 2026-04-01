package com.busbooking.dto;

import java.time.LocalTime;
import java.util.List;
import java.util.Objects;

public class BusResponseDto {
    private Long busId;
    private String busName;
    private String source;
    private String destination;
    private LocalTime departureTime;
    private LocalTime arrivalTime;
    private Integer totalSeats;
    private List<SeatResponseDto> seats;

    public BusResponseDto() {}

    public BusResponseDto(Long busId, String busName, String source, String destination, LocalTime departureTime, LocalTime arrivalTime, Integer totalSeats, List<SeatResponseDto> seats) {
        this.busId = busId;
        this.busName = busName;
        this.source = source;
        this.destination = destination;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.totalSeats = totalSeats;
        this.seats = seats;
    }

    // Getters and Setters
    public Long getBusId() { return busId; }
    public void setBusId(Long busId) { this.busId = busId; }

    public String getBusName() { return busName; }
    public void setBusName(String busName) { this.busName = busName; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public LocalTime getDepartureTime() { return departureTime; }
    public void setDepartureTime(LocalTime departureTime) { this.departureTime = departureTime; }

    public LocalTime getArrivalTime() { return arrivalTime; }
    public void setArrivalTime(LocalTime arrivalTime) { this.arrivalTime = arrivalTime; }

    public Integer getTotalSeats() { return totalSeats; }
    public void setTotalSeats(Integer totalSeats) { this.totalSeats = totalSeats; }

    public List<SeatResponseDto> getSeats() { return seats; }
    public void setSeats(List<SeatResponseDto> seats) { this.seats = seats; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BusResponseDto that = (BusResponseDto) o;
        return Objects.equals(busId, that.busId) && Objects.equals(busName, that.busName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(busId, busName);
    }

    @Override
    public String toString() {
        return "BusResponseDto{" +
                "busId=" + busId +
                ", busName='" + busName + '\'' +
                ", source='" + source + '\'' +
                ", destination='" + destination + '\'' +
                ", departureTime=" + departureTime +
                ", arrivalTime=" + arrivalTime +
                ", totalSeats=" + totalSeats +
                ", seats=" + seats +
                '}';
    }

    public static class SeatResponseDto {
        private Long seatId;
        private String seatNumber;
        private Boolean isAvailable;

        public SeatResponseDto() {}

        public SeatResponseDto(Long seatId, String seatNumber, Boolean isAvailable) {
            this.seatId = seatId;
            this.seatNumber = seatNumber;
            this.isAvailable = isAvailable;
        }

        // Getters and Setters
        public Long getSeatId() { return seatId; }
        public void setSeatId(Long seatId) { this.seatId = seatId; }

        public String getSeatNumber() { return seatNumber; }
        public void setSeatNumber(String seatNumber) { this.seatNumber = seatNumber; }

        public Boolean getIsAvailable() { return isAvailable; }
        public void setIsAvailable(Boolean isAvailable) { this.isAvailable = isAvailable; }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            SeatResponseDto that = (SeatResponseDto) o;
            return Objects.equals(seatId, that.seatId) && Objects.equals(seatNumber, that.seatNumber);
        }

        @Override
        public int hashCode() {
            return Objects.hash(seatId, seatNumber);
        }

        @Override
        public String toString() {
            return "SeatResponseDto{" +
                    "seatId=" + seatId +
                    ", seatNumber='" + seatNumber + '\'' +
                    ", isAvailable=" + isAvailable +
                    '}';
        }
    }
}
