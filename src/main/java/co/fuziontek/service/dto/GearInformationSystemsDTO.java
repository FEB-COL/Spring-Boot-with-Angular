package co.fuziontek.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the GearInformationSystems entity.
 */
public class GearInformationSystemsDTO implements Serializable {

    private Long id;

    private String name;

    private String description;

    private String version;

    private LocalDate acquisitionDate;

    private LocalDate startDate;

    private String responsible;

    private String responsibleEmail;

    private String provider;

    private Double initialCost;

    private Double mainteinanceCost;

    private LocalDate creationDate;

    private LocalDate modifyDate;

    private Long gearOrganizationalUnitId;

    private String gearOrganizationalUnitName;

    private Long parCoinTypeId;

    private String parCoinTypeName;

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

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public LocalDate getAcquisitionDate() {
        return acquisitionDate;
    }

    public void setAcquisitionDate(LocalDate acquisitionDate) {
        this.acquisitionDate = acquisitionDate;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public String getResponsible() {
        return responsible;
    }

    public void setResponsible(String responsible) {
        this.responsible = responsible;
    }

    public String getResponsibleEmail() {
        return responsibleEmail;
    }

    public void setResponsibleEmail(String responsibleEmail) {
        this.responsibleEmail = responsibleEmail;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public Double getInitialCost() {
        return initialCost;
    }

    public void setInitialCost(Double initialCost) {
        this.initialCost = initialCost;
    }

    public Double getMainteinanceCost() {
        return mainteinanceCost;
    }

    public void setMainteinanceCost(Double mainteinanceCost) {
        this.mainteinanceCost = mainteinanceCost;
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

    public Long getGearOrganizationalUnitId() {
        return gearOrganizationalUnitId;
    }

    public void setGearOrganizationalUnitId(Long gearOrganizationalUnitId) {
        this.gearOrganizationalUnitId = gearOrganizationalUnitId;
    }

    public String getGearOrganizationalUnitName() {
        return gearOrganizationalUnitName;
    }

    public void setGearOrganizationalUnitName(String gearOrganizationalUnitName) {
        this.gearOrganizationalUnitName = gearOrganizationalUnitName;
    }

    public Long getParCoinTypeId() {
        return parCoinTypeId;
    }

    public void setParCoinTypeId(Long parCoinTypeId) {
        this.parCoinTypeId = parCoinTypeId;
    }

    public String getParCoinTypeName() {
        return parCoinTypeName;
    }

    public void setParCoinTypeName(String parCoinTypeName) {
        this.parCoinTypeName = parCoinTypeName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GearInformationSystemsDTO gearInformationSystemsDTO = (GearInformationSystemsDTO) o;
        if (gearInformationSystemsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearInformationSystemsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearInformationSystemsDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", version='" + getVersion() + "'" +
            ", acquisitionDate='" + getAcquisitionDate() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", responsible='" + getResponsible() + "'" +
            ", responsibleEmail='" + getResponsibleEmail() + "'" +
            ", provider='" + getProvider() + "'" +
            ", initialCost=" + getInitialCost() +
            ", mainteinanceCost=" + getMainteinanceCost() +
            ", creationDate='" + getCreationDate() + "'" +
            ", modifyDate='" + getModifyDate() + "'" +
            ", gearOrganizationalUnit=" + getGearOrganizationalUnitId() +
            ", gearOrganizationalUnit='" + getGearOrganizationalUnitName() + "'" +
            ", parCoinType=" + getParCoinTypeId() +
            ", parCoinType='" + getParCoinTypeName() + "'" +
            "}";
    }
}
