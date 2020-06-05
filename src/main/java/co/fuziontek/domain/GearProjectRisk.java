package co.fuziontek.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A GearProjectRisk.
 */
@Entity
@Table(name = "gear_project_risk")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearProjectRisk implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "status")
    private String status;

    @Column(name = "impact")
    private Integer impact;

    @Column(name = "probability")
    private Integer probability;

    @Column(name = "description")
    private String description;

    @Column(name = "first_impact_date")
    private LocalDate firstImpactDate;

    @Column(name = "mitigation_strategy")
    private String mitigationStrategy;

    @Column(name = "mitigation_description")
    private String mitigationDescription;

    @Column(name = "expected_close_date")
    private LocalDate expectedCloseDate;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @Column(name = "last_modified_by")
    private String lastModifiedBy;

    @Column(name = "last_modified_date")
    private LocalDate lastModifiedDate;

    @OneToMany(mappedBy = "gearProjectRisk")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearRiskLog> gearRiskLogs = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("gearProjectRisks")
    private GearProject gearProject;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public GearProjectRisk status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getImpact() {
        return impact;
    }

    public GearProjectRisk impact(Integer impact) {
        this.impact = impact;
        return this;
    }

    public void setImpact(Integer impact) {
        this.impact = impact;
    }

    public Integer getProbability() {
        return probability;
    }

    public GearProjectRisk probability(Integer probability) {
        this.probability = probability;
        return this;
    }

    public void setProbability(Integer probability) {
        this.probability = probability;
    }

    public String getDescription() {
        return description;
    }

    public GearProjectRisk description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getFirstImpactDate() {
        return firstImpactDate;
    }

    public GearProjectRisk firstImpactDate(LocalDate firstImpactDate) {
        this.firstImpactDate = firstImpactDate;
        return this;
    }

    public void setFirstImpactDate(LocalDate firstImpactDate) {
        this.firstImpactDate = firstImpactDate;
    }

    public String getMitigationStrategy() {
        return mitigationStrategy;
    }

    public GearProjectRisk mitigationStrategy(String mitigationStrategy) {
        this.mitigationStrategy = mitigationStrategy;
        return this;
    }

    public void setMitigationStrategy(String mitigationStrategy) {
        this.mitigationStrategy = mitigationStrategy;
    }

    public String getMitigationDescription() {
        return mitigationDescription;
    }

    public GearProjectRisk mitigationDescription(String mitigationDescription) {
        this.mitigationDescription = mitigationDescription;
        return this;
    }

    public void setMitigationDescription(String mitigationDescription) {
        this.mitigationDescription = mitigationDescription;
    }

    public LocalDate getExpectedCloseDate() {
        return expectedCloseDate;
    }

    public GearProjectRisk expectedCloseDate(LocalDate expectedCloseDate) {
        this.expectedCloseDate = expectedCloseDate;
        return this;
    }

    public void setExpectedCloseDate(LocalDate expectedCloseDate) {
        this.expectedCloseDate = expectedCloseDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public GearProjectRisk createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public GearProjectRisk creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public GearProjectRisk lastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
        return this;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public LocalDate getLastModifiedDate() {
        return lastModifiedDate;
    }

    public GearProjectRisk lastModifiedDate(LocalDate lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
        return this;
    }

    public void setLastModifiedDate(LocalDate lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public Set<GearRiskLog> getGearRiskLogs() {
        return gearRiskLogs;
    }

    public GearProjectRisk gearRiskLogs(Set<GearRiskLog> gearRiskLogs) {
        this.gearRiskLogs = gearRiskLogs;
        return this;
    }

    public GearProjectRisk addGearRiskLog(GearRiskLog gearRiskLog) {
        this.gearRiskLogs.add(gearRiskLog);
        gearRiskLog.setGearProjectRisk(this);
        return this;
    }

    public GearProjectRisk removeGearRiskLog(GearRiskLog gearRiskLog) {
        this.gearRiskLogs.remove(gearRiskLog);
        gearRiskLog.setGearProjectRisk(null);
        return this;
    }

    public void setGearRiskLogs(Set<GearRiskLog> gearRiskLogs) {
        this.gearRiskLogs = gearRiskLogs;
    }

    public GearProject getGearProject() {
        return gearProject;
    }

    public GearProjectRisk gearProject(GearProject gearProject) {
        this.gearProject = gearProject;
        return this;
    }

    public void setGearProject(GearProject gearProject) {
        this.gearProject = gearProject;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        GearProjectRisk gearProjectRisk = (GearProjectRisk) o;
        if (gearProjectRisk.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearProjectRisk.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearProjectRisk{" +
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
            "}";
    }
}
