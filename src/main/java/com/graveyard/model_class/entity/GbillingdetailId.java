package com.graveyard.model_class.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Embeddable
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GbillingdetailId implements Serializable {
    private static final long serialVersionUID = 2108245831816075359L;
    @Column(name = "billingid", nullable = false)
    private UUID billingid;
    @Column(name = "itemcode", nullable = false)
    private Long itemcode;

    public GbillingdetailId(UUID billingid) {
        this.billingid = billingid;
    }
    public GbillingdetailId(Long itemcode) {
        this.itemcode = itemcode;
    }

    @Override
    public int hashCode() {
        return Objects.hash(billingid, itemcode);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        GbillingdetailId entity = (GbillingdetailId) o;
        return Objects.equals(this.billingid, entity.billingid) &&
                Objects.equals(this.itemcode, entity.itemcode);
    }
}