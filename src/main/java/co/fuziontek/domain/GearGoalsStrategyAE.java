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
 * A GearGoalsStrategyAE.
 */
@Entity
@Table(name = "gear_goals_strategy_ae")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearGoalsStrategyAE implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "drescription")
    private String drescription;

    @OneToMany(mappedBy = "geargoalsstrategyae")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearSmartStrategyAE> gearsmartstrategyaes = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("gearGoalsStrategyAES")
    private GearOrganizationalUnit gearOrganizationalUnit;

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

    public GearGoalsStrategyAE name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDrescription() {
        return drescription;
    }

    public GearGoalsStrategyAE drescription(String drescription) {
        this.drescription = drescription;
        return this;
    }

    public void setDrescription(String drescription) {
        this.drescription = drescription;
    }

    public Set<GearSmartStrategyAE> getGearsmartstrategyaes() {
        return gearsmartstrategyaes;
    }

    public GearGoalsStrategyAE gearsmartstrategyaes(Set<GearSmartStrategyAE> gearSmartStrategyAES) {
        this.gearsmartstrategyaes = gearSmartStrategyAES;
        return this;
    }

    public GearGoalsStrategyAE addGearsmartstrategyae(GearSmartStrategyAE gearSmartStrategyAE) {
        this.gearsmartstrategyaes.add(gearSmartStrategyAE);
        gearSmartStrategyAE.setGeargoalsstrategyae(this);
        return this;
    }

    public GearGoalsStrategyAE removeGearsmartstrategyae(GearSmartStrategyAE gearSmartStrategyAE) {
        this.gearsmartstrategyaes.remove(gearSmartStrategyAE);
        gearSmartStrategyAE.setGeargoalsstrategyae(null);
        return this;
    }

    public void setGearsmartstrategyaes(Set<GearSmartStrategyAE> gearSmartStrategyAES) {
        this.gearsmartstrategyaes = gearSmartStrategyAES;
    }

    public GearOrganizationalUnit getGearOrganizationalUnit() {
        return gearOrganizationalUnit;
    }

    public GearGoalsStrategyAE gearOrganizationalUnit(GearOrganizationalUnit gearOrganizationalUnit) {
        this.gearOrganizationalUnit = gearOrganizationalUnit;
        return this;
    }

    public void setGearOrganizationalUnit(GearOrganizationalUnit gearOrganizationalUnit) {
        this.gearOrganizationalUnit = gearOrganizationalUnit;
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
        GearGoalsStrategyAE gearGoalsStrategyAE = (GearGoalsStrategyAE) o;
        if (gearGoalsStrategyAE.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearGoalsStrategyAE.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearGoalsStrategyAE{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", drescription='" + getDrescription() + "'" +
            "}";
    }
}
