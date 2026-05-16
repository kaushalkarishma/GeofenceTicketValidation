package com.geofence.geofence_ticket_validation.repository;

import com.geofence.geofence_ticket_validation.entity.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BookingRepository extends MongoRepository<Booking, String> {

    List<Booking> findByUserId(String userId);
}