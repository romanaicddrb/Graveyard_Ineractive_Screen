package com.graveyard.model_class.dto;

import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

public class GraveAvailabilityDto {
    private String gserial;
    private Long burserial;
    private String decname;
    private String father;
    private LocalDateTime burdate;
    private Double datePart;
    private Double remainingDaysForAvailability;
    private String available;
}
