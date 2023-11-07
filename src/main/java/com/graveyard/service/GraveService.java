package com.graveyard.service;

import com.graveyard.model_class.dto.DataTable;
import com.graveyard.model_class.dto.DeathListDto;
import com.graveyard.model_class.dto.DeathSearchDto;
import com.graveyard.model_class.dto.GraveDetail;

public interface GraveService {

    DataTable<DeathListDto> getBySearch(DeathSearchDto object);
    GraveDetail getGraveDetail(String gId, String id);
}
