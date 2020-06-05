package co.fuziontek.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A GearDiagQuestion.
 */
@Entity
@Table(name = "gear_diag_question")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearDiagQuestion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size (max = 2000 )
    @Column(name = "name", length = 2000)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @OneToMany(mappedBy = "gearDiagquestion")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearDiagAnswer> gearDiagAnswers = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("gearDiagQuestions")
    private GearDiagnosis gearDiagnosis;

    @ManyToOne
    @JsonIgnoreProperties("gearDiagQuestions")
    private GearAmbit gearAmbit;

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

    public GearDiagQuestion name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public GearDiagQuestion description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public GearDiagQuestion creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public Set<GearDiagAnswer> getGearDiagAnswers() {
        return gearDiagAnswers;
    }

    public GearDiagQuestion gearDiagAnswers(Set<GearDiagAnswer> gearDiagAnswers) {
        this.gearDiagAnswers = gearDiagAnswers;
        return this;
    }

    public GearDiagQuestion addGearDiagAnswer(GearDiagAnswer gearDiagAnswer) {
        this.gearDiagAnswers.add(gearDiagAnswer);
        gearDiagAnswer.setGearDiagquestion(this);
        return this;
    }

    public GearDiagQuestion removeGearDiagAnswer(GearDiagAnswer gearDiagAnswer) {
        this.gearDiagAnswers.remove(gearDiagAnswer);
        gearDiagAnswer.setGearDiagquestion(null);
        return this;
    }

    public void setGearDiagAnswers(Set<GearDiagAnswer> gearDiagAnswers) {
        this.gearDiagAnswers = gearDiagAnswers;
    }

    public GearDiagnosis getGearDiagnosis() {
        return gearDiagnosis;
    }

    public GearDiagQuestion gearDiagnosis(GearDiagnosis gearDiagnosis) {
        this.gearDiagnosis = gearDiagnosis;
        return this;
    }

    public void setGearDiagnosis(GearDiagnosis gearDiagnosis) {
        this.gearDiagnosis = gearDiagnosis;
    }

    public GearAmbit getGearAmbit() {
        return gearAmbit;
    }

    public GearDiagQuestion gearAmbit(GearAmbit gearAmbit) {
        this.gearAmbit = gearAmbit;
        return this;
    }

    public void setGearAmbit(GearAmbit gearAmbit) {
        this.gearAmbit = gearAmbit;
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
        GearDiagQuestion gearDiagQuestion = (GearDiagQuestion) o;
        if (gearDiagQuestion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearDiagQuestion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearDiagQuestion{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            "}";
    }
}
