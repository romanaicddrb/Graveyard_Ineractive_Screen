package com.graveyard.repository;

import com.graveyard.model_class.dto.GraveDetail;
import com.graveyard.model_class.entity.DecPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GraveRepository extends JpaRepository<DecPerson, Long> {

    @Query(value = "select * from get_grave_detail( :gid, :did)",
            nativeQuery = true)
    GraveDetail getDetail(@Param("gid") String gid, @Param("did") String did);

}
