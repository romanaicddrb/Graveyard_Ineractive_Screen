package com.graveyard.service;

import com.graveyard.model_class.viewmodel.GraveAvailable_ViewModel;
import com.graveyard.model_class.viewmodel.GraveDetails_ViewModel;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.StoredProcedureQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class GraveAvailable {
    @Autowired
    public GraveAvailable() {

    }
    @PersistenceContext
    EntityManager entityManager;

    @Transactional
    public List<GraveAvailable_ViewModel> getGraveAvailable(Integer id){
        StoredProcedureQuery query=entityManager.createNamedStoredProcedureQuery("proc.GetGraveAvailable");
        query.setParameter(1,"2");
        query.execute();
        return  query.getResultList();
    }
}
