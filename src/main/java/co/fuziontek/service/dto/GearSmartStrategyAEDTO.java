package co.fuziontek.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the GearSmartStrategyAE entity.
 */
public class GearSmartStrategyAEDTO implements Serializable {

    private Long id;

    private String name;

    private String drescription;

    private Long geargoalsstrategyaeId;

    //nombre para asociar por id con Goals

    private String geargoalsstrategyaeName;

    //fin
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

    public Long getGeargoalsstrategyaeId() {
        return geargoalsstrategyaeId;
    }

    public void setGeargoalsstrategyaeId(Long gearGoalsStrategyAEId) {
        this.geargoalsstrategyaeId = gearGoalsStrategyAEId;
    }

    //Constructores de name pars relacion con  Goals
    public String getGeargoalsstrategyaeName() {
        return geargoalsstrategyaeName;
    }

    public void setGeargoalsstrategyaeName(String geargoalsstrategyaeName) {
        this.geargoalsstrategyaeName = geargoalsstrategyaeName;
    }

    //fin

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GearSmartStrategyAEDTO gearSmartStrategyAEDTO = (GearSmartStrategyAEDTO) o;
        if (gearSmartStrategyAEDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearSmartStrategyAEDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearSmartStrategyAEDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", drescription='" + getDrescription() + "'" +
            ", geargoalsstrategyae=" + getGeargoalsstrategyaeId() +
            ", geargoalsstrategyaename='" + getGeargoalsstrategyaeName() + "'" +
            "}";
    }
}
