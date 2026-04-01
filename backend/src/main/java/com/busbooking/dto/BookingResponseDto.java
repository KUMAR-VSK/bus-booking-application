package com.busbooking.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

public class BookingResponseDto {
    private Long bookingId;
    private Long userId;
    private String userName;
    private Long busId;
    private String busName;
    private String source;
    private String destination;
    private LocalDate bookingDate;
    private Double totalAmount;
    private String status;
    private LocalDateTime createdAt;
    private List<SeatInfoDto> seats;

    public BookingResponseDto() {}

    public BookingResponseDto(Long bookingId, Long userId, String userName, Long busId, String busName, String source, String destination, LocalDate bookingDate, Double totalAmount, String status, LocalDateTime createdAt, List<SeatInfoDto> seats) {
        this.bookingId = bookingId;
        this.userId = userId;
        this.userName = userName;
        this.busId = busId;
        this.busName = busName;
        this.source = source;
        this.destination = destination;
        this.bookingDate = bookingDate;
        this.totalAmount = totalAmount;
        this.status = status;
        this.createdAt = createdAt;
        this.seats = seats;
    }

    // Getters and Setters
    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public Long getBusId() { return busId; }
    public void setBusId(Long busId) { this.busId = busId; }

    public String getBusName() { return busName; }
    public void setBusName(String busName) { this.busName = busName; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public LocalDate getBookingDate() { return bookingDate; }
    public void setBookingDate(LocalDate bookingDate) { this.bookingDate = bookingDate; }

    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<SeatInfoDto> getSeats() { return seats; }
    public void setSeats(List<SeatInfoDto> seats) { this.seats = seats; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BookingResponseDto that = (BookingResponseDto) o;
        return Objects.equals(bookingId, that.bookingId) && Objects.equals(bookingDate, that.bookingDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookingId, bookingDate);
    }

    @Override
    public String toString() {
        return "BookingResponseDto{" +
                "bookingId=" + bookingId +
                ", userId=" + userId +
                ", userName='" + userName + '\'' +
                ", busId=" + busId +
                ", busName='" + busName + '\'' +
                ", source='" + source + '\'' +
                ", destination='" + destination + '\'' +
                ", bookingDate=" + bookingDate +
                ", totalAmount=" + totalAmount +
                ", status='" + status + '\'' +
                ", createdAt=" + createdAt +
                ", seats=" + seats +
                '}';
    }

    public static class SeatInfoDto {
        private Long seatId;
        private String seatNumber;

        public SeatInfoDto() {}

        public SeatInfoDto(Long seatId, String seatNumber) {
            this.seatId = seatId;
            this.seatNumber = seatNumber;
        }

        // Getters and Setters
        public Long getSeatId() { return seatId; }
        public void setSeatId(Long seatId) { this.seatId = seatId; }

        public String getSeatNumber() { return seatNumber; }
        public void setSeatNumber(String seatNumber) { this.seatNumber = seatNumber; }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            SeatInfoDto seatInfoDto = (SeatInfoDto) o;
            return Objects.equals(seatId, seatInfoDto.seatId) && Objects.equals(seatNumber, seatInfoDto.seatNumber);
        }

        @Override
        public int hashCode() {
            return Objects.hash(seatId, seatNumber);
        }

        @Override
        public String toString() {
            return "SeatInfoDto{" +
                    "seatId=" + seatId +
                    ", seatNumber='" + seatNumber + '\'' +
                    '}';
        }
    }
}
