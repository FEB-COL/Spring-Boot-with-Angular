package co.fuziontek.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A GearDecision.
 */
@Entity
@Table(name = "gear_decision")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearDecision implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "goal")
    private String goal;

    @OneToMany(mappedBy = "geardecision")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearOption> gearoptions = new HashSet<>();
    @OneToMany(mappedBy = "geardecision")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearCriteria> gearcriteria = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("")
    private GearDomain geardomain;

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

    public GearDecision name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGoal() {
        return goal;
    }

    public GearDecision goal(String goal) {
        this.goal = goal;
        return this;
    }

    public void setGoal(String goal) {
        this.goal = goal;
    }

    public Set<GearOption> getGearoptions() {
        return gearoptions;
    }

    public GearDecision gearoptions(Set<GearOption> gearOptions) {
        this.gearoptions = gearOptions;
        return this;
    }

    public GearDecision addGearoption(GearOption gearOption) {
        this.gearoptions.add(gearOption);
        gearOption.setGeardecision(this);
        return this;
    }

    public GearDecision removeGearoption(GearOption gearOption) {
        this.gearoptions.remove(gearOption);
        gearOption.setGeardecision(null);
        return this;
    }

    public void setGearoptions(Set<GearOption> gearOptions) {
        this.gearoptions = gearOptions;
    }

    public Set<GearCriteria> getGearcriteria() {
        return gearcriteria;
    }

    public GearDecision gearcriteria(Set<GearCriteria> gearCriteria) {
        this.gearcriteria = gearCriteria;
        return this;
    }

    public GearDecision addGearcriteria(GearCriteria gearCriteria) {
        this.gearcriteria.add(gearCriteria);
        gearCriteria.setGeardecision(this);
        return this;
    }

    public GearDecision removeGearcriteria(GearCriteria gearCriteria) {
        this.gearcriteria.remove(gearCriteria);
        gearCriteria.setGeardecision(null);
        return this;
    }

    public void setGearcriteria(Set<GearCriteria> gearCriteria) {
        this.gearcriteria = gearCriteria;
    }

    public GearDomain getGeardomain() {
        return geardomain;
    }

    public GearDecision geardomain(GearDomain gearDomain) {
        this.geardomain = gearDomain;
        return this;
    }

    public void setGeardomain(GearDomain gearDomain) {
        this.geardomain = gearDomain;
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
        GearDecision gearDecision = (GearDecision) o;
        if (gearDecision.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearDecision.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearDecision{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", goal='" + getGoal() + "'" +
            "}";
    }
}
