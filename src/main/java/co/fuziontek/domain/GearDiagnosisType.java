package co.fuziontek.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A GearDiagnosisType.
 */
@Entity
@Table(name = "gear_diagnosis_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearDiagnosisType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "gearDiagnosisType")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearDiagnosis> gearDiagnoses = new HashSet<>();
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

    public GearDiagnosisType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public GearDiagnosisType description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<GearDiagnosis> getGearDiagnoses() {
        return gearDiagnoses;
    }

    public GearDiagnosisType gearDiagnoses(Set<GearDiagnosis> gearDiagnoses) {
        this.gearDiagnoses = gearDiagnoses;
        return this;
    }

    public GearDiagnosisType addGearDiagnosis(GearDiagnosis gearDiagnosis) {
        this.gearDiagnoses.add(gearDiagnosis);
        gearDiagnosis.setGearDiagnosisType(this);
        return this;
    }

    public GearDiagnosisType removeGearDiagnosis(GearDiagnosis gearDiagnosis) {
        this.gearDiagnoses.remove(gearDiagnosis);
        gearDiagnosis.setGearDiagnosisType(null);
        return this;
    }

    public void setGearDiagnoses(Set<GearDiagnosis> gearDiagnoses) {
        this.gearDiagnoses = gearDiagnoses;
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
        GearDiagnosisType gearDiagnosisType = (GearDiagnosisType) o;
        if (gearDiagnosisType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearDiagnosisType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearDiagnosisType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
