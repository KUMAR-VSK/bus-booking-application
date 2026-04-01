package com.busbooking.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Long bookingId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bus_id", nullable = false)
    private Bus bus;

    @Column(name = "booking_date", nullable = false)
    private LocalDate bookingDate;

    @Column(name = "total_amount", nullable = false)
    private Double totalAmount;

    @Column(nullable = false)
    private String status = "BOOKED";

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BookingSeat> bookingSeats = new ArrayList<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Booking() {}

    public Booking(Long bookingId, User user, Bus bus, LocalDate bookingDate, Double totalAmount, String status, LocalDateTime createdAt) {
        this.bookingId = bookingId;
        this.user = user;
        this.bus = bus;
        this.bookingDate = bookingDate;
        this.totalAmount = totalAmount;
        this.status = status;
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Bus getBus() { return bus; }
    public void setBus(Bus bus) { this.bus = bus; }

    public LocalDate getBookingDate() { return bookingDate; }
    public void setBookingDate(LocalDate bookingDate) { this.bookingDate = bookingDate; }

    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<BookingSeat> getBookingSeats() { return bookingSeats; }
    public void setBookingSeats(List<BookingSeat> bookingSeats) { this.bookingSeats = bookingSeats; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Booking booking = (Booking) o;
        return Objects.equals(bookingId, booking.bookingId) && Objects.equals(bookingDate, booking.bookingDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookingId, bookingDate);
    }

    @Override
    public String toString() {
        return "Booking{" +
                "bookingId=" + bookingId +
                ", user=" + user +
                ", bus=" + bus +
                ", bookingDate=" + bookingDate +
                ", totalAmount=" + totalAmount +
                ", status='" + status + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}