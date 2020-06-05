package co.fuziontek.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the GearValueChainProcess entity.
 */
public class GearValueChainProcessDTO implements Serializable {

    private Long id;

    private String name;

    private String decription;

    private LocalDate creationDate;

    private LocalDate lastUpdate;

    private String attach;

    private Boolean draft;

    private String inputs;

    private String outputs;

    private Long gearvaluechainmacroprocessId;

    //Relacion de nombre con macro y proceso

    private String gearvaluechainmacroprocessName;

    //fin     //Relacion de nombre con macro y proceso

    //get setter de relacion de macro y procesos

    public String getGearvaluechainmacroprocessName() {
        return gearvaluechainmacroprocessName;
    }

    public void setGearvaluechainmacroprocessName(String gearvaluechainmacroprocessName) {
        this.gearvaluechainmacroprocessName = gearvaluechainmacroprocessName;
    }

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

    public String getAttach() {
        return attach;
    }

    public void setAttach(String attach) {
        this.attach = attach;
    }

    public Boolean isDraft() {
        return draft;
    }

    public void setDraft(Boolean draft) {
        this.draft = draft;
    }

    public String getInputs() {
        return inputs;
    }

    public void setInputs(String inputs) {
        this.inputs = inputs;
    }

    public String getOutputs() {
        return outputs;
    }

    public void setOutputs(String outputs) {
        this.outputs = outputs;
    }

    public Long getGearvaluechainmacroprocessId() {
        return gearvaluechainmacroprocessId;
    }

    public void setGearvaluechainmacroprocessId(Long gearValueChainMacroprocessId) {
        this.gearvaluechainmacroprocessId = gearValueChainMacroprocessId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GearValueChainProcessDTO gearValueChainProcessDTO = (GearValueChainProcessDTO) o;
        if (gearValueChainProcessDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearValueChainProcessDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearValueChainProcessDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", decription='" + getDecription() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", lastUpdate='" + getLastUpdate() + "'" +
            ", attach='" + getAttach() + "'" +
            ", draft='" + isDraft() + "'" +
            ", inputs='" + getInputs() + "'" +
            ", outputs='" + getOutputs() + "'" +
            ", gearvaluechainmacroprocess=" + getGearvaluechainmacroprocessId() +
            ", gearvaluechainmacroprocessName='" + getGearvaluechainmacroprocessName() + "'" +
            "}";
    }
}
