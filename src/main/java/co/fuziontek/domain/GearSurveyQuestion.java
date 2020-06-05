package co.fuziontek.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A GearSurveyQuestion.
 */
@Entity
@Table(name = "gear_survey_question")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearSurveyQuestion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 2000 )
    @Column(name = "text", length = 2000)
    private String text;

    @Column(name = "description")
    private String description;

    @Column(name = "correct_answer")
    private Integer correctAnswer;

    @OneToMany(mappedBy = "gearsurveyquestion")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearSurveyAnswer> gearsurveyanswers = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("gearsurveyquestions")
    private GearSurvey gearsurvey;

    @ManyToOne
    @JsonIgnoreProperties("gearsurveyquestions")
    private GearSurveyQuestionType gearsurveyquestiontype;

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

    public GearSurveyQuestion text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getDescription() {
        return description;
    }

    public GearSurveyQuestion description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getCorrectAnswer() {
        return correctAnswer;
    }

    public GearSurveyQuestion correctAnswer(Integer correctAnswer) {
        this.correctAnswer = correctAnswer;
        return this;
    }

    public void setCorrectAnswer(Integer correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public Set<GearSurveyAnswer> getGearsurveyanswers() {
        return gearsurveyanswers;
    }

    public GearSurveyQuestion gearsurveyanswers(Set<GearSurveyAnswer> gearSurveyAnswers) {
        this.gearsurveyanswers = gearSurveyAnswers;
        return this;
    }

    public GearSurveyQuestion addGearsurveyanswer(GearSurveyAnswer gearSurveyAnswer) {
        this.gearsurveyanswers.add(gearSurveyAnswer);
        gearSurveyAnswer.setGearsurveyquestion(this);
        return this;
    }

    public GearSurveyQuestion removeGearsurveyanswer(GearSurveyAnswer gearSurveyAnswer) {
        this.gearsurveyanswers.remove(gearSurveyAnswer);
        gearSurveyAnswer.setGearsurveyquestion(null);
        return this;
    }

    public void setGearsurveyanswers(Set<GearSurveyAnswer> gearSurveyAnswers) {
        this.gearsurveyanswers = gearSurveyAnswers;
    }

    public GearSurvey getGearsurvey() {
        return gearsurvey;
    }

    public GearSurveyQuestion gearsurvey(GearSurvey gearSurvey) {
        this.gearsurvey = gearSurvey;
        return this;
    }

    public void setGearsurvey(GearSurvey gearSurvey) {
        this.gearsurvey = gearSurvey;
    }

    public GearSurveyQuestionType getGearsurveyquestiontype() {
        return gearsurveyquestiontype;
    }

    public GearSurveyQuestion gearsurveyquestiontype(GearSurveyQuestionType gearSurveyQuestionType) {
        this.gearsurveyquestiontype = gearSurveyQuestionType;
        return this;
    }

    public void setGearsurveyquestiontype(GearSurveyQuestionType gearSurveyQuestionType) {
        this.gearsurveyquestiontype = gearSurveyQuestionType;
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
        GearSurveyQuestion gearSurveyQuestion = (GearSurveyQuestion) o;
        if (gearSurveyQuestion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearSurveyQuestion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearSurveyQuestion{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            ", description='" + getDescription() + "'" +
            ", correctAnswer=" + getCorrectAnswer() +
            "}";
    }
}
