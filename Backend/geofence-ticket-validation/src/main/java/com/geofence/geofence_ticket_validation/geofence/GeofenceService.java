package com.geofence.geofence_ticket_validation.geofence;

import com.geofence.geofence_ticket_validation.entity.Event;
import com.geofence.geofence_ticket_validation.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GeofenceService {

    @Autowired
    private EventRepository eventRepository;

    public boolean isInsideGeofence(String eventId, double lat, double lon) {

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        double eventLon = event.getLocation().getCoordinates().get(0);
        double eventLat = event.getLocation().getCoordinates().get(1);
        double radius = event.getRadius();

        double distance = calculateDistance(eventLat, eventLon, lat, lon);

        return distance <= radius;
    }

    private double calculateDistance(double lat1, double lon1,
                                     double lat2, double lon2) {

        final int R = 6371;

        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1))
                * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2)
                * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }
}