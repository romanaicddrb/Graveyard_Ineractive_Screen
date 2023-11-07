package com.graveyard.service.impl;

import com.graveyard.model_class.dto.GraveDetail;
import com.graveyard.repository.GraveRepository;
import com.graveyard.service.GraveService;
import org.springframework.stereotype.Service;

@Service
public class GraveServiceImpl implements GraveService {

    private final GraveRepository graveRepository;

    public GraveServiceImpl(GraveRepository graveRepository) {
        this.graveRepository = graveRepository;
    }

    @Override
    public GraveDetail getGraveDetail(String gId, String id) {
        return graveRepository.getDetail(gId, id);
    }
}
