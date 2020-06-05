package co.fuziontek.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A GearProcessInfoSystem.
 */
@Entity
@Table(name = "gear_process_info_system")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearProcessInfoSystem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties("gearprocessinfosystems")
    private GearInformationSystems gearinformationsystems;

    @ManyToOne
    @JsonIgnoreProperties("gearprocessinfosystems")
    private GearValueChainProcess gearvaluechainprocess;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public GearInformationSystems getGearinformationsystems() {
        return gearinformationsystems;
    }

    public GearProcessInfoSystem gearinformationsystems(GearInformationSystems gearInformationSystems) {
        this.gearinformationsystems = gearInformationSystems;
        return this;
    }

    public void setGearinformationsystems(GearInformationSystems gearInformationSystems) {
        this.gearinformationsystems = gearInformationSystems;
    }

    public GearValueChainProcess getGearvaluechainprocess() {
        return gearvaluechainprocess;
    }

    public GearProcessInfoSystem gearvaluechainprocess(GearValueChainProcess gearValueChainProcess) {
        this.gearvaluechainprocess = gearValueChainProcess;
        return this;
    }

    public void setGearvaluechainprocess(GearValueChainProcess gearValueChainProcess) {
        this.gearvaluechainprocess = gearValueChainProcess;
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
        GearProcessInfoSystem gearProcessInfoSystem = (GearProcessInfoSystem) o;
        if (gearProcessInfoSystem.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearProcessInfoSystem.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearProcessInfoSystem{" +
            "id=" + getId() +
            "}";
    }
}
