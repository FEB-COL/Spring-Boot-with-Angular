package co.fuziontek.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.io.Serializable;
import java.util.Objects;

/**
 * A GearSurveyAnswer.
 */
@Entity
@Table(name = "gear_survey_answer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearSurveyAnswer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 300 )
    @Column(name = "text", length = 300)
    private String text;

    @Column(name = "is_correct")
    private Boolean isCorrect;

    @ManyToOne
    @JsonIgnoreProperties("gearsurveyanswers")
    private GearSurveyQuestion gearsurveyquestion;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public GearSurveyAnswer text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Boolean isIsCorrect() {
        return isCorrect;
    }

    public GearSurveyAnswer isCorrect(Boolean isCorrect) {
        this.isCorrect = isCorrect;
        return this;
    }

    public void setIsCorrect(Boolean isCorrect) {
        this.isCorrect = isCorrect;
    }

    public GearSurveyQuestion getGearsurveyquestion() {
        return gearsurveyquestion;
    }

    public GearSurveyAnswer gearsurveyquestion(GearSurveyQuestion gearSurveyQuestion) {
        this.gearsurveyquestion = gearSurveyQuestion;
        return this;
    }

    public void setGearsurveyquestion(GearSurveyQuestion gearSurveyQuestion) {
        this.gearsurveyquestion = gearSurveyQuestion;
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
        GearSurveyAnswer gearSurveyAnswer = (GearSurveyAnswer) o;
        if (gearSurveyAnswer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearSurveyAnswer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearSurveyAnswer{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            ", isCorrect='" + isIsCorrect() + "'" +
            "}";
    }
}
