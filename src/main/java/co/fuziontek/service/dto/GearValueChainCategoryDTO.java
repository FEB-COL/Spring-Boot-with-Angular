package co.fuziontek.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the GearValueChainCategory entity.
 */
public class GearValueChainCategoryDTO implements Serializable {

    private Long id;

    private String name;

    private String decription;

    private String color;

    private LocalDate creationDate;

    private LocalDate lastUpdate;

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

    public String getDecription() {
        return decription;
    }

    public void setDecription(String decription) {
        this.decription = decription;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(LocalDate lastUpdate) {
        this.lastUpdate = lastUpdate;
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

        GearValueChainCategoryDTO gearValueChainCategoryDTO = (GearValueChainCategoryDTO) o;
        if (gearValueChainCategoryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearValueChainCategoryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearValueChainCategoryDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", decription='" + getDecription() + "'" +
            ", color='" + getColor() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", lastUpdate='" + getLastUpdate() + "'" +
            ", gearOrganizationalUnit=" + getGearOrganizationalUnitId() +
            ", gearOrganizationalUnit='" + getGearOrganizationalUnitName() + "'" +
            "}";
    }
}
