package com.graveyard.service.impl;

import com.graveyard.model_class.entity.*;
import com.graveyard.service.GraveDetailService;
import jakarta.persistence.*;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class GraveDetailServiceImpl implements GraveDetailService {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public String getDetail(String id) {
        return null;
    }


}
