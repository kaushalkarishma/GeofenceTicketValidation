package com.geofence.geofence_ticket_validation.controller;

import com.geofence.geofence_ticket_validation.dto.BookingResponse;
import com.geofence.geofence_ticket_validation.dto.ValidateRequest;
import com.geofence.geofence_ticket_validation.entity.Booking;
import com.geofence.geofence_ticket_validation.geofence.GeofenceService;
import com.geofence.geofence_ticket_validation.service.BookingService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
@CrossOrigin
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private GeofenceService geofenceService;

    @PostMapping("/book")
    public Booking book(@RequestBody Booking booking, HttpServletRequest request) {

        String userId = (String) request.getAttribute("userId");

        return bookingService.book(userId, booking.getEventId());
    }

    @GetMapping("/user")
    public List<BookingResponse> getBookings(HttpServletRequest request) {

        String userId = (String) request.getAttribute("userId");

        return bookingService.getUserBookings(userId);
    }

    @DeleteMapping("/cancel/{id}")
    public String cancel(@PathVariable String id) {

        bookingService.cancelBooking(id);
        return "Booking cancelled";
    }

    @PutMapping("/validate")
    public Booking validate(@RequestBody ValidateRequest request) {

        boolean inside = geofenceService.isInsideGeofence(
                request.getEventId(),
                request.getLatitude(),
                request.getLongitude()
        );

        if (!inside) {
            throw new RuntimeException("Outside geofence");
        }

        return bookingService.validateBooking(request.getBookingId());
    }
}