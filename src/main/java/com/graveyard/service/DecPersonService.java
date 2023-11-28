package com.graveyard.service;

import com.graveyard.model_class.viewmodel.GraveDetails_ViewModel;
import com.graveyard.repository.GraveRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.StoredProcedureQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class DecPersonService {

    @Autowired
    public DecPersonService() {

    }
    @PersistenceContext
    EntityManager entityManager;

    @Transactional
    public List<GraveDetails_ViewModel> getDecPerson_Detail(UUID id){
        StoredProcedureQuery query=entityManager.createNamedStoredProcedureQuery("proc.GetDecpersonDetail");
        query.setParameter(1,"2");
        query.setParameter(2,id.toString());
        query.execute();
        return  query.getResultList();
    }
}
