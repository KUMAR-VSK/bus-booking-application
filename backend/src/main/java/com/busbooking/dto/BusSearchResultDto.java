package com.busbooking.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Objects;

public class BusSearchResultDto {
    private Long busId;
    private String busName;
    private String source;
    private String destination;
    private LocalTime departureTime;
    private LocalTime arrivalTime;
    private Double duration; // in hours
    private Integer totalSeats;
    private Integer availableSeats;
    private Double pricePerSeat;
    private Double totalPrice;
    private String busType; // "AC", "Non-AC", "Sleeper", "Semi-Sleeper"
    private List<String> amenities; // WiFi, Charging, etc.
    private String operatorName;
    private Double rating; // Bus rating out of 5
    private LocalDate travelDate;

    public BusSearchResultDto() {}

    // Nested class for seat information
    public static class SeatInfoDto {
        private Long seatId;
        private String seatNumber;
        private Boolean isAvailable;
        private String seatType; // "WINDOW", "AISLE", "MIDDLE"
        private Double price;
        private Boolean isSelected; // For UI state

        public SeatInfoDto() {}

        public SeatInfoDto(Long seatId, String seatNumber, Boolean isAvailable, 
                          String seatType, Double price, Boolean isSelected) {
            this.seatId = seatId;
            this.seatNumber = seatNumber;
            this.isAvailable = isAvailable;
            this.seatType = seatType;
            this.price = price;
            this.isSelected = isSelected;
        }

        // Getters and Setters
        public Long getSeatId() { return seatId; }
        public void setSeatId(Long seatId) { this.seatId = seatId; }

        public String getSeatNumber() { return seatNumber; }
        public void setSeatNumber(String seatNumber) { this.seatNumber = seatNumber; }

        public Boolean getIsAvailable() { return isAvailable; }
        public void setIsAvailable(Boolean isAvailable) { this.isAvailable = isAvailable; }

        public String getSeatType() { return seatType; }
        public void setSeatType(String seatType) { this.seatType = seatType; }

        public Double getPrice() { return price; }
        public void setPrice(Double price) { this.price = price; }

        public Boolean getIsSelected() { return isSelected; }
        public void setIsSelected(Boolean isSelected) { this.isSelected = isSelected; }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            SeatInfoDto seatInfoDto = (SeatInfoDto) o;
            return Objects.equals(seatId, seatInfoDto.seatId) && 
                   Objects.equals(seatNumber, seatInfoDto.seatNumber);
        }

        @Override
        public int hashCode() {
            return Objects.hash(seatId, seatNumber);
        }

        @Override
        public String toString() {
            return "SeatInfoDto{" +
                    "seatId=" + seatId +
                    ", seatNumber='" + seatNumber + '\'' +
                    ", isAvailable=" + isAvailable +
                    ", seatType='" + seatType + '\'' +
                    ", price=" + price +
                    ", isSelected=" + isSelected +
                    '}';
        }
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

    public Double getDuration() { return duration; }
    public void setDuration(Double duration) { this.duration = duration; }

    public Integer getTotalSeats() { return totalSeats; }
    public void setTotalSeats(Integer totalSeats) { this.totalSeats = totalSeats; }

    public Integer getAvailableSeats() { return availableSeats; }
    public void setAvailableSeats(Integer availableSeats) { this.availableSeats = availableSeats; }

    public Double getPricePerSeat() { return pricePerSeat; }
    public void setPricePerSeat(Double pricePerSeat) { this.pricePerSeat = pricePerSeat; }

    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }

    public String getBusType() { return busType; }
    public void setBusType(String busType) { this.busType = busType; }

    public List<String> getAmenities() { return amenities; }
    public void setAmenities(List<String> amenities) { this.amenities = amenities; }

    public String getOperatorName() { return operatorName; }
    public void setOperatorName(String operatorName) { this.operatorName = operatorName; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public LocalDate getTravelDate() { return travelDate; }
    public void setTravelDate(LocalDate travelDate) { this.travelDate = travelDate; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BusSearchResultDto that = (BusSearchResultDto) o;
        return Objects.equals(busId, that.busId) && 
               Objects.equals(travelDate, that.travelDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(busId, travelDate);
    }

    @Override
    public String toString() {
        return "BusSearchResultDto{" +
                "busId=" + busId +
                ", busName='" + busName + '\'' +
                ", source='" + source + '\'' +
                ", destination='" + destination + '\'' +
                ", departureTime=" + departureTime +
                ", arrivalTime=" + arrivalTime +
                ", duration=" + duration +
                ", totalSeats=" + totalSeats +
                ", availableSeats=" + availableSeats +
                ", pricePerSeat=" + pricePerSeat +
                ", totalPrice=" + totalPrice +
                ", busType='" + busType + '\'' +
                ", amenities=" + amenities +
                ", operatorName='" + operatorName + '\'' +
                ", rating=" + rating +
                ", travelDate=" + travelDate +
                '}';
    }
}
