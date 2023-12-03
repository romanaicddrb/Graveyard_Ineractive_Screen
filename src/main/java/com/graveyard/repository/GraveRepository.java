package com.graveyard.repository;

import com.graveyard.model_class.dto.DataTableDto.DataTable;
import com.graveyard.model_class.dto.GraveAvailabilityDto;
import com.graveyard.model_class.dto.DeathListDto;
import com.graveyard.model_class.dto.GraveDetail;
import com.graveyard.model_class.entity.DecPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import java.util.ArrayList;

public interface GraveRepository extends JpaRepository<DecPerson, Long> {

    @Query(value = "select count(*) from get_grave_search(" +
            " :gid, :memo, :d_name, :dod_d, :dod_m, :dod_y, :bur_d, :bur_m, :bur_y)",
            nativeQuery = true)
    Integer graveListCountWithFilter(@Param("gid") String gid,
                                     @Param("memo") String memo,
                                     @Param("d_name") String d_name,
                                     @Param("dod_d") String dod_d,
                                     @Param("dod_m") String dod_m,
                                     @Param("dod_y") String dod_y,
                                     @Param("bur_d") String bur_d,
                                     @Param("bur_m") String bur_m,
                                     @Param("bur_y") String bur_y);

    @Query(value = "select * from get_grave_search(" +
            " :gid, :memo, :d_name, :dod_d, :dod_m, :dod_y, :bur_d, :bur_m, :bur_y)",
            nativeQuery = true)
    ArrayList<DeathListDto> graveSearch(@Param("gid") String gid,
                                       @Param("memo") String memo,
                                       @Param("d_name") String d_name,
                                       @Param("dod_d") String dod_d,
                                       @Param("dod_m") String dod_m,
                                       @Param("dod_y") String dod_y,
                                       @Param("bur_d") String bur_d,
                                       @Param("bur_m") String bur_m,
                                       @Param("bur_y") String bur_y);

    @Query(value = "select * from get_grave_detail( :gid, :did)",
            nativeQuery = true)
    GraveDetail getDetail(@Param("gid") String gid, @Param("did") String did);

    @Query(value = "select * from get_grave_avalability( :gid)",
            nativeQuery = true)
    List<GraveAvailabilityDto> getGraveStatus(@Param("gid") Integer gid);

}
