package com.busbooking.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

public class CancellationResponseDto {
    private String bookingReference;
    private String cancellationStatus; // "SUCCESS", "FAILED", "PARTIAL_REFUND", "NO_REFUND"
    private String cancellationId;
    private LocalDateTime cancellationDate;
    private Double refundAmount;
    private String refundStatus; // "PROCESSING", "COMPLETED", "FAILED", "PENDING"
    private String refundId;
    private LocalDateTime expectedRefundDate;
    private String cancellationReason;
    private List<String> cancelledSeats;
    private Double cancellationCharges;
    private String refundMethod; // "ORIGINAL", "WALLET", "BANK_TRANSFER"
    private Integer processingDays; // Number of days for refund processing

    public CancellationResponseDto() {}

    public CancellationResponseDto(String bookingReference, String cancellationStatus, 
                                 String cancellationId, LocalDateTime cancellationDate) {
        this.bookingReference = bookingReference;
        this.cancellationStatus = cancellationStatus;
        this.cancellationId = cancellationId;
        this.cancellationDate = cancellationDate;
    }

    // Getters and Setters
    public String getBookingReference() { return bookingReference; }
    public void setBookingReference(String bookingReference) { this.bookingReference = bookingReference; }

    public String getCancellationStatus() { return cancellationStatus; }
    public void setCancellationStatus(String cancellationStatus) { this.cancellationStatus = cancellationStatus; }

    public String getCancellationId() { return cancellationId; }
    public void setCancellationId(String cancellationId) { this.cancellationId = cancellationId; }

    public LocalDateTime getCancellationDate() { return cancellationDate; }
    public void setCancellationDate(LocalDateTime cancellationDate) { this.cancellationDate = cancellationDate; }

    public Double getRefundAmount() { return refundAmount; }
    public void setRefundAmount(Double refundAmount) { this.refundAmount = refundAmount; }

    public String getRefundStatus() { return refundStatus; }
    public void setRefundStatus(String refundStatus) { this.refundStatus = refundStatus; }

    public String getRefundId() { return refundId; }
    public void setRefundId(String refundId) { this.refundId = refundId; }

    public LocalDateTime getExpectedRefundDate() { return expectedRefundDate; }
    public void setExpectedRefundDate(LocalDateTime expectedRefundDate) { this.expectedRefundDate = expectedRefundDate; }

    public String getCancellationReason() { return cancellationReason; }
    public void setCancellationReason(String cancellationReason) { this.cancellationReason = cancellationReason; }

    public List<String> getCancelledSeats() { return cancelledSeats; }
    public void setCancelledSeats(List<String> cancelledSeats) { this.cancelledSeats = cancelledSeats; }

    public Double getCancellationCharges() { return cancellationCharges; }
    public void setCancellationCharges(Double cancellationCharges) { this.cancellationCharges = cancellationCharges; }

    public String getRefundMethod() { return refundMethod; }
    public void setRefundMethod(String refundMethod) { this.refundMethod = refundMethod; }

    public Integer getProcessingDays() { return processingDays; }
    public void setProcessingDays(Integer processingDays) { this.processingDays = processingDays; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CancellationResponseDto that = (CancellationResponseDto) o;
        return Objects.equals(bookingReference, that.bookingReference) && 
               Objects.equals(cancellationId, that.cancellationId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookingReference, cancellationId);
    }

    @Override
    public String toString() {
        return "CancellationResponseDto{" +
                "bookingReference='" + bookingReference + '\'' +
                ", cancellationStatus='" + cancellationStatus + '\'' +
                ", cancellationId='" + cancellationId + '\'' +
                ", cancellationDate=" + cancellationDate +
                ", refundAmount=" + refundAmount +
                ", refundStatus='" + refundStatus + '\'' +
                ", refundId='" + refundId + '\'' +
                ", expectedRefundDate=" + expectedRefundDate +
                ", cancellationReason='" + cancellationReason + '\'' +
                ", cancelledSeats=" + cancelledSeats +
                ", cancellationCharges=" + cancellationCharges +
                ", refundMethod='" + refundMethod + '\'' +
                ", processingDays=" + processingDays +
                '}';
    }
}
