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
 * A GearSurveyQuestionType.
 */
@Entity
@Table(name = "gear_survey_question_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearSurveyQuestionType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "gearsurveyquestiontype")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearSurveyQuestion> gearsurveyquestions = new HashSet<>();
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

    public GearSurveyQuestionType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public GearSurveyQuestionType description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<GearSurveyQuestion> getGearsurveyquestions() {
        return gearsurveyquestions;
    }

    public GearSurveyQuestionType gearsurveyquestions(Set<GearSurveyQuestion> gearSurveyQuestions) {
        this.gearsurveyquestions = gearSurveyQuestions;
        return this;
    }

    public GearSurveyQuestionType addGearsurveyquestion(GearSurveyQuestion gearSurveyQuestion) {
        this.gearsurveyquestions.add(gearSurveyQuestion);
        gearSurveyQuestion.setGearsurveyquestiontype(this);
        return this;
    }

    public GearSurveyQuestionType removeGearsurveyquestion(GearSurveyQuestion gearSurveyQuestion) {
        this.gearsurveyquestions.remove(gearSurveyQuestion);
        gearSurveyQuestion.setGearsurveyquestiontype(null);
        return this;
    }

    public void setGearsurveyquestions(Set<GearSurveyQuestion> gearSurveyQuestions) {
        this.gearsurveyquestions = gearSurveyQuestions;
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
        GearSurveyQuestionType gearSurveyQuestionType = (GearSurveyQuestionType) o;
        if (gearSurveyQuestionType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearSurveyQuestionType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearSurveyQuestionType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
