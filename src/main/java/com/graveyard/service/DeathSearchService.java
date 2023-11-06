package com.graveyard.service;

import com.graveyard.model_class.dto.DeathSearchDto;
import com.graveyard.model_class.entity.DeathSearch_Viewmodel;

import java.util.List;

public interface DeathSearchService {

    List<DeathSearch_Viewmodel> getDeathBySearchText(DeathSearchDto searchDto);
    List<DeathSearch_Viewmodel> getDeathBySearchTextAll(DeathSearchDto searchDto);
}
