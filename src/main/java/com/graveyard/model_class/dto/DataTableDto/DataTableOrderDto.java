package com.graveyard.model_class.dto.DataTableDto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DataTableOrderDto {
    int column = 0;
    String dir = "asc";
}
