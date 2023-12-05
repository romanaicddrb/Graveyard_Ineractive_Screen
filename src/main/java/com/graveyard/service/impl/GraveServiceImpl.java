package com.graveyard.service.impl;

import com.graveyard.model_class.dto.*;
import com.graveyard.model_class.dto.DataTableDto.DataTable;
import com.graveyard.model_class.dto.DataTableDto.DataTableRequestDto;
import com.graveyard.model_class.dto.DeathListDto;
import com.graveyard.model_class.dto.GraveDetail;
import com.graveyard.repository.GraveRepository;
import com.graveyard.service.GraveService;
import org.springframework.stereotype.Service;

import java.util.List;

import java.util.ArrayList;

@Service
public class GraveServiceImpl implements GraveService {

    private final GraveRepository graveRepository;

    public GraveServiceImpl(GraveRepository graveRepository) {
        this.graveRepository = graveRepository;
    }


    @Override
    public DataTable<DeathListDto> getBySearch(DataTableRequestDto object) {
        try {
            Integer count = graveRepository.graveListCountWithFilter(
                    object.getGraveyardId(),
                    object.getMemo(),
                    object.getName(),
                    object.getDod_day(),
                    object.getDod_month(),
                    object.getDod_year(),
                    object.getBur_day(),
                    object.getBur_month(),
                    object.getBur_year());

            ArrayList<DeathListDto> entityArray = graveRepository.graveSearch(
                    object.getGraveyardId(),
                    object.getMemo(),
                    object.getName(),
                    object.getDod_day(),
                    object.getDod_month(),
                    object.getDod_year(),
                    object.getBur_day(),
                    object.getBur_month(),
                    object.getBur_year());

            DataTable<DeathListDto> dataTable = new DataTable<>();

            dataTable.setData(entityArray);
            dataTable.setRecordsTotal(count);
            dataTable.setRecordsFiltered(count);

            dataTable.setDraw(object.getDraw());
            dataTable.setStart(object.getStart());

            return dataTable;
        }catch (Exception ex){
            ex.printStackTrace();
            return null;
        }
    }

    @Override
    public GraveDetail getGraveDetail(String gId, String id) {
        try {
            return graveRepository.getDetail(gId, id);
        }catch (Exception ex){
            ex.printStackTrace();
            return null;
        }
    }

    @Override
    public List<GraveMapDetail> getGraveMapDetail(int gId) {
        return graveRepository.getGraveMapDetail(gId);
    }


}
