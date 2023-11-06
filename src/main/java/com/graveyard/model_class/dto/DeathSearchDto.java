package com.graveyard.model_class.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DeathSearchDto {
    Integer graveyardid;
    String search_text;
    String search_text_F;
    String search_text_M;
    String search_text_NID;
    String search_text_dod;
    String search_text_dobur;
}
