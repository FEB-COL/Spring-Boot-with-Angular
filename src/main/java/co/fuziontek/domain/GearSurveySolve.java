package co.fuziontek.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A GearSurveySolve.
 */
@Entity
@Table(name = "gear_survey_solve")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearSurveySolve implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "text")
    private String text;

    @ManyToOne
    @JsonIgnoreProperties("gearsurveysolves")
    private GearSurvey gearsurvey;

    @ManyToOne
    @JsonIgnoreProperties("gearsurveysolves")
    private GearSurveyQuestion gearsurveyquestion;

    @ManyToOne
    @JsonIgnoreProperties("gearsurveysolves")
    private GearSurveyAnswer gearsurveyanswer;

    @ManyToOne
    @JsonIgnoreProperties("gearSurveySolves")
    private GearUser gearUser;

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

    public GearSurveySolve text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public GearSurvey getGearsurvey() {
        return gearsurvey;
    }

    public GearSurveySolve gearsurvey(GearSurvey gearSurvey) {
        this.gearsurvey = gearSurvey;
        return this;
    }

    public void setGearsurvey(GearSurvey gearSurvey) {
        this.gearsurvey = gearSurvey;
    }

    public GearSurveyQuestion getGearsurveyquestion() {
        return gearsurveyquestion;
    }

    public GearSurveySolve gearsurveyquestion(GearSurveyQuestion gearSurveyQuestion) {
        this.gearsurveyquestion = gearSurveyQuestion;
        return this;
    }

    public void setGearsurveyquestion(GearSurveyQuestion gearSurveyQuestion) {
        this.gearsurveyquestion = gearSurveyQuestion;
    }

    public GearSurveyAnswer getGearsurveyanswer() {
        return gearsurveyanswer;
    }

    public GearSurveySolve gearsurveyanswer(GearSurveyAnswer gearSurveyAnswer) {
        this.gearsurveyanswer = gearSurveyAnswer;
        return this;
    }

    public void setGearsurveyanswer(GearSurveyAnswer gearSurveyAnswer) {
        this.gearsurveyanswer = gearSurveyAnswer;
    }

    public GearUser getGearUser() {
        return gearUser;
    }

    public GearSurveySolve gearUser(GearUser gearUser) {
        this.gearUser = gearUser;
        return this;
    }

    public void setGearUser(GearUser gearUser) {
        this.gearUser = gearUser;
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
        GearSurveySolve gearSurveySolve = (GearSurveySolve) o;
        if (gearSurveySolve.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearSurveySolve.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearSurveySolve{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            "}";
    }
}
