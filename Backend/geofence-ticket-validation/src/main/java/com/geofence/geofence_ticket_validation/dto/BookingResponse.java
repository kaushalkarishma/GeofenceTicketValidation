package com.geofence.geofence_ticket_validation.dto;

import com.geofence.geofence_ticket_validation.entity.Event;
import lombok.Data;

@Data
public class BookingResponse {

    private String id;

    private String status;

    private Event event;
}