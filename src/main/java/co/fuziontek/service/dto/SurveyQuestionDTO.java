package co.fuziontek.service.dto;

import java.io.Serializable;
import java.util.Objects;

public class SurveyQuestionDTO implements Serializable {

    private Long id;

    private String text;

    private String description;

    private Long question_type_id;

    private Integer correct_answer;

    private String response;

    private SurveyAnswerDTO[] answers;

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

    public SurveyAnswerDTO[] getAnswers() {
        return answers;
    }

    public void setAnswers(SurveyAnswerDTO[] answers) {
        this.answers = answers;
    }

    public Long getQuestion_type_id() {
        return question_type_id;
    }

    public void setQuestion_type_id(Long question_type_id) {
        this.question_type_id = question_type_id;
    }

    public Integer getCorrect_answer() {
        return correct_answer;
    }

    public void setCorrect_answer(Integer correct_answer) {
        this.correct_answer = correct_answer;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {

            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GearDomainDTO gearDomainDTO = (GearDomainDTO) o;
        if (gearDomainDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearDomainDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }
}
