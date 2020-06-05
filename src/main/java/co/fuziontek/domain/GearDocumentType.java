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
 * A GearDocumentType.
 */
@Entity
@Table(name = "gear_document_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearDocumentType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "gearDdocumenttype")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearCustomFieldTemplate> gearcustomfieldtemplates = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("geardocumenttypes")
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

    public GearDocumentType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<GearCustomFieldTemplate> getGearcustomfieldtemplates() {
        return gearcustomfieldtemplates;
    }

    public GearDocumentType gearcustomfieldtemplates(Set<GearCustomFieldTemplate> gearCustomFieldTemplates) {
        this.gearcustomfieldtemplates = gearCustomFieldTemplates;
        return this;
    }

    public GearDocumentType addGearcustomfieldtemplate(GearCustomFieldTemplate gearCustomFieldTemplate) {
        this.gearcustomfieldtemplates.add(gearCustomFieldTemplate);
        gearCustomFieldTemplate.setGearDdocumenttype(this);
        return this;
    }

    public GearDocumentType removeGearcustomfieldtemplate(GearCustomFieldTemplate gearCustomFieldTemplate) {
        this.gearcustomfieldtemplates.remove(gearCustomFieldTemplate);
        gearCustomFieldTemplate.setGearDdocumenttype(null);
        return this;
    }

    public void setGearcustomfieldtemplates(Set<GearCustomFieldTemplate> gearCustomFieldTemplates) {
        this.gearcustomfieldtemplates = gearCustomFieldTemplates;
    }

    public GearDomain getGeardomain() {
        return geardomain;
    }

    public GearDocumentType geardomain(GearDomain gearDomain) {
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
        GearDocumentType gearDocumentType = (GearDocumentType) o;
        if (gearDocumentType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearDocumentType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearDocumentType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
