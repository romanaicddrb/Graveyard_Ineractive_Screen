package com.graveyard.service;

import com.graveyard.model_class.dto.*;

import java.util.List;
import com.graveyard.model_class.dto.DataTableDto.DataTable;
import com.graveyard.model_class.dto.DataTableDto.DataTableRequestDto;
import com.graveyard.model_class.dto.DeathListDto;
import com.graveyard.model_class.dto.GraveDetail;

public interface GraveService {

    DataTable<DeathListDto> getBySearch(DataTableRequestDto object);
    GraveDetail getGraveDetail(String gId, String id);

    List<GraveAvailabilityDto> getGraveStatus();
}
