package com.geofence.geofence_ticket_validation.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Document(collection = "Event")
public class Event {

    @Id
    private String id;

    private String name;

    private String description;

    private Date date;

    private String startTime;

    private String endTime;

    private String area;

    private int seats;

    private double radius;

    private double price;

    // 🔥 LOCATION
    private Location location;

    @Data
    public static class Location {

        private String type = "Point";

        private List<Double> coordinates;
    }
}