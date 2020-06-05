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
 * A GearProject.
 */
@Entity
@Table(name = "gear_project")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearProject implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "budget")
    private Double budget;

    @Column(name = "percentage_completed")
    private Integer percentageCompleted;

    @Column(name = "spend")
    private Double spend;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "attach")
    private String attach;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @Column(name = "last_modified_by")
    private String lastModifiedBy;

    @Column(name = "last_modified_date")
    private LocalDate lastModifiedDate;

    @OneToMany(mappedBy = "gearProject")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearProjectRisk> gearProjectRisks = new HashSet<>();
    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "gear_project_gear_iteration",
               joinColumns = @JoinColumn(name = "gear_projects_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "gear_iterations_id", referencedColumnName = "id"))
    private Set<GearIteration> gearIterations = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("gearProjects")
    private GearPortfolio gearPortfolio;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public GearProject name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public GearProject description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getBudget() {
        return budget;
    }

    public GearProject budget(Double budget) {
        this.budget = budget;
        return this;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }

    public Integer getPercentageCompleted() {
        return percentageCompleted;
    }

    public GearProject percentageCompleted(Integer percentageCompleted) {
        this.percentageCompleted = percentageCompleted;
        return this;
    }

    public void setPercentageCompleted(Integer percentageCompleted) {
        this.percentageCompleted = percentageCompleted;
    }

    public Double getSpend() {
        return spend;
    }

    public GearProject spend(Double spend) {
        this.spend = spend;
        return this;
    }

    public void setSpend(Double spend) {
        this.spend = spend;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public GearProject startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public GearProject endDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getAttach() {
        return attach;
    }

    public GearProject attach(String attach) {
        this.attach = attach;
        return this;
    }

    public void setAttach(String attach) {
        this.attach = attach;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public GearProject createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public GearProject creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public GearProject lastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
        return this;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public LocalDate getLastModifiedDate() {
        return lastModifiedDate;
    }

    public GearProject lastModifiedDate(LocalDate lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
        return this;
    }

    public void setLastModifiedDate(LocalDate lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public Set<GearProjectRisk> getGearProjectRisks() {
        return gearProjectRisks;
    }

    public GearProject gearProjectRisks(Set<GearProjectRisk> gearProjectRisks) {
        this.gearProjectRisks = gearProjectRisks;
        return this;
    }

    public GearProject addGearProjectRisk(GearProjectRisk gearProjectRisk) {
        this.gearProjectRisks.add(gearProjectRisk);
        gearProjectRisk.setGearProject(this);
        return this;
    }

    public GearProject removeGearProjectRisk(GearProjectRisk gearProjectRisk) {
        this.gearProjectRisks.remove(gearProjectRisk);
        gearProjectRisk.setGearProject(null);
        return this;
    }

    public void setGearProjectRisks(Set<GearProjectRisk> gearProjectRisks) {
        this.gearProjectRisks = gearProjectRisks;
    }

    public Set<GearIteration> getGearIterations() {
        return gearIterations;
    }

    public GearProject gearIterations(Set<GearIteration> gearIterations) {
        this.gearIterations = gearIterations;
        return this;
    }

    public GearProject addGearIteration(GearIteration gearIteration) {
        this.gearIterations.add(gearIteration);
        gearIteration.getGearProjects().add(this);
        return this;
    }

    public GearProject removeGearIteration(GearIteration gearIteration) {
        this.gearIterations.remove(gearIteration);
        gearIteration.getGearProjects().remove(this);
        return this;
    }

    public void setGearIterations(Set<GearIteration> gearIterations) {
        this.gearIterations = gearIterations;
    }

    public GearPortfolio getGearPortfolio() {
        return gearPortfolio;
    }

    public GearProject gearPortfolio(GearPortfolio gearPortfolio) {
        this.gearPortfolio = gearPortfolio;
        return this;
    }

    public void setGearPortfolio(GearPortfolio gearPortfolio) {
        this.gearPortfolio = gearPortfolio;
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
        GearProject gearProject = (GearProject) o;
        if (gearProject.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearProject.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearProject{" +
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
            "}";
    }
}
