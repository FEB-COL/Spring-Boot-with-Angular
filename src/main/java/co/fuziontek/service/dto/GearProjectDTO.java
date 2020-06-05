package co.fuziontek.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the GearProject entity.
 */
public class GearProjectDTO implements Serializable {

    private Long id;

    private String name;

    private String description;

    private Double budget;

    private Integer percentageCompleted;

    private Double spend;

    private LocalDate startDate;

    private LocalDate endDate;

    private String attach;

    private String createdBy;

    private LocalDate creationDate;

    private String lastModifiedBy;

    private LocalDate lastModifiedDate;

    private Set<GearIterationDTO> gearIterations = new HashSet<>();

    private Long gearPortfolioId;

    private String gearPortfolioName;

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

    public Double getBudget() {
        return budget;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }

    public Integer getPercentageCompleted() {
        return percentageCompleted;
    }

    public void setPercentageCompleted(Integer percentageCompleted) {
        this.percentageCompleted = percentageCompleted;
    }

    public Double getSpend() {
        return spend;
    }

    public void setSpend(Double spend) {
        this.spend = spend;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getAttach() {
        return attach;
    }

    public void setAttach(String attach) {
        this.attach = attach;
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

    public Set<GearIterationDTO> getGearIterations() {
        return gearIterations;
    }

    public void setGearIterations(Set<GearIterationDTO> gearIterations) {
        this.gearIterations = gearIterations;
    }

    public Long getGearPortfolioId() {
        return gearPortfolioId;
    }

    public void setGearPortfolioId(Long gearPortfolioId) {
        this.gearPortfolioId = gearPortfolioId;
    }

    public String getGearPortfolioName() {
        return gearPortfolioName;
    }

    public void setGearPortfolioName(String gearPortfolioName) {
        this.gearPortfolioName = gearPortfolioName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GearProjectDTO gearProjectDTO = (GearProjectDTO) o;
        if (gearProjectDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearProjectDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearProjectDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", budget=" + getBudget() +
            ", percentageCompleted=" + getPercentageCompleted() +
            ", spend=" + getSpend() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", attach='" + getAttach() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", lastModifiedBy='" + getLastModifiedBy() + "'" +
            ", lastModifiedDate='" + getLastModifiedDate() + "'" +
            ", gearPortfolio=" + getGearPortfolioId() +
            "}";
    }
}
