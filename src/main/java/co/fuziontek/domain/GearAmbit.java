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
 * A GearAmbit.
 */
@Entity
@Table(name = "gear_ambit")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearAmbit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "gearAmbit")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearDiagQuestion> gearDiagQuestions = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("gearAmbits")
    private GearDomain gearDomain;

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

    public GearAmbit name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public GearAmbit description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<GearDiagQuestion> getGearDiagQuestions() {
        return gearDiagQuestions;
    }

    public GearAmbit gearDiagQuestions(Set<GearDiagQuestion> gearDiagQuestions) {
        this.gearDiagQuestions = gearDiagQuestions;
        return this;
    }

    public GearAmbit addGearDiagQuestion(GearDiagQuestion gearDiagQuestion) {
        this.gearDiagQuestions.add(gearDiagQuestion);
        gearDiagQuestion.setGearAmbit(this);
        return this;
    }

    public GearAmbit removeGearDiagQuestion(GearDiagQuestion gearDiagQuestion) {
        this.gearDiagQuestions.remove(gearDiagQuestion);
        gearDiagQuestion.setGearAmbit(null);
        return this;
    }

    public void setGearDiagQuestions(Set<GearDiagQuestion> gearDiagQuestions) {
        this.gearDiagQuestions = gearDiagQuestions;
    }

    public GearDomain getGearDomain() {
        return gearDomain;
    }

    public GearAmbit gearDomain(GearDomain gearDomain) {
        this.gearDomain = gearDomain;
        return this;
    }

    public void setGearDomain(GearDomain gearDomain) {
        this.gearDomain = gearDomain;
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
        GearAmbit gearAmbit = (GearAmbit) o;
        if (gearAmbit.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearAmbit.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearAmbit{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
