package co.fuziontek.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A GearSystemsFunctionality.
 */
@Entity
@Table(name = "gear_systems_functionality")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearSystemsFunctionality implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @Column(name = "modify_date")
    private LocalDate modifyDate;

    @ManyToOne
    @JsonIgnoreProperties("gearsystemsfunctionalities")
    private GearInformationSystems gearinformationsystems;

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

    public GearSystemsFunctionality name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public GearSystemsFunctionality description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public GearSystemsFunctionality creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getModifyDate() {
        return modifyDate;
    }

    public GearSystemsFunctionality modifyDate(LocalDate modifyDate) {
        this.modifyDate = modifyDate;
        return this;
    }

    public void setModifyDate(LocalDate modifyDate) {
        this.modifyDate = modifyDate;
    }

    public GearInformationSystems getGearinformationsystems() {
        return gearinformationsystems;
    }

    public GearSystemsFunctionality gearinformationsystems(GearInformationSystems gearInformationSystems) {
        this.gearinformationsystems = gearInformationSystems;
        return this;
    }

    public void setGearinformationsystems(GearInformationSystems gearInformationSystems) {
        this.gearinformationsystems = gearInformationSystems;
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
        GearSystemsFunctionality gearSystemsFunctionality = (GearSystemsFunctionality) o;
        if (gearSystemsFunctionality.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearSystemsFunctionality.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearSystemsFunctionality{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", modifyDate='" + getModifyDate() + "'" +
            "}";
    }
}
