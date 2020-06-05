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
 * A GearDiagnosis.
 */
@Entity
@Table(name = "gear_diagnosis")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearDiagnosis implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String  name;

    @Column(name = "description")
    private String description;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @Column(name = "level_maturity")
    private Double levelMaturity;

    @OneToMany(mappedBy = "gearDiagnosis")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearDiagQuestion> gearDiagQuestions = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("gearDiagnoses")
    private GearDiagnosisType gearDiagnosisType;

    @ManyToOne
    @JsonIgnoreProperties("gearDiagnoses")
    private GearDomain gearDomain;

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

    public GearDiagnosis name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public GearDiagnosis description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public GearDiagnosis creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public Double getLevelMaturity() {
        return levelMaturity;
    }

    public GearDiagnosis levelMaturity(Double levelMaturity) {
        this.levelMaturity = levelMaturity;
        return this;
    }

    public void setLevelMaturity(Double levelMaturity) {
        this.levelMaturity = levelMaturity;
    }

    public Set<GearDiagQuestion> getGearDiagQuestions() {
        return gearDiagQuestions;
    }

    public GearDiagnosis gearDiagQuestions(Set<GearDiagQuestion> gearDiagQuestions) {
        this.gearDiagQuestions = gearDiagQuestions;
        return this;
    }

    public GearDiagnosis addGearDiagQuestion(GearDiagQuestion gearDiagQuestion) {
        this.gearDiagQuestions.add(gearDiagQuestion);
        gearDiagQuestion.setGearDiagnosis(this);
        return this;
    }

    public GearDiagnosis removeGearDiagQuestion(GearDiagQuestion gearDiagQuestion) {
        this.gearDiagQuestions.remove(gearDiagQuestion);
        gearDiagQuestion.setGearDiagnosis(null);
        return this;
    }

    public void setGearDiagQuestions(Set<GearDiagQuestion> gearDiagQuestions) {
        this.gearDiagQuestions = gearDiagQuestions;
    }

    public GearDiagnosisType getGearDiagnosisType() {
        return gearDiagnosisType;
    }

    public GearDiagnosis gearDiagnosisType(GearDiagnosisType gearDiagnosisType) {
        this.gearDiagnosisType = gearDiagnosisType;
        return this;
    }

    public void setGearDiagnosisType(GearDiagnosisType gearDiagnosisType) {
        this.gearDiagnosisType = gearDiagnosisType;
    }

    public GearDomain getGearDomain() {
        return gearDomain;
    }

    public GearDiagnosis gearDomain(GearDomain gearDomain) {
        this.gearDomain = gearDomain;
        return this;
    }

    public void setGearDomain(GearDomain gearDomain) {
        this.gearDomain = gearDomain;
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
        GearDiagnosis gearDiagnosis = (GearDiagnosis) o;
        if (gearDiagnosis.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearDiagnosis.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearDiagnosis{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", levelMaturity=" + getLevelMaturity() +
            "}";
    }
}
