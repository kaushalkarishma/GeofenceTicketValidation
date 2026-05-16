package com.geofence.geofence_ticket_validation.service;

import com.geofence.geofence_ticket_validation.entity.User;
import com.geofence.geofence_ticket_validation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User signUp(User user) {

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            throw new RuntimeException("User already exists");
        }

        // 🔥 PASSWORD ENCODE
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // 🔥 IMPORTANT FIX (ROLE HANDLE)
        if (user.getRole() == null || user.getRole().isEmpty()) {

            user.setRole("USER");

        } else {

            user.setRole(user.getRole().toUpperCase());
        }

        return userRepository.save(user);
    }

    public User login(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return user;
    }
}