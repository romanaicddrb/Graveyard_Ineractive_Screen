package com.graveyard.model_class.dto.DataTableDto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DataTableSearchDto {
    String value = null;
    boolean regex = false;
}
