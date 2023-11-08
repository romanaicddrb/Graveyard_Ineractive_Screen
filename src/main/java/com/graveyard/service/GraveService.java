package com.graveyard.service;

import com.graveyard.model_class.dto.*;

import java.util.List;

public interface GraveService {

    DataTable<DeathListDto> getBySearch(DeathSearchDto object);
    GraveDetail getGraveDetail(String gId, String id);

    List<GraveAvailabilityDto> getGraveStatus();
}
