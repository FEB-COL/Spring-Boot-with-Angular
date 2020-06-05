package co.fuziontek.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the GearSurveySolve entity.
 */
public class GearSurveySolveDTO implements Serializable {

    private Long id;

    private String text;

    private Long gearsurveyId;

    private String gearsurveyName;

    private Long gearsurveyquestionId;

    public String getGearsurveyquestionName() {
        return gearsurveyquestionName;
    }

    public void setGearsurveyquestionName(String gearsurveyquestionName) {
        this.gearsurveyquestionName = gearsurveyquestionName;
    }

    public String getGearsurveyanswerName() {
        return gearsurveyanswerName;
    }

    public void setGearsurveyanswerName(String gearsurveyanswerName) {
        this.gearsurveyanswerName = gearsurveyanswerName;
    }

    private String gearsurveyquestionName;

    private Long gearsurveyanswerId;

    private String gearsurveyanswerName;

    private Long gearUserId;

    private String gearUserName;

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

    public Long getGearsurveyId() {
        return gearsurveyId;
    }

    public void setGearsurveyId(Long gearSurveyId) {
        this.gearsurveyId = gearSurveyId;
    }

    public Long getGearsurveyquestionId() {
        return gearsurveyquestionId;
    }

    public void setGearsurveyquestionId(Long gearSurveyQuestionId) {
        this.gearsurveyquestionId = gearSurveyQuestionId;
    }

    public Long getGearsurveyanswerId() {
        return gearsurveyanswerId;
    }

    public void setGearsurveyanswerId(Long gearSurveyAnswerId) {
        this.gearsurveyanswerId = gearSurveyAnswerId;
    }

    public Long getGearUserId() {
        return gearUserId;
    }

    public void setGearUserId(Long gearUserId) {
        this.gearUserId = gearUserId;
    }

    public String getGearUserName() {
        return gearUserName;
    }

    public void setGearUserName(String gearUserName) {
        this.gearUserName = gearUserName;
    }

    public String getGearsurveyName() {
        return gearsurveyName;
    }

    public void setGearsurveyName(String gearsurveyName) {
        this.gearsurveyName = gearsurveyName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GearSurveySolveDTO gearSurveySolveDTO = (GearSurveySolveDTO) o;
        if (gearSurveySolveDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearSurveySolveDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearSurveySolveDTO{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            ", gearsurvey=" + getGearsurveyId() +
            ", gearsurvey=" + getGearsurveyName() +
            ", gearsurveyquestion=" + getGearsurveyquestionId() +
            ", gearsurveyquestion=" + getGearsurveyquestionName() +
            ", gearsurveyanswer=" + getGearsurveyanswerId() +
            ", gearsurveyanswer=" + getGearsurveyanswerName() +
            ", gearUser=" + getGearUserId() +
            ", gearUser='" + getGearUserName() + "'" +
            "}";
    }
}
