package com.graveyard.model_class.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.Instant;
import java.util.UUID;

@Table(name = "graveyard")
@Entity
@Data
@NoArgsConstructor
public class Graveyard implements Serializable {
    @Id
    @Column(name = "graveyardid", nullable = false)
    private Long id;

    @Column(name = "graveyardname", length = 100)
    private String graveyardname;

    @Column(name = "btypeid", nullable = false)
    private Long btypeid;

    @Column(name = "location", length = 150)
    private String location;

    @Column(name = "graveyardtype")
    private Long graveyardtype;

    @Column(name = "division", length = 2)
    private String division;

    @Column(name = "district", length = 2)
    private String district;

    @Column(name = "citycorp", length = 2)
    private String citycorp;

    @Column(name = "upazila", length = 2)
    private String upazila;

    @Column(name = "unions", length = 2)
    private String unions;

    @Column(name = "mahallah", length = 4)
    private String mahallah;

    @Column(name = "graveyardarea", length = 10)
    private String graveyardarea;

    @Column(name = "userid", nullable = false)
    private UUID userid;

    @Column(name = "entryuser", length = 10)
    private String entryuser;

    @Column(name = "endt", nullable = false)
    private Instant endt;

    @Column(name = "upload", length = 1)
    private String upload;

    @Column(name = "uploaddt", nullable = false)
    private Instant uploaddt;

    @Column(name = "modifydate", nullable = false)
    private Instant modifydate;

    @Column(name = "instruction")
    private String instruction;

    @Column(name = "instruction_reserve")
    private String instruction_reserve;

}
