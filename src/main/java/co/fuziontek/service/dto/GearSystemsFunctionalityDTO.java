package co.fuziontek.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the GearSystemsFunctionality entity.
 */
public class GearSystemsFunctionalityDTO implements Serializable {

    private Long id;

    private String name;

    private String description;

    private LocalDate creationDate;

    private LocalDate modifyDate;

    private Long gearinformationsystemsId;

    //Traer nombre de Sistemas a Funcionalidad


    private String gearInformationSystemName;

    //Fin de nombre

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

    public LocalDate getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(LocalDate modifyDate) {
        this.modifyDate = modifyDate;
    }

    public Long getGearinformationsystemsId() {
        return gearinformationsystemsId;
    }

    public void setGearinformationsystemsId(Long gearInformationSystemsId) {
        this.gearinformationsystemsId = gearInformationSystemsId;

    }

    public String getGearInformationSystemName() {
        return gearInformationSystemName;
    }

    public void setGearInformationSystemName(String gearInformationSystemName) {
        this.gearInformationSystemName = gearInformationSystemName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GearSystemsFunctionalityDTO gearSystemsFunctionalityDTO = (GearSystemsFunctionalityDTO) o;
        if (gearSystemsFunctionalityDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearSystemsFunctionalityDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearSystemsFunctionalityDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", modifyDate='" + getModifyDate() + "'" +
            ", gearinformationsystems=" + getGearinformationsystemsId() +
            ", gearinformationsystemsname='" + getGearInformationSystemName() + "'" +
            "}";
    }
}
