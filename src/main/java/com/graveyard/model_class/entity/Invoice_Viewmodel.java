package com.graveyard.model_class.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Invoice_Viewmodel {
    public UUID decid;
    public String address;
    public String decname;
    public String father;
    public String mother;
    public String sex;
    public String age;
    public String causeofdeath;
    public String burialdate;
    public String gravetype;
    public String graveserial;
    public String groad;
    public String glane;
    public String gaddress;

    public String invoicedate;
    public Long invoiceno;

    public String name_rcvr;
    public String address_rcvr;
    public String phone_rcvr;
    public String email_rcvr;

    public Long paymenttype;
    private String cardno;
    private String chequeno;
    private LocalDate chequedate;
    private String bankname;
    private String payorderno;


    public List<Gbillingdetail> gbillingdetailList;
    public Graveyard graveyard;
}
