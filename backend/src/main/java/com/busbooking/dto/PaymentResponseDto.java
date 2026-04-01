package com.busbooking.dto;

import java.time.LocalDateTime;
import java.util.Objects;

public class PaymentResponseDto {
    private String paymentId;
    private Long bookingId;
    private String paymentStatus; // "SUCCESS", "FAILED", "PENDING", "REFUNDED"
    private String transactionId;
    private Double amount;
    private String currency;
    private String paymentMethod;
    private LocalDateTime paymentDate;
    private String gatewayResponse; // Raw response from payment gateway
    private String errorMessage; // If payment failed
    private String refundId; // If refunded
    private LocalDateTime refundDate; // If refunded

    public PaymentResponseDto() {}

    public PaymentResponseDto(String paymentId, Long bookingId, String paymentStatus, 
                             String transactionId, Double amount, String currency, 
                             String paymentMethod, LocalDateTime paymentDate) {
        this.paymentId = paymentId;
        this.bookingId = bookingId;
        this.paymentStatus = paymentStatus;
        this.transactionId = transactionId;
        this.amount = amount;
        this.currency = currency;
        this.paymentMethod = paymentMethod;
        this.paymentDate = paymentDate;
    }

    // Getters and Setters
    public String getPaymentId() { return paymentId; }
    public void setPaymentId(String paymentId) { this.paymentId = paymentId; }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public LocalDateTime getPaymentDate() { return paymentDate; }
    public void setPaymentDate(LocalDateTime paymentDate) { this.paymentDate = paymentDate; }

    public String getGatewayResponse() { return gatewayResponse; }
    public void setGatewayResponse(String gatewayResponse) { this.gatewayResponse = gatewayResponse; }

    public String getErrorMessage() { return errorMessage; }
    public void setErrorMessage(String errorMessage) { this.errorMessage = errorMessage; }

    public String getRefundId() { return refundId; }
    public void setRefundId(String refundId) { this.refundId = refundId; }

    public LocalDateTime getRefundDate() { return refundDate; }
    public void setRefundDate(LocalDateTime refundDate) { this.refundDate = refundDate; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PaymentResponseDto that = (PaymentResponseDto) o;
        return Objects.equals(paymentId, that.paymentId) && 
               Objects.equals(bookingId, that.bookingId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(paymentId, bookingId);
    }

    @Override
    public String toString() {
        return "PaymentResponseDto{" +
                "paymentId='" + paymentId + '\'' +
                ", bookingId=" + bookingId +
                ", paymentStatus='" + paymentStatus + '\'' +
                ", transactionId='" + transactionId + '\'' +
                ", amount=" + amount +
                ", currency='" + currency + '\'' +
                ", paymentMethod='" + paymentMethod + '\'' +
                ", paymentDate=" + paymentDate +
                ", errorMessage='" + errorMessage + '\'' +
                '}';
    }
}
