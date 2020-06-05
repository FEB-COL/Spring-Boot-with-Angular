package co.fuziontek.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the GearProcessInfoSystem entity.
 */
public class GearProcessInfoSystemDTO implements Serializable {

    private Long id;

    private Long gearinformationsystemsId;

    private Long gearvaluechainprocessId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getGearinformationsystemsId() {
        return gearinformationsystemsId;
    }

    public void setGearinformationsystemsId(Long gearInformationSystemsId) {
        this.gearinformationsystemsId = gearInformationSystemsId;
    }

    public Long getGearvaluechainprocessId() {
        return gearvaluechainprocessId;
    }

    public void setGearvaluechainprocessId(Long gearValueChainProcessId) {
        this.gearvaluechainprocessId = gearValueChainProcessId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GearProcessInfoSystemDTO gearProcessInfoSystemDTO = (GearProcessInfoSystemDTO) o;
        if (gearProcessInfoSystemDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearProcessInfoSystemDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearProcessInfoSystemDTO{" +
            "id=" + getId() +
            ", gearinformationsystems=" + getGearinformationsystemsId() +
            ", gearvaluechainprocess=" + getGearvaluechainprocessId() +
            "}";
    }
}
