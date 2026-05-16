package com.geofence.geofence_ticket_validation.service;

import com.geofence.geofence_ticket_validation.dto.BookingResponse;
import com.geofence.geofence_ticket_validation.entity.Booking;
import com.geofence.geofence_ticket_validation.entity.Event;
import com.geofence.geofence_ticket_validation.repository.BookingRepository;
import com.geofence.geofence_ticket_validation.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private EventRepository eventRepository;

    public Booking book(String userId, String eventId) {

        Booking booking = new Booking();
        booking.setUserId(userId);
        booking.setEventId(eventId);
        booking.setBookedAt(new Date());
        booking.setStatus("booked");

        return bookingRepository.save(booking);
    }

    public List<BookingResponse> getUserBookings(
            String userId
    ) {

        List<Booking> bookings =
                bookingRepository.findByUserId(userId);

        return bookings.stream().map(b -> {

            Event event =
                    eventRepository.findById(
                            b.getEventId()
                    ).orElse(null);

            BookingResponse response =
                    new BookingResponse();

            response.setId(b.getId());

            response.setStatus(
                    b.getStatus()
            );

            response.setEvent(event);

            return response;

        }).toList();
    }

    public void cancelBooking(String bookingId) {
        bookingRepository.deleteById(bookingId);
    }

    public Booking validateBooking(String bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getStatus().equals("booked")) {
            throw new RuntimeException("Invalid booking status");
        }

        booking.setStatus("validated");

        return bookingRepository.save(booking);
    }
}