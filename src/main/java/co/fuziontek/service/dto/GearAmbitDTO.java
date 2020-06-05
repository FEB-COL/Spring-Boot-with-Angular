package co.fuziontek.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the GearAmbit entity.
 */
public class GearAmbitDTO implements Serializable {

    private Long id;

    private String name;

    private String description;

    private Long gearDomainId;

    private String gearDomainName;

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

    public Long getGearDomainId() {
        return gearDomainId;
    }

    public void setGearDomainId(Long gearDomainId) {
        this.gearDomainId = gearDomainId;
    }

    public String getGearDomainName() {
        return gearDomainName;
    }

    public void setGearDomainName(String gearDomainName) {
        this.gearDomainName = gearDomainName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GearAmbitDTO gearAmbitDTO = (GearAmbitDTO) o;
        if (gearAmbitDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearAmbitDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearAmbitDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", gearDomain=" + getGearDomainId() +
            ", gearDomain='" + getGearDomainName() + "'" +
            "}";
    }
}
