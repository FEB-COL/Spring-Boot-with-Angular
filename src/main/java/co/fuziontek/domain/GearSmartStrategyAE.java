package co.fuziontek.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A GearSmartStrategyAE.
 */
@Entity
@Table(name = "gear_smart_strategy_ae")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearSmartStrategyAE implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "drescription")
    private String drescription;

    @ManyToOne
    @JsonIgnoreProperties("gearsmartstrategyaes")
    private GearGoalsStrategyAE geargoalsstrategyae;

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

    public GearSmartStrategyAE name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDrescription() {
        return drescription;
    }

    public GearSmartStrategyAE drescription(String drescription) {
        this.drescription = drescription;
        return this;
    }

    public void setDrescription(String drescription) {
        this.drescription = drescription;
    }

    public GearGoalsStrategyAE getGeargoalsstrategyae() {
        return geargoalsstrategyae;
    }

    public GearSmartStrategyAE geargoalsstrategyae(GearGoalsStrategyAE gearGoalsStrategyAE) {
        this.geargoalsstrategyae = gearGoalsStrategyAE;
        return this;
    }

    public void setGeargoalsstrategyae(GearGoalsStrategyAE gearGoalsStrategyAE) {
        this.geargoalsstrategyae = gearGoalsStrategyAE;
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
        GearSmartStrategyAE gearSmartStrategyAE = (GearSmartStrategyAE) o;
        if (gearSmartStrategyAE.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearSmartStrategyAE.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearSmartStrategyAE{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", drescription='" + getDrescription() + "'" +
            "}";
    }
}
