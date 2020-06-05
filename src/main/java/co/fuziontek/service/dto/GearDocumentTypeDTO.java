package co.fuziontek.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the GearDocumentType entity.
 */
public class GearDocumentTypeDTO implements Serializable {

    private Long id;

    private String name;

    private Long geardomainId;

    private String  geardomainName;

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

    public Long getGeardomainId() {
        return geardomainId;
    }

    public void setGeardomainId(Long gearDomainId) {
        this.geardomainId = gearDomainId;
    }


    public String getGeardomainName() {
        return geardomainName;
    }

    public void setGeardomainName(String geardomainName) {
        this.geardomainName = geardomainName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GearDocumentTypeDTO gearDocumentTypeDTO = (GearDocumentTypeDTO) o;
        if (gearDocumentTypeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearDocumentTypeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearDocumentTypeDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", geardomain=" + getGeardomainId() +
            "}";
    }
}
