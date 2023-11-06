package com.graveyard.service.impl;

import com.graveyard.model_class.dto.DeathSearchDto;
import com.graveyard.model_class.entity.DeathSearch_Viewmodel;
import com.graveyard.service.DeathSearchService;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class DeathSearchServiceImpl implements DeathSearchService {

    @PersistenceContext
    EntityManager entityManager;

    @Transactional
    @Override
    public List<DeathSearch_Viewmodel> getDeathBySearchText(DeathSearchDto searchDto){
        try{
            StoredProcedureQuery query = entityManager.createNamedStoredProcedureQuery("proc.GetDeathSearch");
            query.setParameter(2,searchDto.getGraveyardid());
            query.setParameter(3,searchDto.getSearch_text());
            return query.getResultList();
        }catch (Exception ex){
            ex.printStackTrace();
            return null;
        }
    }


    @Transactional
    @Override
    public List<DeathSearch_Viewmodel> getDeathBySearchTextAll(DeathSearchDto searchDto){
        try {
            StoredProcedureQuery query = entityManager.createNamedStoredProcedureQuery("proc.GetDeathSearchAll");
            query.setParameter(2,searchDto.getGraveyardid());
            query.setParameter(3,searchDto.getSearch_text());
            query.setParameter(4,searchDto.getSearch_text_F());
            query.setParameter(5,searchDto.getSearch_text_M());
            query.setParameter(6,searchDto.getSearch_text_NID());
            query.setParameter(7,searchDto.getSearch_text_dod());
            query.setParameter(8,searchDto.getSearch_text_dobur());
            return query.getResultList();
        }catch (Exception ex){
            ex.printStackTrace();
            return null;
        }

    }
}
