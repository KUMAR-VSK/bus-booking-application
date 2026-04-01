package com.busbooking.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Objects;

public class BookingWorkflowDto {
    private Long bookingId;
    private String bookingReference; // Unique booking reference number
    private Long userId;
    private Long busId;
    private String busName;
    private String source;
    private String destination;
    private LocalDate travelDate;
    private LocalTime departureTime;
    private LocalTime arrivalTime;
    private List<PassengerDetailsDto> passengers;
    private List<String> selectedSeats;
    private Double baseFare;
    private Double taxesAndFees;
    private Double totalAmount;
    private String paymentStatus; // "PENDING", "COMPLETED", "FAILED", "REFUNDED"
    private String paymentMethod; // "CREDIT_CARD", "DEBIT_CARD", "UPI", "NET_BANKING"
    private String paymentId; // Payment gateway transaction ID
    private String bookingStatus; // "CONFIRMED", "PENDING", "CANCELLED"
    private LocalDate bookingDate;
    private String pnrNumber; // Passenger Name Record number

    public BookingWorkflowDto() {}

    // Getters and Setters
    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public String getBookingReference() { return bookingReference; }
    public void setBookingReference(String bookingReference) { this.bookingReference = bookingReference; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getBusId() { return busId; }
    public void setBusId(Long busId) { this.busId = busId; }

    public String getBusName() { return busName; }
    public void setBusName(String busName) { this.busName = busName; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public LocalDate getTravelDate() { return travelDate; }
    public void setTravelDate(LocalDate travelDate) { this.travelDate = travelDate; }

    public LocalTime getDepartureTime() { return departureTime; }
    public void setDepartureTime(LocalTime departureTime) { this.departureTime = departureTime; }

    public LocalTime getArrivalTime() { return arrivalTime; }
    public void setArrivalTime(LocalTime arrivalTime) { this.arrivalTime = arrivalTime; }

    public List<PassengerDetailsDto> getPassengers() { return passengers; }
    public void setPassengers(List<PassengerDetailsDto> passengers) { this.passengers = passengers; }

    public List<String> getSelectedSeats() { return selectedSeats; }
    public void setSelectedSeats(List<String> selectedSeats) { this.selectedSeats = selectedSeats; }

    public Double getBaseFare() { return baseFare; }
    public void setBaseFare(Double baseFare) { this.baseFare = baseFare; }

    public Double getTaxesAndFees() { return taxesAndFees; }
    public void setTaxesAndFees(Double taxesAndFees) { this.taxesAndFees = taxesAndFees; }

    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getPaymentId() { return paymentId; }
    public void setPaymentId(String paymentId) { this.paymentId = paymentId; }

    public String getBookingStatus() { return bookingStatus; }
    public void setBookingStatus(String bookingStatus) { this.bookingStatus = bookingStatus; }

    public LocalDate getBookingDate() { return bookingDate; }
    public void setBookingDate(LocalDate bookingDate) { this.bookingDate = bookingDate; }

    public String getPnrNumber() { return pnrNumber; }
    public void setPnrNumber(String pnrNumber) { this.pnrNumber = pnrNumber; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BookingWorkflowDto that = (BookingWorkflowDto) o;
        return Objects.equals(bookingId, that.bookingId) && 
               Objects.equals(bookingReference, that.bookingReference);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookingId, bookingReference);
    }

    @Override
    public String toString() {
        return "BookingWorkflowDto{" +
                "bookingId=" + bookingId +
                ", bookingReference='" + bookingReference + '\'' +
                ", userId=" + userId +
                ", busId=" + busId +
                ", busName='" + busName + '\'' +
                ", source='" + source + '\'' +
                ", destination='" + destination + '\'' +
                ", travelDate=" + travelDate +
                ", departureTime=" + departureTime +
                ", arrivalTime=" + arrivalTime +
                ", passengers=" + passengers +
                ", selectedSeats=" + selectedSeats +
                ", baseFare=" + baseFare +
                ", taxesAndFees=" + taxesAndFees +
                ", totalAmount=" + totalAmount +
                ", paymentStatus='" + paymentStatus + '\'' +
                ", paymentMethod='" + paymentMethod + '\'' +
                ", paymentId='" + paymentId + '\'' +
                ", bookingStatus='" + bookingStatus + '\'' +
                ", bookingDate=" + bookingDate +
                ", pnrNumber='" + pnrNumber + '\'' +
                '}';
    }
}
