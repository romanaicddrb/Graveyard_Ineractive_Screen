package com.graveyard.model_class.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Table(name = "gbillingdetail")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Gbillingdetail {
    @EmbeddedId
    private GbillingdetailId gbillingdetailId;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "totalcost")
    private Long totalcost;

    @Column(name = "entryuser", length = 10)
    private String entryuser;

    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    @Column(name = "endt", nullable = false,columnDefinition ="timestamp")
    private LocalDateTime endt=LocalDateTime.now();

    @Column(name = "upload", length = 1)
    private String upload;

    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    @Column(name = "uploaddt", nullable = false,columnDefinition ="timestamp")
    private LocalDateTime uploaddt=LocalDateTime.now();;

    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    @Column(name = "modifydate", nullable = false,columnDefinition ="timestamp")
    private LocalDateTime modifydate=LocalDateTime.now();;

    public Gbillingdetail(GbillingdetailId gbillingdetailId, Long quantity, Long totalcost) {
        this.gbillingdetailId = gbillingdetailId;
        this.quantity = quantity;
        this.totalcost = totalcost;
    }

    @Transient
    public String itemname;
}
