package com.busbooking.entity;

import jakarta.persistence.*;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "buses")
public class Bus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bus_id")
    private Long busId;

    @Column(name = "bus_name", nullable = false)
    private String busName;

    @Column(nullable = false)
    private String source;

    @Column(nullable = false)
    private String destination;

    @Column(name = "departure_time", nullable = false)
    private LocalTime departureTime;

    @Column(name = "arrival_time", nullable = false)
    private LocalTime arrivalTime;

    @Column(name = "total_seats", nullable = false)
    private Integer totalSeats;

    @OneToMany(mappedBy = "bus", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Seat> seats = new ArrayList<>();

    @OneToMany(mappedBy = "bus", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Booking> bookings = new ArrayList<>();

    public Bus() {}

    public Bus(Long busId, String busName, String source, String destination, LocalTime departureTime, LocalTime arrivalTime, Integer totalSeats) {
        this.busId = busId;
        this.busName = busName;
        this.source = source;
        this.destination = destination;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.totalSeats = totalSeats;
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

    public List<Seat> getSeats() { return seats; }
    public void setSeats(List<Seat> seats) { this.seats = seats; }

    public List<Booking> getBookings() { return bookings; }
    public void setBookings(List<Booking> bookings) { this.bookings = bookings; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Bus bus = (Bus) o;
        return Objects.equals(busId, bus.busId) && Objects.equals(busName, bus.busName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(busId, busName);
    }

    @Override
    public String toString() {
        return "Bus{" +
                "busId=" + busId +
                ", busName='" + busName + '\'' +
                ", source='" + source + '\'' +
                ", destination='" + destination + '\'' +
                ", departureTime=" + departureTime +
                ", arrivalTime=" + arrivalTime +
                ", totalSeats=" + totalSeats +
                '}';
    }
}