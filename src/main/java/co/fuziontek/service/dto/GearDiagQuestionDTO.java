package co.fuziontek.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the GearDiagQuestion entity.
 */
public class GearDiagQuestionDTO implements Serializable {

    private Long id;

    private String name;

    private String description;

    private LocalDate creationDate;

    private Long gearDiagnosisId;

    private String gearDiagnosisName;

    private Long gearAmbitId;

    private String gearAmbitName;

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

    public Long getGearDiagnosisId() {
        return gearDiagnosisId;
    }

    public void setGearDiagnosisId(Long gearDiagnosisId) {
        this.gearDiagnosisId = gearDiagnosisId;
    }

    public Long getGearAmbitId() {
        return gearAmbitId;
    }

    public void setGearAmbitId(Long gearAmbitId) {
        this.gearAmbitId = gearAmbitId;
    }

    public String getGearDiagnosisName() {
        return gearDiagnosisName;
    }

    public void setGearDiagnosisName(String gearDiagnosisName) {
        this.gearDiagnosisName = gearDiagnosisName;
    }

    public String getGearAmbitName() {
        return gearAmbitName;
    }

    public void setGearAmbitName(String gearAmbitName) {
        this.gearAmbitName = gearAmbitName;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GearDiagQuestionDTO gearDiagQuestionDTO = (GearDiagQuestionDTO) o;
        if (gearDiagQuestionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearDiagQuestionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearDiagQuestionDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", gearDiagnosis=" + getGearDiagnosisId() +
            ", gearAmbit=" + getGearAmbitId() +
            "}";
    }
}
