package co.fuziontek.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the GearSurveyQuestion entity.
 */
public class GearSurveyQuestionDTO implements Serializable {

    private Long id;

    private String text;

    private String description;

    private Integer correctAnswer;

    private Long gearsurveyId;

    private Long gearsurveyquestiontypeId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(Integer correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public Long getGearsurveyId() {
        return gearsurveyId;
    }

    public void setGearsurveyId(Long gearSurveyId) {
        this.gearsurveyId = gearSurveyId;
    }

    public Long getGearsurveyquestiontypeId() {
        return gearsurveyquestiontypeId;
    }

    public void setGearsurveyquestiontypeId(Long gearSurveyQuestionTypeId) {
        this.gearsurveyquestiontypeId = gearSurveyQuestionTypeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GearSurveyQuestionDTO gearSurveyQuestionDTO = (GearSurveyQuestionDTO) o;
        if (gearSurveyQuestionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearSurveyQuestionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearSurveyQuestionDTO{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            ", description='" + getDescription() + "'" +
            ", correctAnswer=" + getCorrectAnswer() +
            ", gearsurvey=" + getGearsurveyId() +
            ", gearsurveyquestiontype=" + getGearsurveyquestiontypeId() +
            "}";
    }
}
