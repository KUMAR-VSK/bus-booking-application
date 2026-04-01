package com.busbooking.repository;

import com.busbooking.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {

    List<Seat> findByBusBusId(Long busId);

    @Query("SELECT s FROM Seat s WHERE s.bus.busId = :busId AND s.isAvailable = true")
    List<Seat> findAvailableSeatsByBusId(@Param("busId") Long busId);

    @Query("SELECT s FROM Seat s WHERE s.seatId IN :seatIds AND s.isAvailable = true")
    List<Seat> findAvailableSeatsBySeatIds(@Param("seatIds") List<Long> seatIds);

    List<Seat> findByBusBusIdAndSeatNumberIn(Long busId, List<String> seatNumbers);
}