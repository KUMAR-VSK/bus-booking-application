package com.busbooking.repository;

import com.busbooking.entity.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface BusRepository extends JpaRepository<Bus, Long> {

    @Query("SELECT b FROM Bus b WHERE " +
           "(:source IS NULL OR b.source = :source) AND " +
           "(:destination IS NULL OR b.destination = :destination) AND " +
           "(:departureTime IS NULL OR b.departureTime >= :departureTime)")
    List<Bus> searchBuses(
        @Param("source") String source,
        @Param("destination") String destination,
        @Param("departureTime") LocalTime departureTime
    );

    boolean existsByBusName(String busName);

    Optional<Bus> findByBusName(String busName);
}