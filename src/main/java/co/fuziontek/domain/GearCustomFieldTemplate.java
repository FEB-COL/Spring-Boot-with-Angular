package co.fuziontek.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A GearCustomFieldTemplate.
 */
@Entity
@Table(name = "gear_custom_field_template")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearCustomFieldTemplate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "label_field")
    private String labelField;

    @Column(name = "default_value")
    private String defaultValue;

    @Column(name = "field_type")
    private Integer fieldType;

    @Column(name = "list_options")
    private String listOptions;

    @ManyToOne
    @JsonIgnoreProperties("gearcustomfieldtemplates")
    private GearDocumentType gearDdocumenttype;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabelField() {
        return labelField;
    }

    public GearCustomFieldTemplate labelField(String labelField) {
        this.labelField = labelField;
        return this;
    }

    public void setLabelField(String labelField) {
        this.labelField = labelField;
    }

    public String getDefaultValue() {
        return defaultValue;
    }

    public GearCustomFieldTemplate defaultValue(String defaultValue) {
        this.defaultValue = defaultValue;
        return this;
    }

    public void setDefaultValue(String defaultValue) {
        this.defaultValue = defaultValue;
    }

    public Integer getFieldType() {
        return fieldType;
    }

    public GearCustomFieldTemplate fieldType(Integer fieldType) {
        this.fieldType = fieldType;
        return this;
    }

    public void setFieldType(Integer fieldType) {
        this.fieldType = fieldType;
    }

    public String getListOptions() {
        return listOptions;
    }

    public GearCustomFieldTemplate listOptions(String listOptions) {
        this.listOptions = listOptions;
        return this;
    }

    public void setListOptions(String listOptions) {
        this.listOptions = listOptions;
    }

    public GearDocumentType getGearDdocumenttype() {
        return gearDdocumenttype;
    }

    public GearCustomFieldTemplate gearDdocumenttype(GearDocumentType gearDocumentType) {
        this.gearDdocumenttype = gearDocumentType;
        return this;
    }

    public void setGearDdocumenttype(GearDocumentType gearDocumentType) {
        this.gearDdocumenttype = gearDocumentType;
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
        GearCustomFieldTemplate gearCustomFieldTemplate = (GearCustomFieldTemplate) o;
        if (gearCustomFieldTemplate.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearCustomFieldTemplate.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearCustomFieldTemplate{" +
            "id=" + getId() +
            ", labelField='" + getLabelField() + "'" +
            ", defaultValue='" + getDefaultValue() + "'" +
            ", fieldType=" + getFieldType() +
            ", listOptions='" + getListOptions() + "'" +
            "}";
    }
}
