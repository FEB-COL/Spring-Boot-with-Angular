package co.fuziontek.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the GearGoalsStrategyAE entity.
 */
public class GearGoalsStrategyAEDTO implements Serializable {

    private Long id;

    private String name;

    private String drescription;

    private Long gearOrganizationalUnitId;

    private String gearOrganizationalUnitName;

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

    public String getDrescription() {
        return drescription;
    }

    public void setDrescription(String drescription) {
        this.drescription = drescription;
    }

    public Long getGearOrganizationalUnitId() {
        return gearOrganizationalUnitId;
    }

    public void setGearOrganizationalUnitId(Long gearOrganizationalUnitId) {
        this.gearOrganizationalUnitId = gearOrganizationalUnitId;
    }

    public String getGearOrganizationalUnitName() {
        return gearOrganizationalUnitName;
    }

    public void setGearOrganizationalUnitName(String gearOrganizationalUnitName) {
        this.gearOrganizationalUnitName = gearOrganizationalUnitName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GearGoalsStrategyAEDTO gearGoalsStrategyAEDTO = (GearGoalsStrategyAEDTO) o;
        if (gearGoalsStrategyAEDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearGoalsStrategyAEDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearGoalsStrategyAEDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", drescription='" + getDrescription() + "'" +
            ", gearOrganizationalUnit=" + getGearOrganizationalUnitId() +
            ", gearOrganizationalUnit='" + getGearOrganizationalUnitName() + "'" +
            "}";
    }
}
