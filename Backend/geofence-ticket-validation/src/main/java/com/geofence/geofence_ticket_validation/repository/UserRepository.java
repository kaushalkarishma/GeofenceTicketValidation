package com.geofence.geofence_ticket_validation.repository;

import com.geofence.geofence_ticket_validation.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);
}