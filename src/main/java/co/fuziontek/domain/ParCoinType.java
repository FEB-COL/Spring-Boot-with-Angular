package co.fuziontek.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ParCoinType.
 */
@Entity
@Table(name = "par_coin_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ParCoinType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "symbol")
    private String symbol;

    @OneToMany(mappedBy = "parCoinType")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearInformationSystems> gearInformationSystems = new HashSet<>();
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

    public ParCoinType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public ParCoinType description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSymbol() {
        return symbol;
    }

    public ParCoinType symbol(String symbol) {
        this.symbol = symbol;
        return this;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public Set<GearInformationSystems> getGearInformationSystems() {
        return gearInformationSystems;
    }

    public ParCoinType gearInformationSystems(Set<GearInformationSystems> gearInformationSystems) {
        this.gearInformationSystems = gearInformationSystems;
        return this;
    }

    public ParCoinType addGearInformationSystems(GearInformationSystems gearInformationSystems) {
        this.gearInformationSystems.add(gearInformationSystems);
        gearInformationSystems.setParCoinType(this);
        return this;
    }

    public ParCoinType removeGearInformationSystems(GearInformationSystems gearInformationSystems) {
        this.gearInformationSystems.remove(gearInformationSystems);
        gearInformationSystems.setParCoinType(null);
        return this;
    }

    public void setGearInformationSystems(Set<GearInformationSystems> gearInformationSystems) {
        this.gearInformationSystems = gearInformationSystems;
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
        ParCoinType parCoinType = (ParCoinType) o;
        if (parCoinType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), parCoinType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ParCoinType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", symbol='" + getSymbol() + "'" +
            "}";
    }
}
