package co.fuziontek.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the GearSurveyAnswer entity.
 */
public class GearSurveyAnswerDTO implements Serializable {

    private Long id;

    private String text;

    private Boolean isCorrect;

    private Long gearsurveyquestionId;

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

    public Boolean isIsCorrect() {
        return isCorrect;
    }

    public void setIsCorrect(Boolean isCorrect) {
        this.isCorrect = isCorrect;
    }

    public Long getGearsurveyquestionId() {
        return gearsurveyquestionId;
    }

    public void setGearsurveyquestionId(Long gearSurveyQuestionId) {
        this.gearsurveyquestionId = gearSurveyQuestionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GearSurveyAnswerDTO gearSurveyAnswerDTO = (GearSurveyAnswerDTO) o;
        if (gearSurveyAnswerDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearSurveyAnswerDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearSurveyAnswerDTO{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            ", isCorrect='" + isIsCorrect() + "'" +
            ", gearsurveyquestion=" + getGearsurveyquestionId() +
            "}";
    }
}
