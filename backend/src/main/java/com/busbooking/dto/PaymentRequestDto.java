package com.busbooking.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

public class PaymentRequestDto {
    private Long bookingId;
    private String paymentMethod; // "CREDIT_CARD", "DEBIT_CARD", "UPI", "NET_BANKING", "WALLET"
    private Double amount;
    private String currency; // "INR", "USD", etc.
    private CardDetailsDto cardDetails;
    private UpiDetailsDto upiDetails;
    private NetBankingDetailsDto netBankingDetails;
    private String returnUrl;
    private String cancelUrl;
    private String customerEmail;
    private String customerPhone;

    public PaymentRequestDto() {}

    // Nested class for card details
    public static class CardDetailsDto {
        private String cardNumber;
        private String cardHolderName;
        private String expiryMonth;
        private String expiryYear;
        private String cvv;
        private String cardType; // "VISA", "MASTERCARD", "RUPAY"

        // Getters and Setters
        public String getCardNumber() { return cardNumber; }
        public void setCardNumber(String cardNumber) { this.cardNumber = cardNumber; }

        public String getCardHolderName() { return cardHolderName; }
        public void setCardHolderName(String cardHolderName) { this.cardHolderName = cardHolderName; }

        public String getExpiryMonth() { return expiryMonth; }
        public void setExpiryMonth(String expiryMonth) { this.expiryMonth = expiryMonth; }

        public String getExpiryYear() { return expiryYear; }
        public void setExpiryYear(String expiryYear) { this.expiryYear = expiryYear; }

        public String getCvv() { return cvv; }
        public void setCvv(String cvv) { this.cvv = cvv; }

        public String getCardType() { return cardType; }
        public void setCardType(String cardType) { this.cardType = cardType; }
    }

    // Nested class for UPI details
    public static class UpiDetailsDto {
        private String upiId;
        private String upiApp; // "GPay", "PhonePe", "Paytm"

        // Getters and Setters
        public String getUpiId() { return upiId; }
        public void setUpiId(String upiId) { this.upiId = upiId; }

        public String getUpiApp() { return upiApp; }
        public void setUpiApp(String upiApp) { this.upiApp = upiApp; }
    }

    // Nested class for net banking details
    public static class NetBankingDetailsDto {
        private String bankCode;
        private String bankName;

        // Getters and Setters
        public String getBankCode() { return bankCode; }
        public void setBankCode(String bankCode) { this.bankCode = bankCode; }

        public String getBankName() { return bankName; }
        public void setBankName(String bankName) { this.bankName = bankName; }
    }

    // Getters and Setters
    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public CardDetailsDto getCardDetails() { return cardDetails; }
    public void setCardDetails(CardDetailsDto cardDetails) { this.cardDetails = cardDetails; }

    public UpiDetailsDto getUpiDetails() { return upiDetails; }
    public void setUpiDetails(UpiDetailsDto upiDetails) { this.upiDetails = upiDetails; }

    public NetBankingDetailsDto getNetBankingDetails() { return netBankingDetails; }
    public void setNetBankingDetails(NetBankingDetailsDto netBankingDetails) { this.netBankingDetails = netBankingDetails; }

    public String getReturnUrl() { return returnUrl; }
    public void setReturnUrl(String returnUrl) { this.returnUrl = returnUrl; }

    public String getCancelUrl() { return cancelUrl; }
    public void setCancelUrl(String cancelUrl) { this.cancelUrl = cancelUrl; }

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }

    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PaymentRequestDto that = (PaymentRequestDto) o;
        return Objects.equals(bookingId, that.bookingId) && 
               Objects.equals(paymentMethod, that.paymentMethod);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookingId, paymentMethod);
    }

    @Override
    public String toString() {
        return "PaymentRequestDto{" +
                "bookingId=" + bookingId +
                ", paymentMethod='" + paymentMethod + '\'' +
                ", amount=" + amount +
                ", currency='" + currency + '\'' +
                ", customerEmail='" + customerEmail + '\'' +
                ", customerPhone='" + customerPhone + '\'' +
                '}';
    }
}
