package com.geofence.geofence_ticket_validation.service;

import com.geofence.geofence_ticket_validation.entity.Event;
import com.geofence.geofence_ticket_validation.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public Event createEvent(Event event) {

        return eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event updateEvent(String id, Event updatedEvent) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        event.setName(updatedEvent.getName());
        event.setDate(updatedEvent.getDate());
        event.setStartTime(
                updatedEvent.getStartTime()
        );

        event.setEndTime(
                updatedEvent.getEndTime()
        );
        event.setArea(updatedEvent.getArea());
        event.setRadius(updatedEvent.getRadius());
        event.setPrice(updatedEvent.getPrice());
        event.setLocation(updatedEvent.getLocation());

        return eventRepository.save(event);
    }

    public void deleteEvent(String id) {
        eventRepository.deleteById(id);
    }
}