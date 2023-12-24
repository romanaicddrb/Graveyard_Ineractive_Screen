package com.graveyard.model_class.entity;

import javax.persistence.*;
import javax.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DecPerson {
    @Id
    @Column(columnDefinition ="uuid")
    private UUID decid;

    private String decname;

    private String father;

    private String mother;
    private String huswife;
    private String nid;
    private String nid_copy;
    private String brid;
    private String brid_copy;

    private String sex;
    @PastOrPresent
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dob;
    private Long age;
    private String deathcertificate;
    private String deathcertificate_copy;
    @PastOrPresent
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dod;

    private Long deathplace;
    private String otherplacename;
    private String district;
    private String upazila;
    private String unions;
    private String village;
    private String address;
    private String entryuser;
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    @Column(columnDefinition ="timestamp")
    private LocalDateTime endt;
    private String upload;
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    @Column(columnDefinition ="timestamp")
    private LocalDateTime uploaddt;
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    @Column(columnDefinition ="timestamp")
    private LocalDateTime modifydate= LocalDateTime.now();

    private Long causeofdeathid;
    private Long age_unit ;
    private Boolean dob_dk ;
    private String nationality ;
    private String informer_name ;
    private String informer_address ;
    private String remarks ;
    private String religion ;
    private Long occupationid;
    private Boolean issubmited=false;
    private Boolean iscompleted=false;
    private Long graveyardid;
    private String informer_relation;
    private Long dec_type;
    private String decname_bang;
    private String causeofdeathother;

    private String occupationother;
    private String memo_no;

}
