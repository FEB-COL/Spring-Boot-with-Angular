package co.fuziontek.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the GearRiskLog entity.
 */
public class GearRiskLogDTO implements Serializable {

    private Long id;

    private String log;

    private LocalDate date;

    private String createdBy;

    private LocalDate creationDate;

    private String lastModifiedBy;

    private LocalDate lastModifiedDate;

    private Long gearProjectRiskId;

    private String gearProjectRiskStatus;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLog() {
        return log;
    }

    public void setLog(String log) {
        this.log = log;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
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

    public Long getGearProjectRiskId() {
        return gearProjectRiskId;
    }

    public void setGearProjectRiskId(Long gearProjectRiskId) {
        this.gearProjectRiskId = gearProjectRiskId;
    }

    public String getGearProjectRiskStatus() {
        return gearProjectRiskStatus;
    }

    public void setGearProjectRiskStatus(String gearProjectRiskStatus) {
        this.gearProjectRiskStatus = gearProjectRiskStatus;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GearRiskLogDTO gearRiskLogDTO = (GearRiskLogDTO) o;
        if (gearRiskLogDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearRiskLogDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearRiskLogDTO{" +
            "id=" + getId() +
            ", log='" + getLog() + "'" +
            ", date='" + getDate() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", lastModifiedBy='" + getLastModifiedBy() + "'" +
            ", lastModifiedDate='" + getLastModifiedDate() + "'" +
            ", gearProjectRisk=" + getGearProjectRiskId() +
            "}";
    }
}
