package com.busbooking.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

public class BookingRequestDto {
    private Long userId;
    private Long busId;
    private List<Long> seatIds;
    private LocalDate bookingDate;

    public BookingRequestDto() {}

    public BookingRequestDto(Long userId, Long busId, List<Long> seatIds, LocalDate bookingDate) {
        this.userId = userId;
        this.busId = busId;
        this.seatIds = seatIds;
        this.bookingDate = bookingDate;
    }

    // Getters and Setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getBusId() { return busId; }
    public void setBusId(Long busId) { this.busId = busId; }

    public List<Long> getSeatIds() { return seatIds; }
    public void setSeatIds(List<Long> seatIds) { this.seatIds = seatIds; }

    public LocalDate getBookingDate() { return bookingDate; }
    public void setBookingDate(LocalDate bookingDate) { this.bookingDate = bookingDate; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BookingRequestDto that = (BookingRequestDto) o;
        return Objects.equals(userId, that.userId) && Objects.equals(busId, that.busId) && Objects.equals(bookingDate, that.bookingDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, busId, bookingDate);
    }

    @Override
    public String toString() {
        return "BookingRequestDto{" +
                "userId=" + userId +
                ", busId=" + busId +
                ", seatIds=" + seatIds +
                ", bookingDate=" + bookingDate +
                '}';
    }
}
