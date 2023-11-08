package com.graveyard.service.impl;

import com.graveyard.model_class.dto.*;
import com.graveyard.repository.GraveRepository;
import com.graveyard.service.GraveService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GraveServiceImpl implements GraveService {

    private final GraveRepository graveRepository;

    public GraveServiceImpl(GraveRepository graveRepository) {
        this.graveRepository = graveRepository;
    }

    @Override
    public DataTable<DeathListDto> getBySearch(DeathSearchDto object) {
        return null;
    }

    @Override
    public GraveDetail getGraveDetail(String gId, String id) {
        return graveRepository.getDetail(gId, id);
    }

    @Override
    public List<GraveAvailabilityDto> getGraveStatus() {
        return graveRepository.getGraveStatus();
    }


}
