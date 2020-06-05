package co.fuziontek.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the GearCriteria entity.
 */
public class GearCriteriaDTO implements Serializable {

    private Long id;

    private String name;

    private String description;

    private Long geardecisionId;

    public String getGeardecisionName() {
        return geardecisionName;
    }

    public void setGeardecisionName(String geardecisionName) {
        this.geardecisionName = geardecisionName;
    }

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GearCriteriaDTO gearCriteriaDTO = (GearCriteriaDTO) o;
        if (gearCriteriaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearCriteriaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearCriteriaDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", geardecision=" + getGeardecisionId() +
            "}";
    }
}
