package com.graveyard.model_class.dto.DataTableDto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Optional;

@Data
@NoArgsConstructor
public class DataTableRequestDto {
    int draw = 0;
    int start = 0;
    int length = 0;
    int statusId = 0;
    ArrayList<DataTableOrderDto> order;
    DataTableSearchDto search;

    String graveyardId = "";
    String memo = "";
    String name = "";
    String dod_day = "";
    String dod_month = "";
    String dod_year = "";
    String bur_day = "";
    String bur_month = "";
    String bur_year = "";
}
