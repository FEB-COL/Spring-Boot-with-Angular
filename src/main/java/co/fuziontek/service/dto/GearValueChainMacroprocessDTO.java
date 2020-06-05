package co.fuziontek.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the GearValueChainMacroprocess entity.
 */
public class GearValueChainMacroprocessDTO implements Serializable {

    private Long id;

    private String name;

    private String decription;

    private LocalDate creationDate;

    private LocalDate lastUpdate;

    private Boolean draft;

    private Integer order;

    private Long gearvaluechaincategoryId;

    private String gearvaluechaincategoryName;

    //Get y Setter del nuevo valor

    public String getGearvaluechaincategoryName() {
        return gearvaluechaincategoryName;
    }

    public void setGearvaluechaincategoryName(String gearvaluechaincategoryName) {
        this.gearvaluechaincategoryName = gearvaluechaincategoryName;
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

    public Boolean isDraft() {
        return draft;
    }

    public void setDraft(Boolean draft) {
        this.draft = draft;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    public Long getGearvaluechaincategoryId() {
        return gearvaluechaincategoryId;
    }

    public void setGearvaluechaincategoryId(Long gearValueChainCategoryId) {
        this.gearvaluechaincategoryId = gearValueChainCategoryId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GearValueChainMacroprocessDTO gearValueChainMacroprocessDTO = (GearValueChainMacroprocessDTO) o;
        if (gearValueChainMacroprocessDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearValueChainMacroprocessDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearValueChainMacroprocessDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", decription='" + getDecription() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", lastUpdate='" + getLastUpdate() + "'" +
            ", draft='" + isDraft() + "'" +
            ", order=" + getOrder() +
            ", gearvaluechaincategory=" + getGearvaluechaincategoryId() +
            ", gearvaluechaincategoryName=" + getGearvaluechaincategoryName() + "'" +
            "}";
    }
}
