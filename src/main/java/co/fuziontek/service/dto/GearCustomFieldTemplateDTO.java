package co.fuziontek.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the GearCustomFieldTemplate entity.
 */
public class GearCustomFieldTemplateDTO implements Serializable {

    private Long id;

    private String labelField;

    private String defaultValue;

    private Integer fieldType;

    private String listOptions;

    private Long gearDdocumenttypeId;

    private String gearDdocumenttypeName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabelField() {
        return labelField;
    }

    public void setLabelField(String labelField) {
        this.labelField = labelField;
    }

    public String getDefaultValue() {
        return defaultValue;
    }

    public void setDefaultValue(String defaultValue) {
        this.defaultValue = defaultValue;
    }

    public Integer getFieldType() {
        return fieldType;
    }

    public void setFieldType(Integer fieldType) {
        this.fieldType = fieldType;
    }

    public String getListOptions() {
        return listOptions;
    }

    public void setListOptions(String listOptions) {
        this.listOptions = listOptions;
    }

    public Long getGearDdocumenttypeId() {
        return gearDdocumenttypeId;
    }

    public void setGearDdocumenttypeId(Long gearDocumentTypeId) {
        this.gearDdocumenttypeId = gearDocumentTypeId;
    }

    public String getGearDdocumenttypeName() {
        return gearDdocumenttypeName;
    }

    public void setGearDdocumenttypeName(String gearDdocumenttypeName) {
        this.gearDdocumenttypeName = gearDdocumenttypeName;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GearCustomFieldTemplateDTO gearCustomFieldTemplateDTO = (GearCustomFieldTemplateDTO) o;
        if (gearCustomFieldTemplateDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearCustomFieldTemplateDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearCustomFieldTemplateDTO{" +
            "id=" + getId() +
            ", labelField='" + getLabelField() + "'" +
            ", defaultValue='" + getDefaultValue() + "'" +
            ", fieldType=" + getFieldType() +
            ", listOptions='" + getListOptions() + "'" +
            ", gearDdocumenttype=" + getGearDdocumenttypeId() +
            "}";
    }
}
