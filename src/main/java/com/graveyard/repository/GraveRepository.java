package com.graveyard.repository;

import com.graveyard.model_class.dto.DataTable;
import com.graveyard.model_class.dto.GraveAvailabilityDto;
import com.graveyard.model_class.dto.GraveDetail;
import com.graveyard.model_class.entity.DecPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GraveRepository extends JpaRepository<DecPerson, Long> {

    @Query(value = "select * from get_grave_detail( :gid, :did)",
            nativeQuery = true)
    GraveDetail getDetail(@Param("gid") String gid, @Param("did") String did);

    @Query(value = "select '12134', '36', decname, father, '2023-01-01', '45', '2022-02-02', 'No' from dec_person",
            nativeQuery = true)
    List<GraveAvailabilityDto> getGraveStatus();

}
