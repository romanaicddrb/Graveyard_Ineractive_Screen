package com.graveyard.model_class.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DeathSearchDto {
    String graveyardId;
    String search_text;
    String search_text_F;
    String search_text_M;
    String search_text_NID;
    String search_text_dod;
    String search_text_dobur;
}
