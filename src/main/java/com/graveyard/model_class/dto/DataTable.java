package com.graveyard.model_class.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class DataTable <T> {

    private int draw;
    private int start;
    private long recordsTotal;
    private long recordsFiltered;
    private List<T> data;
}