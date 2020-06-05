package co.fuziontek.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * entity GearFormAspect {
 * name String,
 * minimumPercentage Long
 * }
 */
@ApiModel(description = "entity GearFormAspect { name String, minimumPercentage Long }")
@Entity
@Table(name = "gear_criteria")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearCriteria implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JsonIgnoreProperties("gearcriteria")
    private GearDecision geardecision;

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

    public GearCriteria name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public GearCriteria description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public GearDecision getGeardecision() {
        return geardecision;
    }

    public GearCriteria geardecision(GearDecision gearDecision) {
        this.geardecision = gearDecision;
        return this;
    }

    public void setGeardecision(GearDecision gearDecision) {
        this.geardecision = gearDecision;
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
        GearCriteria gearCriteria = (GearCriteria) o;
        if (gearCriteria.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearCriteria.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearCriteria{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
