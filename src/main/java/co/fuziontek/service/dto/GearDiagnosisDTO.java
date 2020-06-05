package co.fuziontek.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the GearDiagnosis entity.
 */
public class GearDiagnosisDTO implements Serializable {

    private Long id;

    private String name;

    private String description;

    private LocalDate creationDate;

    private Double levelMaturity;

    private Long gearDiagnosisTypeId;

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

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public Double getLevelMaturity() {
        return levelMaturity;
    }

    public void setLevelMaturity(Double levelMaturity) {
        this.levelMaturity = levelMaturity;
    }

    public Long getGearDiagnosisTypeId() {
        return gearDiagnosisTypeId;
    }

    public void setGearDiagnosisTypeId(Long gearDiagnosisTypeId) {
        this.gearDiagnosisTypeId = gearDiagnosisTypeId;
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

        GearDiagnosisDTO gearDiagnosisDTO = (GearDiagnosisDTO) o;
        if (gearDiagnosisDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearDiagnosisDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearDiagnosisDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", levelMaturity=" + getLevelMaturity() +
            ", gearDiagnosisType=" + getGearDiagnosisTypeId() +
            ", gearDomain=" + getGearDomainId() +
            ", gearDomain='" + getGearDomainName() + "'" +
            "}";
    }
}
