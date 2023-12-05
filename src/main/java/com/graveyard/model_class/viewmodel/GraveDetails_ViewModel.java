package com.graveyard.model_class.viewmodel;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;
import java.text.*;
import java.util.Calendar;


@Entity
@NoArgsConstructor
@AllArgsConstructor

@NamedStoredProcedureQueries({
        @NamedStoredProcedureQuery(
                name = "proc.GetDecpersonDetail",procedureName = "get_grave_detail",resultClasses = GraveDetails_ViewModel.class,
                parameters = {
//                        @StoredProcedureParameter(mode = ParameterMode.REF_CURSOR,type = void.class),
                        @StoredProcedureParameter(mode = ParameterMode.IN,type = String.class),
                        @StoredProcedureParameter(mode = ParameterMode.IN,type = String.class)
                }
        )

})

public class GraveDetails_ViewModel {

    @Id
    public String Dec_id;
    public String Graveyard_id;
    public String Memo_no;
    public String Grave_id;
    public String Grave_no;
    public String Grave_lane;
    public String Grave_block;
    public String Grave_zone;
    public String Dod;
    public String Bur_date;
    public String Dec_name;
    public String Father;
    public String Mother;
    public String Spouse;
    public String Address;
    public String Nationality ;
//
//
//
//    SimpleDateFormat DateFormat
//            = new SimpleDateFormat("dd/MM/yyyy");
//
//    // Initializing the calendar Object
//    Calendar c = Calendar.getInstance();
//
//    // Using format() method for conversion
//    String curr_date
//            = DateFormat.format(Bur_date);
}
