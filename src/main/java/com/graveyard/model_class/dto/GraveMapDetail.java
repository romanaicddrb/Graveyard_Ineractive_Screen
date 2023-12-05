package com.graveyard.model_class.dto;

import java.time.LocalDate;

public interface GraveMapDetail {
    Long getId();
    Long getGid();
    String getBlock();
    String getLane();
    String getGrave_id();
    Double getX();
    Double getY();
    Long getBurserial();
    String getDecname();
    String getFather();
    LocalDate getBurdate();
    Double getBurial_duration();
    String getAvailable();
    Double getRemaing_days_for_availability();

}
