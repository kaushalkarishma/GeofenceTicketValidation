package com.geofence.geofence_ticket_validation.dto;

import lombok.Data;

@Data
public class ValidateRequest {

    private String bookingId;
    private String eventId;
    private double latitude;
    private double longitude;
}