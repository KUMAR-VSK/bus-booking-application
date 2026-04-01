package com.busbooking.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Objects;

public class BusSearchRequestDto {
    @JsonProperty("source")
    private String source;
    
    @JsonProperty("destination")
    private String destination;
    
    @JsonProperty("travelDate")
    private LocalDate travelDate;
    
    @JsonProperty("passengers")
    private Integer passengers; // Number of passengers (default: 1)
    
    @JsonProperty("sortBy")
    private String sortBy; // "price", "duration", "departure", "arrival"
    
    @JsonProperty("sortOrder")
    private String sortOrder; // "asc", "desc"

    public BusSearchRequestDto() {}

    public BusSearchRequestDto(String source, String destination, LocalDate travelDate, 
                               Integer passengers, String sortBy, String sortOrder) {
        this.source = source;
        this.destination = destination;
        this.travelDate = travelDate;
        this.passengers = passengers != null ? passengers : 1;
        this.sortBy = sortBy != null ? sortBy : "departure";
        this.sortOrder = sortOrder != null ? sortOrder : "asc";
    }

    // Getters and Setters
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public LocalDate getTravelDate() { return travelDate; }
    public void setTravelDate(LocalDate travelDate) { this.travelDate = travelDate; }

    public Integer getPassengers() { return passengers; }
    public void setPassengers(Integer passengers) { this.passengers = passengers; }

    public String getSortBy() { return sortBy; }
    public void setSortBy(String sortBy) { this.sortBy = sortBy; }

    public String getSortOrder() { return sortOrder; }
    public void setSortOrder(String sortOrder) { this.sortOrder = sortOrder; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BusSearchRequestDto that = (BusSearchRequestDto) o;
        return Objects.equals(source, that.source) && 
               Objects.equals(destination, that.destination) && 
               Objects.equals(travelDate, that.travelDate) && 
               Objects.equals(passengers, that.passengers);
    }

    @Override
    public int hashCode() {
        return Objects.hash(source, destination, travelDate, passengers);
    }

    @Override
    public String toString() {
        return "BusSearchRequestDto{" +
                "source='" + source + '\'' +
                ", destination='" + destination + '\'' +
                ", travelDate=" + travelDate +
                ", passengers=" + passengers +
                ", sortBy='" + sortBy + '\'' +
                ", sortOrder='" + sortOrder + '\'' +
                '}';
    }
}
