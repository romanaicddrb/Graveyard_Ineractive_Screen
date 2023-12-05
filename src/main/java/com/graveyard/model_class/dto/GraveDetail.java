package com.graveyard.model_class.dto;

import java.time.LocalDate;

public interface GraveDetail {

     String getDec_id();
     String getGraveyard_id();
     String getMemo_no();
     String getGrave_id();
     String getGrave_no();
     String getGrave_lane();
     String getGrave_block();
     String getGrave_zone();
     LocalDate getDod();
     LocalDate getBur_date();
     String getDec_name();
     String getFather();
     String getMother();
     String getSpouse();
     String getAddress();
     String getNationality() ;
}
