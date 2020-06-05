package co.fuziontek.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the GearProjectRisk entity.
 */
public class GearProjectRiskDTO implements Serializable {

    private Long id;

    private String status;

    private Integer impact;

    private Integer probability;

    private String description;

    private LocalDate firstImpactDate;

    private String mitigationStrategy;

    private String mitigationDescription;

    private LocalDate expectedCloseDate;

    private String createdBy;

    private LocalDate creationDate;

    private String lastModifiedBy;

    private LocalDate lastModifiedDate;

    private Long gearProjectId;

    private String gearProjectName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getImpact() {
        return impact;
    }

    public void setImpact(Integer impact) {
        this.impact = impact;
    }

    public Integer getProbability() {
        return probability;
    }

    public void setProbability(Integer probability) {
        this.probability = probability;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getFirstImpactDate() {
        return firstImpactDate;
    }

    public void setFirstImpactDate(LocalDate firstImpactDate) {
        this.firstImpactDate = firstImpactDate;
    }

    public String getMitigationStrategy() {
        return mitigationStrategy;
    }

    public void setMitigationStrategy(String mitigationStrategy) {
        this.mitigationStrategy = mitigationStrategy;
    }

    public String getMitigationDescription() {
        return mitigationDescription;
    }

    public void setMitigationDescription(String mitigationDescription) {
        this.mitigationDescription = mitigationDescription;
    }

    public LocalDate getExpectedCloseDate() {
        return expectedCloseDate;
    }

    public void setExpectedCloseDate(LocalDate expectedCloseDate) {
        this.expectedCloseDate = expectedCloseDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public LocalDate getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(LocalDate lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public Long getGearProjectId() {
        return gearProjectId;
    }

    public void setGearProjectId(Long gearProjectId) {
        this.gearProjectId = gearProjectId;
    }

    public String getGearProjectName() {
        return gearProjectName;
    }

    public void setGearProjectName(String gearProjectName) {
        this.gearProjectName = gearProjectName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GearProjectRiskDTO gearProjectRiskDTO = (GearProjectRiskDTO) o;
        if (gearProjectRiskDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearProjectRiskDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearProjectRiskDTO{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", impact=" + getImpact() +
            ", probability=" + getProbability() +
            ", description='" + getDescription() + "'" +
            ", firstImpactDate='" + getFirstImpactDate() + "'" +
            ", mitigationStrategy='" + getMitigationStrategy() + "'" +
            ", mitigationDescription='" + getMitigationDescription() + "'" +
            ", expectedCloseDate='" + getExpectedCloseDate() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", lastModifiedBy='" + getLastModifiedBy() + "'" +
            ", lastModifiedDate='" + getLastModifiedDate() + "'" +
            ", gearProject=" + getGearProjectId() +
            "}";
    }
}
