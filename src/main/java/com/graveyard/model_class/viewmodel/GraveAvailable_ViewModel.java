package com.graveyard.model_class.viewmodel;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Entity
@NoArgsConstructor
@AllArgsConstructor

@NamedStoredProcedureQueries({
        @NamedStoredProcedureQuery(
                name = "proc.GetGraveAvailable",procedureName = "get_grave_avalability",resultClasses = GraveAvailable_ViewModel.class,
                parameters = {
                        @StoredProcedureParameter(mode = ParameterMode.IN,type = Integer.class)
                }
        )

})

public class GraveAvailable_ViewModel {
    @Id
    private String gserial;
    private Long burserial;
    private String decname;
    private String father;
    private LocalDateTime burdate;
    private Double datePart;
    private Double  remaing_days_for_availability;
    private String available;

}
