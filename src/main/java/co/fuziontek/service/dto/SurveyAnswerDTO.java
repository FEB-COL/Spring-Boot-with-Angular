package co.fuziontek.service.dto;

import java.io.Serializable;
import java.util.Objects;

public class SurveyAnswerDTO implements Serializable {

    private Long id;

    private String text;

    private Boolean is_correct;

    private Boolean is_selected;

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

    public Boolean getIs_correct() {
        return is_correct;
    }

    public void setIs_correct(Boolean is_correct) {
        this.is_correct = is_correct;
    }

    public Boolean getIs_selected() {
        return is_selected;
    }

    public void setIs_selected(Boolean is_selected) {
        this.is_selected = is_selected;
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
