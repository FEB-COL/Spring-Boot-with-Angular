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
 * A GearValueChainProcess.
 */
@Entity
@Table(name = "gear_value_chain_process")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearValueChainProcess implements Serializable {

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

    @Column(name = "attach")
    private String attach;

    @Column(name = "draft")
    private Boolean draft;

    @Column(name = "inputs")
    private String inputs;

    @Column(name = "outputs")
    private String outputs;

    @OneToMany(mappedBy = "gearvaluechainprocess")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearProcessInfoSystem> gearprocessinfosystems = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("gearvaluechainprocesses")
    private GearValueChainMacroprocess gearvaluechainmacroprocess;

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

    public GearValueChainProcess name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDecription() {
        return decription;
    }

    public GearValueChainProcess decription(String decription) {
        this.decription = decription;
        return this;
    }

    public void setDecription(String decription) {
        this.decription = decription;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public GearValueChainProcess creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getLastUpdate() {
        return lastUpdate;
    }

    public GearValueChainProcess lastUpdate(LocalDate lastUpdate) {
        this.lastUpdate = lastUpdate;
        return this;
    }

    public void setLastUpdate(LocalDate lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public String getAttach() {
        return attach;
    }

    public GearValueChainProcess attach(String attach) {
        this.attach = attach;
        return this;
    }

    public void setAttach(String attach) {
        this.attach = attach;
    }

    public Boolean isDraft() {
        return draft;
    }

    public GearValueChainProcess draft(Boolean draft) {
        this.draft = draft;
        return this;
    }

    public void setDraft(Boolean draft) {
        this.draft = draft;
    }

    public String getInputs() {
        return inputs;
    }

    public GearValueChainProcess inputs(String inputs) {
        this.inputs = inputs;
        return this;
    }

    public void setInputs(String inputs) {
        this.inputs = inputs;
    }

    public String getOutputs() {
        return outputs;
    }

    public GearValueChainProcess outputs(String outputs) {
        this.outputs = outputs;
        return this;
    }

    public void setOutputs(String outputs) {
        this.outputs = outputs;
    }

    public Set<GearProcessInfoSystem> getGearprocessinfosystems() {
        return gearprocessinfosystems;
    }

    public GearValueChainProcess gearprocessinfosystems(Set<GearProcessInfoSystem> gearProcessInfoSystems) {
        this.gearprocessinfosystems = gearProcessInfoSystems;
        return this;
    }

    public GearValueChainProcess addGearprocessinfosystem(GearProcessInfoSystem gearProcessInfoSystem) {
        this.gearprocessinfosystems.add(gearProcessInfoSystem);
        gearProcessInfoSystem.setGearvaluechainprocess(this);
        return this;
    }

    public GearValueChainProcess removeGearprocessinfosystem(GearProcessInfoSystem gearProcessInfoSystem) {
        this.gearprocessinfosystems.remove(gearProcessInfoSystem);
        gearProcessInfoSystem.setGearvaluechainprocess(null);
        return this;
    }

    public void setGearprocessinfosystems(Set<GearProcessInfoSystem> gearProcessInfoSystems) {
        this.gearprocessinfosystems = gearProcessInfoSystems;
    }

    public GearValueChainMacroprocess getGearvaluechainmacroprocess() {
        return gearvaluechainmacroprocess;
    }

    public GearValueChainProcess gearvaluechainmacroprocess(GearValueChainMacroprocess gearValueChainMacroprocess) {
        this.gearvaluechainmacroprocess = gearValueChainMacroprocess;
        return this;
    }

    public void setGearvaluechainmacroprocess(GearValueChainMacroprocess gearValueChainMacroprocess) {
        this.gearvaluechainmacroprocess = gearValueChainMacroprocess;
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
        GearValueChainProcess gearValueChainProcess = (GearValueChainProcess) o;
        if (gearValueChainProcess.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearValueChainProcess.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearValueChainProcess{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", decription='" + getDecription() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", lastUpdate='" + getLastUpdate() + "'" +
            ", attach='" + getAttach() + "'" +
            ", draft='" + isDraft() + "'" +
            ", inputs='" + getInputs() + "'" +
            ", outputs='" + getOutputs() + "'" +
            "}";
    }
}
