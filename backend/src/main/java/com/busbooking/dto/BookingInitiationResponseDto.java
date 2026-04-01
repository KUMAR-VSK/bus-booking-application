package com.busbooking.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

public class BookingInitiationResponseDto {
    private String bookingId;
    private String bookingReference;
    private String temporaryBookingId;
    private Double baseFare;
    private Double taxesAndFees;
    private Double totalAmount;
    private LocalDateTime expiryTime; // 15 minutes from now
    private String paymentUrl; // URL for payment processing
    private List<String> selectedSeats;
    private String status; // "INITIATED", "SEATS_HELD", "FAILED"

    public BookingInitiationResponseDto() {}

    public BookingInitiationResponseDto(String bookingId, String bookingReference, 
                                       String temporaryBookingId, Double baseFare, 
                                       Double taxesAndFees, Double totalAmount, 
                                       LocalDateTime expiryTime, String status) {
        this.bookingId = bookingId;
        this.bookingReference = bookingReference;
        this.temporaryBookingId = temporaryBookingId;
        this.baseFare = baseFare;
        this.taxesAndFees = taxesAndFees;
        this.totalAmount = totalAmount;
        this.expiryTime = expiryTime;
        this.status = status;
    }

    // Getters and Setters
    public String getBookingId() { return bookingId; }
    public void setBookingId(String bookingId) { this.bookingId = bookingId; }

    public String getBookingReference() { return bookingReference; }
    public void setBookingReference(String bookingReference) { this.bookingReference = bookingReference; }

    public String getTemporaryBookingId() { return temporaryBookingId; }
    public void setTemporaryBookingId(String temporaryBookingId) { this.temporaryBookingId = temporaryBookingId; }

    public Double getBaseFare() { return baseFare; }
    public void setBaseFare(Double baseFare) { this.baseFare = baseFare; }

    public Double getTaxesAndFees() { return taxesAndFees; }
    public void setTaxesAndFees(Double taxesAndFees) { this.taxesAndFees = taxesAndFees; }

    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

    public LocalDateTime getExpiryTime() { return expiryTime; }
    public void setExpiryTime(LocalDateTime expiryTime) { this.expiryTime = expiryTime; }

    public String getPaymentUrl() { return paymentUrl; }
    public void setPaymentUrl(String paymentUrl) { this.paymentUrl = paymentUrl; }

    public List<String> getSelectedSeats() { return selectedSeats; }
    public void setSelectedSeats(List<String> selectedSeats) { this.selectedSeats = selectedSeats; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BookingInitiationResponseDto that = (BookingInitiationResponseDto) o;
        return Objects.equals(bookingId, that.bookingId) && 
               Objects.equals(bookingReference, that.bookingReference);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookingId, bookingReference);
    }

    @Override
    public String toString() {
        return "BookingInitiationResponseDto{" +
                "bookingId='" + bookingId + '\'' +
                ", bookingReference='" + bookingReference + '\'' +
                ", temporaryBookingId='" + temporaryBookingId + '\'' +
                ", baseFare=" + baseFare +
                ", taxesAndFees=" + taxesAndFees +
                ", totalAmount=" + totalAmount +
                ", expiryTime=" + expiryTime +
                ", paymentUrl='" + paymentUrl + '\'' +
                ", selectedSeats=" + selectedSeats +
                ", status='" + status + '\'' +
                '}';
    }
}
