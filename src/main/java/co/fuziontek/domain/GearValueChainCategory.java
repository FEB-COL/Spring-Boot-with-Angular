package co.fuziontek.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A GearValueChainCategory.
 */
@Entity
@Table(name = "gear_value_chain_category")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearValueChainCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "decription")
    private String decription;

    @Column(name = "color")
    private String color;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @Column(name = "last_update")
    private LocalDate lastUpdate;

    @OneToMany(mappedBy = "gearvaluechaincategory")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearValueChainMacroprocess> gearvaluechainmacroprocesses = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("gearValueChainCategories")
    private GearOrganizationalUnit gearOrganizationalUnit;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public GearValueChainCategory name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDecription() {
        return decription;
    }

    public GearValueChainCategory decription(String decription) {
        this.decription = decription;
        return this;
    }

    public void setDecription(String decription) {
        this.decription = decription;
    }

    public String getColor() {
        return color;
    }

    public GearValueChainCategory color(String color) {
        this.color = color;
        return this;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public GearValueChainCategory creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getLastUpdate() {
        return lastUpdate;
    }

    public GearValueChainCategory lastUpdate(LocalDate lastUpdate) {
        this.lastUpdate = lastUpdate;
        return this;
    }

    public void setLastUpdate(LocalDate lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public Set<GearValueChainMacroprocess> getGearvaluechainmacroprocesses() {
        return gearvaluechainmacroprocesses;
    }

    public GearValueChainCategory gearvaluechainmacroprocesses(Set<GearValueChainMacroprocess> gearValueChainMacroprocesses) {
        this.gearvaluechainmacroprocesses = gearValueChainMacroprocesses;
        return this;
    }

    public GearValueChainCategory addGearvaluechainmacroprocess(GearValueChainMacroprocess gearValueChainMacroprocess) {
        this.gearvaluechainmacroprocesses.add(gearValueChainMacroprocess);
        gearValueChainMacroprocess.setGearvaluechaincategory(this);
        return this;
    }

    public GearValueChainCategory removeGearvaluechainmacroprocess(GearValueChainMacroprocess gearValueChainMacroprocess) {
        this.gearvaluechainmacroprocesses.remove(gearValueChainMacroprocess);
        gearValueChainMacroprocess.setGearvaluechaincategory(null);
        return this;
    }

    public void setGearvaluechainmacroprocesses(Set<GearValueChainMacroprocess> gearValueChainMacroprocesses) {
        this.gearvaluechainmacroprocesses = gearValueChainMacroprocesses;
    }

    public GearOrganizationalUnit getGearOrganizationalUnit() {
        return gearOrganizationalUnit;
    }

    public GearValueChainCategory gearOrganizationalUnit(GearOrganizationalUnit gearOrganizationalUnit) {
        this.gearOrganizationalUnit = gearOrganizationalUnit;
        return this;
    }

    public void setGearOrganizationalUnit(GearOrganizationalUnit gearOrganizationalUnit) {
        this.gearOrganizationalUnit = gearOrganizationalUnit;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        GearValueChainCategory gearValueChainCategory = (GearValueChainCategory) o;
        if (gearValueChainCategory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearValueChainCategory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearValueChainCategory{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", decription='" + getDecription() + "'" +
            ", color='" + getColor() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", lastUpdate='" + getLastUpdate() + "'" +
            "}";
    }
}
