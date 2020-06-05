package co.fuziontek.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the GearDiagAnswer entity.
 */
public class GearDiagAnswerDTO implements Serializable {

    private Long id;

    private Double answer;

    private LocalDate creationDate;

    private String comment;

    private Long gearDiagquestionId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAnswer() {
        return answer;
    }

    public void setAnswer(Double answer) {
        this.answer = answer;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Long getGearDiagquestionId() {
        return gearDiagquestionId;
    }

    public void setGearDiagquestionId(Long gearDiagQuestionId) {
        this.gearDiagquestionId = gearDiagQuestionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GearDiagAnswerDTO gearDiagAnswerDTO = (GearDiagAnswerDTO) o;
        if (gearDiagAnswerDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearDiagAnswerDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearDiagAnswerDTO{" +
            "id=" + getId() +
            ", answer=" + getAnswer() +
            ", creationDate='" + getCreationDate() + "'" +
            ", comment='" + getComment() + "'" +
            ", gearDiagquestion=" + getGearDiagquestionId() +
            "}";
    }
}
