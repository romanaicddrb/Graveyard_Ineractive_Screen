package com.graveyard.model_class.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@NamedStoredProcedureQueries({
        @NamedStoredProcedureQuery(
                name = "proc.GetDeathSearch",procedureName = "get_death_search",resultClasses = DeathSearch_Viewmodel.class,
                parameters = {
                        @StoredProcedureParameter(mode = ParameterMode.REF_CURSOR,type = void.class),
                        @StoredProcedureParameter(mode = ParameterMode.IN,type = Integer.class),
                        @StoredProcedureParameter(mode = ParameterMode.IN,type = String.class)
                }
        ),
        @NamedStoredProcedureQuery(
                name = "proc.GetDeathSearchAll",procedureName = "get_death_search_all",resultClasses = DeathSearch_Viewmodel.class,
                parameters = {
                        @StoredProcedureParameter(mode = ParameterMode.REF_CURSOR,type = void.class),
                        @StoredProcedureParameter(mode = ParameterMode.IN,type = Integer.class),
                        @StoredProcedureParameter(mode = ParameterMode.IN,type = String.class),
                        @StoredProcedureParameter(mode = ParameterMode.IN,type = String.class),
                        @StoredProcedureParameter(mode = ParameterMode.IN,type = String.class),
                        @StoredProcedureParameter(mode = ParameterMode.IN,type = String.class),
                        @StoredProcedureParameter(mode = ParameterMode.IN,type = String.class),
                        @StoredProcedureParameter(mode = ParameterMode.IN,type = String.class),
                }
        )
})


public class DeathSearch_Viewmodel {
    @Id
    public UUID decid;
    public String decname;
    public String father;
    public String mother;
    public String nid_copy;
    public String brid_copy;
    public String deathcertificate;
    public Long age;
    public Long Sex;
    public Long age_unit;
    public LocalDate dod;
    public boolean iscompleted;
    public Long causeofdeathid;
    public LocalDate burdate;
    public String couseofdeath_bang;


}
