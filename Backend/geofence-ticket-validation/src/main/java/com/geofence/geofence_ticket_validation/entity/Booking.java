package com.geofence.geofence_ticket_validation.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "booking")
public class Booking {

    @Id
    private String id;

    private String userId;
    private String eventId;

    private Date bookedAt;

    private String status;
}