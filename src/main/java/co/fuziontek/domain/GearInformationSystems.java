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
 * A GearInformationSystems.
 */
@Entity
@Table(name = "gear_information_systems")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearInformationSystems implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "version")
    private String version;

    @Column(name = "acquisition_date")
    private LocalDate acquisitionDate;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "responsible")
    private String responsible;

    @Column(name = "responsible_email")
    private String responsibleEmail;

    @Column(name = "provider")
    private String provider;

    @Column(name = "initial_cost")
    private Double initialCost;

    @Column(name = "mainteinance_cost")
    private Double mainteinanceCost;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @Column(name = "modify_date")
    private LocalDate modifyDate;

    @OneToMany(mappedBy = "gearinformationsystems")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearSystemsFunctionality> gearsystemsfunctionalities = new HashSet<>();
    @OneToMany(mappedBy = "gearinformationsystems")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearProcessInfoSystem> gearprocessinfosystems = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("gearInformationSystems")
    private GearOrganizationalUnit gearOrganizationalUnit;

    @ManyToOne
    @JsonIgnoreProperties("gearInformationSystems")
    private ParCoinType parCoinType;

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

    public GearInformationSystems name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public GearInformationSystems description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getVersion() {
        return version;
    }

    public GearInformationSystems version(String version) {
        this.version = version;
        return this;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public LocalDate getAcquisitionDate() {
        return acquisitionDate;
    }

    public GearInformationSystems acquisitionDate(LocalDate acquisitionDate) {
        this.acquisitionDate = acquisitionDate;
        return this;
    }

    public void setAcquisitionDate(LocalDate acquisitionDate) {
        this.acquisitionDate = acquisitionDate;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public GearInformationSystems startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public String getResponsible() {
        return responsible;
    }

    public GearInformationSystems responsible(String responsible) {
        this.responsible = responsible;
        return this;
    }

    public void setResponsible(String responsible) {
        this.responsible = responsible;
    }

    public String getResponsibleEmail() {
        return responsibleEmail;
    }

    public GearInformationSystems responsibleEmail(String responsibleEmail) {
        this.responsibleEmail = responsibleEmail;
        return this;
    }

    public void setResponsibleEmail(String responsibleEmail) {
        this.responsibleEmail = responsibleEmail;
    }

    public String getProvider() {
        return provider;
    }

    public GearInformationSystems provider(String provider) {
        this.provider = provider;
        return this;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public Double getInitialCost() {
        return initialCost;
    }

    public GearInformationSystems initialCost(Double initialCost) {
        this.initialCost = initialCost;
        return this;
    }

    public void setInitialCost(Double initialCost) {
        this.initialCost = initialCost;
    }

    public Double getMainteinanceCost() {
        return mainteinanceCost;
    }

    public GearInformationSystems mainteinanceCost(Double mainteinanceCost) {
        this.mainteinanceCost = mainteinanceCost;
        return this;
    }

    public void setMainteinanceCost(Double mainteinanceCost) {
        this.mainteinanceCost = mainteinanceCost;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public GearInformationSystems creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getModifyDate() {
        return modifyDate;
    }

    public GearInformationSystems modifyDate(LocalDate modifyDate) {
        this.modifyDate = modifyDate;
        return this;
    }

    public void setModifyDate(LocalDate modifyDate) {
        this.modifyDate = modifyDate;
    }

    public Set<GearSystemsFunctionality> getGearsystemsfunctionalities() {
        return gearsystemsfunctionalities;
    }

    public GearInformationSystems gearsystemsfunctionalities(Set<GearSystemsFunctionality> gearSystemsFunctionalities) {
        this.gearsystemsfunctionalities = gearSystemsFunctionalities;
        return this;
    }

    public GearInformationSystems addGearsystemsfunctionality(GearSystemsFunctionality gearSystemsFunctionality) {
        this.gearsystemsfunctionalities.add(gearSystemsFunctionality);
        gearSystemsFunctionality.setGearinformationsystems(this);
        return this;
    }

    public GearInformationSystems removeGearsystemsfunctionality(GearSystemsFunctionality gearSystemsFunctionality) {
        this.gearsystemsfunctionalities.remove(gearSystemsFunctionality);
        gearSystemsFunctionality.setGearinformationsystems(null);
        return this;
    }

    public void setGearsystemsfunctionalities(Set<GearSystemsFunctionality> gearSystemsFunctionalities) {
        this.gearsystemsfunctionalities = gearSystemsFunctionalities;
    }

    public Set<GearProcessInfoSystem> getGearprocessinfosystems() {
        return gearprocessinfosystems;
    }

    public GearInformationSystems gearprocessinfosystems(Set<GearProcessInfoSystem> gearProcessInfoSystems) {
        this.gearprocessinfosystems = gearProcessInfoSystems;
        return this;
    }

    public GearInformationSystems addGearprocessinfosystem(GearProcessInfoSystem gearProcessInfoSystem) {
        this.gearprocessinfosystems.add(gearProcessInfoSystem);
        gearProcessInfoSystem.setGearinformationsystems(this);
        return this;
    }

    public GearInformationSystems removeGearprocessinfosystem(GearProcessInfoSystem gearProcessInfoSystem) {
        this.gearprocessinfosystems.remove(gearProcessInfoSystem);
        gearProcessInfoSystem.setGearinformationsystems(null);
        return this;
    }

    public void setGearprocessinfosystems(Set<GearProcessInfoSystem> gearProcessInfoSystems) {
        this.gearprocessinfosystems = gearProcessInfoSystems;
    }

    public GearOrganizationalUnit getGearOrganizationalUnit() {
        return gearOrganizationalUnit;
    }

    public GearInformationSystems gearOrganizationalUnit(GearOrganizationalUnit gearOrganizationalUnit) {
        this.gearOrganizationalUnit = gearOrganizationalUnit;
        return this;
    }

    public void setGearOrganizationalUnit(GearOrganizationalUnit gearOrganizationalUnit) {
        this.gearOrganizationalUnit = gearOrganizationalUnit;
    }

    public ParCoinType getParCoinType() {
        return parCoinType;
    }

    public GearInformationSystems parCoinType(ParCoinType parCoinType) {
        this.parCoinType = parCoinType;
        return this;
    }

    public void setParCoinType(ParCoinType parCoinType) {
        this.parCoinType = parCoinType;
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
        GearInformationSystems gearInformationSystems = (GearInformationSystems) o;
        if (gearInformationSystems.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearInformationSystems.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearInformationSystems{" +
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
            "}";
    }
}
