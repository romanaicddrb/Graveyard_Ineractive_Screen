package com.graveyard.model_class.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor

@NamedStoredProcedureQueries({
        @NamedStoredProcedureQuery(
                name = "proc.GetWeeklyReportByDate",procedureName = "get_weeklyreport_bydate",resultClasses = Weekly_Report_ViewModel.class,
                parameters = {
                        @StoredProcedureParameter(mode = ParameterMode.REF_CURSOR,type = void.class),
                        @StoredProcedureParameter(mode = ParameterMode.IN,type = Integer.class),
                        @StoredProcedureParameter(mode = ParameterMode.IN,type = LocalDate.class),
                        @StoredProcedureParameter(mode = ParameterMode.IN,type = LocalDate.class)
                }
        ),
        @NamedStoredProcedureQuery(
                name = "proc.GetDecpersonDetail",procedureName = "get_decperson_detail",resultClasses = Weekly_Report_ViewModel.class,
                parameters = {
                        @StoredProcedureParameter(mode = ParameterMode.REF_CURSOR,type = void.class),
                        @StoredProcedureParameter(mode = ParameterMode.IN,type = UUID.class)
                }
        )
})
public class Weekly_Report_ViewModel {
    @Id
    public UUID decid;
    public String address;
    public String decname;
    public String father;
    public String mother;
    public String huswife;
    public String nid;
    public String nid_copy;
    public String brid;
    public String brid_copy;
    public String sex;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    public LocalDate dob;
    public Long age;
    public String deathcertificate;
    public String deathcertificate_copy;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    public LocalDate dod;
    public Long deathplace;
    public String otherplacename;
    public String district;
    public String upazila;
    public String dec_type;
    public String unions;
    public String village;

    public String entryuser;
    public LocalDateTime endt;
    public String upload;
    public LocalDateTime uploaddt;
    public LocalDateTime modifydate;
    public Long causeofdeathid;
    public Long age_unit ;
    public Boolean dob_dk ;
    public String nationality ;
    public String informer_name ;
    public String informer_address ;
    public String remarks ;
    public String religion ;
    public Long occupationid;

    public Boolean issubmited ;
    public Boolean iscompleted ;
    public Long graveyardid;
    public String informer_relation;
    public String causeofdeath_description;
    public String occupationname;
    public String zillaname;
    public String upazilaname;
    public String unionnameeng;
    public String villagenameeng;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    public LocalDate burdate;

    @Transient
    public Integer age_year;
    @Transient
    public Integer age_month;
    @Transient
    public Integer age_day;
}

