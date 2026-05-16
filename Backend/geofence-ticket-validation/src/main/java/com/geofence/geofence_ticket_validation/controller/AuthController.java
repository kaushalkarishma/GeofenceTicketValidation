package com.geofence.geofence_ticket_validation.controller;

import com.geofence.geofence_ticket_validation.entity.User;
import com.geofence.geofence_ticket_validation.security.JwtUtil;
import com.geofence.geofence_ticket_validation.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public Map<String, Object> signup(@RequestBody User user) {

        User newUser = authService.signUp(user);

        String token = jwtUtil.generateToken(newUser.getId(), newUser.getRole());

        Map<String, Object> response = new HashMap<>();
        response.put("user", newUser);
        response.put("token", token);

        return response;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");

        User user = authService.login(email, password);

        String token = jwtUtil.generateToken(user.getId(), user.getRole());

        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("token", token);

        return response;
    }
}