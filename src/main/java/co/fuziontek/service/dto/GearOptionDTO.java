package co.fuziontek.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the GearOption entity.
 */
public class GearOptionDTO implements Serializable {

    private Long id;

    private String name;

    private String description;

    private Long geardecisionId;

    private String geardecisionName;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getGeardecisionId() {
        return geardecisionId;
    }

    public void setGeardecisionId(Long gearDecisionId) {
        this.geardecisionId = gearDecisionId;
    }


    public String getGeardecisionName() {
        return geardecisionName;
    }

    public void setGeardecisionName(String geardecisionName) {
        this.geardecisionName = geardecisionName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GearOptionDTO gearOptionDTO = (GearOptionDTO) o;
        if (gearOptionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearOptionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearOptionDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", geardecision=" + getGeardecisionId() +
            "}";
    }
}
