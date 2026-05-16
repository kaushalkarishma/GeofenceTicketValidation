package com.geofence.geofence_ticket_validation.repository;

import com.geofence.geofence_ticket_validation.entity.Event;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EventRepository extends MongoRepository<Event, String> {
}