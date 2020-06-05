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
 * A GearSurvey.
 */
@Entity
@Table(name = "gear_survey")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearSurvey implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "jhi_start")
    private LocalDate start;

    @Column(name = "jhi_end")
    private LocalDate end;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "gearsurvey")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearSurveyQuestion> gearsurveyquestions = new HashSet<>();
    @OneToMany(mappedBy = "gearsurvey")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearSurveySolve> gearsurveysolves = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("gearSurveys")
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

    public GearSurvey name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getStart() {
        return start;
    }

    public GearSurvey start(LocalDate start) {
        this.start = start;
        return this;
    }

    public void setStart(LocalDate start) {
        this.start = start;
    }

    public LocalDate getEnd() {
        return end;
    }

    public GearSurvey end(LocalDate end) {
        this.end = end;
        return this;
    }

    public void setEnd(LocalDate end) {
        this.end = end;
    }

    public String getDescription() {
        return description;
    }

    public GearSurvey description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<GearSurveyQuestion> getGearsurveyquestions() {
        return gearsurveyquestions;
    }

    public GearSurvey gearsurveyquestions(Set<GearSurveyQuestion> gearSurveyQuestions) {
        this.gearsurveyquestions = gearSurveyQuestions;
        return this;
    }

    public GearSurvey addGearsurveyquestion(GearSurveyQuestion gearSurveyQuestion) {
        this.gearsurveyquestions.add(gearSurveyQuestion);
        gearSurveyQuestion.setGearsurvey(this);
        return this;
    }

    public GearSurvey removeGearsurveyquestion(GearSurveyQuestion gearSurveyQuestion) {
        this.gearsurveyquestions.remove(gearSurveyQuestion);
        gearSurveyQuestion.setGearsurvey(null);
        return this;
    }

    public void setGearsurveyquestions(Set<GearSurveyQuestion> gearSurveyQuestions) {
        this.gearsurveyquestions = gearSurveyQuestions;
    }

    public Set<GearSurveySolve> getGearsurveysolves() {
        return gearsurveysolves;
    }

    public GearSurvey gearsurveysolves(Set<GearSurveySolve> gearSurveySolves) {
        this.gearsurveysolves = gearSurveySolves;
        return this;
    }

    public GearSurvey addGearsurveysolve(GearSurveySolve gearSurveySolve) {
        this.gearsurveysolves.add(gearSurveySolve);
        gearSurveySolve.setGearsurvey(this);
        return this;
    }

    public GearSurvey removeGearsurveysolve(GearSurveySolve gearSurveySolve) {
        this.gearsurveysolves.remove(gearSurveySolve);
        gearSurveySolve.setGearsurvey(null);
        return this;
    }

    public void setGearsurveysolves(Set<GearSurveySolve> gearSurveySolves) {
        this.gearsurveysolves = gearSurveySolves;
    }

    public GearOrganizationalUnit getGearOrganizationalUnit() {
        return gearOrganizationalUnit;
    }

    public GearSurvey gearOrganizationalUnit(GearOrganizationalUnit gearOrganizationalUnit) {
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
        GearSurvey gearSurvey = (GearSurvey) o;
        if (gearSurvey.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearSurvey.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearSurvey{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", start='" + getStart() + "'" +
            ", end='" + getEnd() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
