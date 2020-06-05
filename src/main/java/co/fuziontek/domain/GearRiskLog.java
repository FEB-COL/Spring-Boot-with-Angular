package co.fuziontek.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A GearRiskLog.
 */
@Entity
@Table(name = "gear_risk_log")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearRiskLog implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_log")
    private String log;

    @Column(name = "jhi_date")
    private LocalDate date;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @Column(name = "last_modified_by")
    private String lastModifiedBy;

    @Column(name = "last_modified_date")
    private LocalDate lastModifiedDate;

    @ManyToOne
    @JsonIgnoreProperties("gearRiskLogs")
    private GearProjectRisk gearProjectRisk;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLog() {
        return log;
    }

    public GearRiskLog log(String log) {
        this.log = log;
        return this;
    }

    public void setLog(String log) {
        this.log = log;
    }

    public LocalDate getDate() {
        return date;
    }

    public GearRiskLog date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public GearRiskLog createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public GearRiskLog creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public GearRiskLog lastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
        return this;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public LocalDate getLastModifiedDate() {
        return lastModifiedDate;
    }

    public GearRiskLog lastModifiedDate(LocalDate lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
        return this;
    }

    public void setLastModifiedDate(LocalDate lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public GearProjectRisk getGearProjectRisk() {
        return gearProjectRisk;
    }

    public GearRiskLog gearProjectRisk(GearProjectRisk gearProjectRisk) {
        this.gearProjectRisk = gearProjectRisk;
        return this;
    }

    public void setGearProjectRisk(GearProjectRisk gearProjectRisk) {
        this.gearProjectRisk = gearProjectRisk;
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
        GearRiskLog gearRiskLog = (GearRiskLog) o;
        if (gearRiskLog.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearRiskLog.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearRiskLog{" +
            "id=" + getId() +
            ", log='" + getLog() + "'" +
            ", date='" + getDate() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", lastModifiedBy='" + getLastModifiedBy() + "'" +
            ", lastModifiedDate='" + getLastModifiedDate() + "'" +
            "}";
    }
}
