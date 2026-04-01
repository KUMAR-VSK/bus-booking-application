package com.busbooking.entity;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "seats")
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seat_id")
    private Long seatId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bus_id", nullable = false)
    private Bus bus;

    @Column(name = "seat_number", nullable = false)
    private String seatNumber;

    @Column(name = "is_available", nullable = false)
    private Boolean isAvailable = true;

    public Seat() {}

    public Seat(Long seatId, Bus bus, String seatNumber, Boolean isAvailable) {
        this.seatId = seatId;
        this.bus = bus;
        this.seatNumber = seatNumber;
        this.isAvailable = isAvailable;
    }

    // Getters and Setters
    public Long getSeatId() { return seatId; }
    public void setSeatId(Long seatId) { this.seatId = seatId; }

    public Bus getBus() { return bus; }
    public void setBus(Bus bus) { this.bus = bus; }

    public String getSeatNumber() { return seatNumber; }
    public void setSeatNumber(String seatNumber) { this.seatNumber = seatNumber; }

    public Boolean getIsAvailable() { return isAvailable; }
    public void setIsAvailable(Boolean isAvailable) { this.isAvailable = isAvailable; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Seat seat = (Seat) o;
        return Objects.equals(seatId, seat.seatId) && Objects.equals(seatNumber, seat.seatNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(seatId, seatNumber);
    }

    @Override
    public String toString() {
        return "Seat{" +
                "seatId=" + seatId +
                ", bus=" + bus +
                ", seatNumber='" + seatNumber + '\'' +
                ", isAvailable=" + isAvailable +
                '}';
    }
}