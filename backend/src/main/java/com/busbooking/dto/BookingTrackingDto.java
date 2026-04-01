package com.busbooking.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

public class BookingTrackingDto {
    private String bookingReference;
    private String bookingStatus; // "SEARCHING", "SEAT_SELECTED", "PAYMENT_PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"
    private String paymentStatus; // "PENDING", "COMPLETED", "FAILED", "REFUNDED"
    private LocalDateTime bookingDate;
    private LocalDateTime lastUpdated;
    private String currentStep; // "SEARCH", "SEAT_SELECTION", "PASSENGER_DETAILS", "PAYMENT", "CONFIRMATION"
    private Integer currentStepNumber; // 1-5
    private List<TrackingStepDto> trackingSteps;
    private BusLocationDto busLocation;
    private String estimatedArrivalTime;
    private String actualArrivalTime;
    private String delayInformation;

    public BookingTrackingDto() {}

    // Nested class for tracking steps
    public static class TrackingStepDto {
        private String stepName;
        private String stepStatus; // "PENDING", "IN_PROGRESS", "COMPLETED", "FAILED"
        private LocalDateTime timestamp;
        private String description;

        public TrackingStepDto() {}

        public TrackingStepDto(String stepName, String stepStatus, LocalDateTime timestamp, String description) {
            this.stepName = stepName;
            this.stepStatus = stepStatus;
            this.timestamp = timestamp;
            this.description = description;
        }

        // Getters and Setters
        public String getStepName() { return stepName; }
        public void setStepName(String stepName) { this.stepName = stepName; }

        public String getStepStatus() { return stepStatus; }
        public void setStepStatus(String stepStatus) { this.stepStatus = stepStatus; }

        public LocalDateTime getTimestamp() { return timestamp; }
        public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }

    // Nested class for bus location
    public static class BusLocationDto {
        private Double latitude;
        private Double longitude;
        private String currentLocation;
        private String lastUpdated;
        private Double speed; // km/h
        private String nextStop;
        private Integer distanceToNextStop; // km
        private Integer estimatedTimeToNextStop; // minutes

        public BusLocationDto() {}

        // Getters and Setters
        public Double getLatitude() { return latitude; }
        public void setLatitude(Double latitude) { this.latitude = latitude; }

        public Double getLongitude() { return longitude; }
        public void setLongitude(Double longitude) { this.longitude = longitude; }

        public String getCurrentLocation() { return currentLocation; }
        public void setCurrentLocation(String currentLocation) { this.currentLocation = currentLocation; }

        public String getLastUpdated() { return lastUpdated; }
        public void setLastUpdated(String lastUpdated) { this.lastUpdated = lastUpdated; }

        public Double getSpeed() { return speed; }
        public void setSpeed(Double speed) { this.speed = speed; }

        public String getNextStop() { return nextStop; }
        public void setNextStop(String nextStop) { this.nextStop = nextStop; }

        public Integer getDistanceToNextStop() { return distanceToNextStop; }
        public void setDistanceToNextStop(Integer distanceToNextStop) { this.distanceToNextStop = distanceToNextStop; }

        public Integer getEstimatedTimeToNextStop() { return estimatedTimeToNextStop; }
        public void setEstimatedTimeToNextStop(Integer estimatedTimeToNextStop) { this.estimatedTimeToNextStop = estimatedTimeToNextStop; }
    }

    // Getters and Setters
    public String getBookingReference() { return bookingReference; }
    public void setBookingReference(String bookingReference) { this.bookingReference = bookingReference; }

    public String getBookingStatus() { return bookingStatus; }
    public void setBookingStatus(String bookingStatus) { this.bookingStatus = bookingStatus; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public LocalDateTime getBookingDate() { return bookingDate; }
    public void setBookingDate(LocalDateTime bookingDate) { this.bookingDate = bookingDate; }

    public LocalDateTime getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(LocalDateTime lastUpdated) { this.lastUpdated = lastUpdated; }

    public String getCurrentStep() { return currentStep; }
    public void setCurrentStep(String currentStep) { this.currentStep = currentStep; }

    public Integer getCurrentStepNumber() { return currentStepNumber; }
    public void setCurrentStepNumber(Integer currentStepNumber) { this.currentStepNumber = currentStepNumber; }

    public List<TrackingStepDto> getTrackingSteps() { return trackingSteps; }
    public void setTrackingSteps(List<TrackingStepDto> trackingSteps) { this.trackingSteps = trackingSteps; }

    public BusLocationDto getBusLocation() { return busLocation; }
    public void setBusLocation(BusLocationDto busLocation) { this.busLocation = busLocation; }

    public String getEstimatedArrivalTime() { return estimatedArrivalTime; }
    public void setEstimatedArrivalTime(String estimatedArrivalTime) { this.estimatedArrivalTime = estimatedArrivalTime; }

    public String getActualArrivalTime() { return actualArrivalTime; }
    public void setActualArrivalTime(String actualArrivalTime) { this.actualArrivalTime = actualArrivalTime; }

    public String getDelayInformation() { return delayInformation; }
    public void setDelayInformation(String delayInformation) { this.delayInformation = delayInformation; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BookingTrackingDto that = (BookingTrackingDto) o;
        return Objects.equals(bookingReference, that.bookingReference);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookingReference);
    }

    @Override
    public String toString() {
        return "BookingTrackingDto{" +
                "bookingReference='" + bookingReference + '\'' +
                ", bookingStatus='" + bookingStatus + '\'' +
                ", paymentStatus='" + paymentStatus + '\'' +
                ", bookingDate=" + bookingDate +
                ", lastUpdated=" + lastUpdated +
                ", currentStep='" + currentStep + '\'' +
                ", currentStepNumber=" + currentStepNumber +
                ", trackingSteps=" + trackingSteps +
                ", busLocation=" + busLocation +
                ", estimatedArrivalTime='" + estimatedArrivalTime + '\'' +
                ", actualArrivalTime='" + actualArrivalTime + '\'' +
                ", delayInformation='" + delayInformation + '\'' +
                '}';
    }
}
