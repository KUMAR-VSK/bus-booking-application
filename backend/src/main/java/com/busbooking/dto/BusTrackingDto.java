package com.busbooking.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

public class BusTrackingDto {
    private Long busId;
    private String busName;
    private String busNumber;
    private String currentStatus; // "ON_TIME", "DELAYED", "CANCELLED", "ARRIVED", "DEPARTED"
    private Double latitude;
    private Double longitude;
    private String currentLocation;
    private String lastUpdated;
    private Double speed; // km/h
    private String nextStop;
    private Integer distanceToNextStop; // km
    private Integer estimatedTimeToNextStop; // minutes
    private String source;
    private String destination;
    private String scheduledDepartureTime;
    private String scheduledArrivalTime;
    private String actualDepartureTime;
    private String estimatedArrivalTime;
    private String delayInformation;
    private List<BusStopDto> upcomingStops;
    private Integer occupancyRate; // percentage
    private String driverName;
    private String driverPhone;

    public BusTrackingDto() {}

    // Nested class for bus stops
    public static class BusStopDto {
        private String stopName;
        private String scheduledTime;
        private String estimatedTime;
        private String actualTime;
        private String status; // "PENDING", "ARRIVED", "DEPARTED", "SKIPPED"
        private Integer stopOrder;
        private Double distanceFromPrevious; // km

        public BusStopDto() {}

        // Getters and Setters
        public String getStopName() { return stopName; }
        public void setStopName(String stopName) { this.stopName = stopName; }

        public String getScheduledTime() { return scheduledTime; }
        public void setScheduledTime(String scheduledTime) { this.scheduledTime = scheduledTime; }

        public String getEstimatedTime() { return estimatedTime; }
        public void setEstimatedTime(String estimatedTime) { this.estimatedTime = estimatedTime; }

        public String getActualTime() { return actualTime; }
        public void setActualTime(String actualTime) { this.actualTime = actualTime; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public Integer getStopOrder() { return stopOrder; }
        public void setStopOrder(Integer stopOrder) { this.stopOrder = stopOrder; }

        public Double getDistanceFromPrevious() { return distanceFromPrevious; }
        public void setDistanceFromPrevious(Double distanceFromPrevious) { this.distanceFromPrevious = distanceFromPrevious; }
    }

    // Getters and Setters
    public Long getBusId() { return busId; }
    public void setBusId(Long busId) { this.busId = busId; }

    public String getBusName() { return busName; }
    public void setBusName(String busName) { this.busName = busName; }

    public String getBusNumber() { return busNumber; }
    public void setBusNumber(String busNumber) { this.busNumber = busNumber; }

    public String getCurrentStatus() { return currentStatus; }
    public void setCurrentStatus(String currentStatus) { this.currentStatus = currentStatus; }

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

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public String getScheduledDepartureTime() { return scheduledDepartureTime; }
    public void setScheduledDepartureTime(String scheduledDepartureTime) { this.scheduledDepartureTime = scheduledDepartureTime; }

    public String getScheduledArrivalTime() { return scheduledArrivalTime; }
    public void setScheduledArrivalTime(String scheduledArrivalTime) { this.scheduledArrivalTime = scheduledArrivalTime; }

    public String getActualDepartureTime() { return actualDepartureTime; }
    public void setActualDepartureTime(String actualDepartureTime) { this.actualDepartureTime = actualDepartureTime; }

    public String getEstimatedArrivalTime() { return estimatedArrivalTime; }
    public void setEstimatedArrivalTime(String estimatedArrivalTime) { this.estimatedArrivalTime = estimatedArrivalTime; }

    public String getDelayInformation() { return delayInformation; }
    public void setDelayInformation(String delayInformation) { this.delayInformation = delayInformation; }

    public List<BusStopDto> getUpcomingStops() { return upcomingStops; }
    public void setUpcomingStops(List<BusStopDto> upcomingStops) { this.upcomingStops = upcomingStops; }

    public Integer getOccupancyRate() { return occupancyRate; }
    public void setOccupancyRate(Integer occupancyRate) { this.occupancyRate = occupancyRate; }

    public String getDriverName() { return driverName; }
    public void setDriverName(String driverName) { this.driverName = driverName; }

    public String getDriverPhone() { return driverPhone; }
    public void setDriverPhone(String driverPhone) { this.driverPhone = driverPhone; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BusTrackingDto that = (BusTrackingDto) o;
        return Objects.equals(busId, that.busId) && 
               Objects.equals(busNumber, that.busNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(busId, busNumber);
    }

    @Override
    public String toString() {
        return "BusTrackingDto{" +
                "busId=" + busId +
                ", busName='" + busName + '\'' +
                ", busNumber='" + busNumber + '\'' +
                ", currentStatus='" + currentStatus + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", currentLocation='" + currentLocation + '\'' +
                ", lastUpdated='" + lastUpdated + '\'' +
                ", speed=" + speed +
                ", nextStop='" + nextStop + '\'' +
                ", distanceToNextStop=" + distanceToNextStop +
                ", estimatedTimeToNextStop=" + estimatedTimeToNextStop +
                ", source='" + source + '\'' +
                ", destination='" + destination + '\'' +
                ", scheduledDepartureTime='" + scheduledDepartureTime + '\'' +
                ", scheduledArrivalTime='" + scheduledArrivalTime + '\'' +
                ", actualDepartureTime='" + actualDepartureTime + '\'' +
                ", estimatedArrivalTime='" + estimatedArrivalTime + '\'' +
                ", delayInformation='" + delayInformation + '\'' +
                ", upcomingStops=" + upcomingStops +
                ", occupancyRate=" + occupancyRate +
                ", driverName='" + driverName + '\'' +
                ", driverPhone='" + driverPhone + '\'' +
                '}';
    }
}
