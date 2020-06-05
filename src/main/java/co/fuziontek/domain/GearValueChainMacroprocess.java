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
 * A GearValueChainMacroprocess.
 */
@Entity
@Table(name = "gear_value_chain_macroprocess")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearValueChainMacroprocess implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "decription")
    private String decription;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @Column(name = "last_update")
    private LocalDate lastUpdate;

    @Column(name = "draft")
    private Boolean draft;

    @Column(name = "jhi_order")
    private Integer order;

    @OneToMany(mappedBy = "gearvaluechainmacroprocess")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearValueChainProcess> gearvaluechainprocesses = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("gearvaluechainmacroprocesses")
    private GearValueChainCategory gearvaluechaincategory;

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

    public GearValueChainMacroprocess name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDecription() {
        return decription;
    }

    public GearValueChainMacroprocess decription(String decription) {
        this.decription = decription;
        return this;
    }

    public void setDecription(String decription) {
        this.decription = decription;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public GearValueChainMacroprocess creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getLastUpdate() {
        return lastUpdate;
    }

    public GearValueChainMacroprocess lastUpdate(LocalDate lastUpdate) {
        this.lastUpdate = lastUpdate;
        return this;
    }

    public void setLastUpdate(LocalDate lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public Boolean isDraft() {
        return draft;
    }

    public GearValueChainMacroprocess draft(Boolean draft) {
        this.draft = draft;
        return this;
    }

    public void setDraft(Boolean draft) {
        this.draft = draft;
    }

    public Integer getOrder() {
        return order;
    }

    public GearValueChainMacroprocess order(Integer order) {
        this.order = order;
        return this;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    public Set<GearValueChainProcess> getGearvaluechainprocesses() {
        return gearvaluechainprocesses;
    }

    public GearValueChainMacroprocess gearvaluechainprocesses(Set<GearValueChainProcess> gearValueChainProcesses) {
        this.gearvaluechainprocesses = gearValueChainProcesses;
        return this;
    }

    public GearValueChainMacroprocess addGearvaluechainprocess(GearValueChainProcess gearValueChainProcess) {
        this.gearvaluechainprocesses.add(gearValueChainProcess);
        gearValueChainProcess.setGearvaluechainmacroprocess(this);
        return this;
    }

    public GearValueChainMacroprocess removeGearvaluechainprocess(GearValueChainProcess gearValueChainProcess) {
        this.gearvaluechainprocesses.remove(gearValueChainProcess);
        gearValueChainProcess.setGearvaluechainmacroprocess(null);
        return this;
    }

    public void setGearvaluechainprocesses(Set<GearValueChainProcess> gearValueChainProcesses) {
        this.gearvaluechainprocesses = gearValueChainProcesses;
    }

    public GearValueChainCategory getGearvaluechaincategory() {
        return gearvaluechaincategory;
    }

    public GearValueChainMacroprocess gearvaluechaincategory(GearValueChainCategory gearValueChainCategory) {
        this.gearvaluechaincategory = gearValueChainCategory;
        return this;
    }

    public void setGearvaluechaincategory(GearValueChainCategory gearValueChainCategory) {
        this.gearvaluechaincategory = gearValueChainCategory;
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
        GearValueChainMacroprocess gearValueChainMacroprocess = (GearValueChainMacroprocess) o;
        if (gearValueChainMacroprocess.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearValueChainMacroprocess.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearValueChainMacroprocess{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", decription='" + getDecription() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", lastUpdate='" + getLastUpdate() + "'" +
            ", draft='" + isDraft() + "'" +
            ", order=" + getOrder() +
            "}";
    }
}
