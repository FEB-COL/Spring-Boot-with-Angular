package co.fuziontek.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A GearLibrary.
 */
@Entity
@Table(name = "gear_library")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearLibrary implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_file")
    private String idFile;

    @Column(name = "document_name")
    private String documentName;

    @Column(name = "document_domain")
    private String documentDomain;

    @Column(name = "document_title")
    private String documentTitle;

    @Column(name = "document_type")
    private String documentType;

    @Column(name = "document_description")
    private String documentDescription;

    @Column(name = "document_is_copy")
    private Boolean documentIsCopy;

    @Column(name = "document_is_draft")
    private Boolean documentIsDraft;

    @Column(name = "label_field")
    private String labelField;

    @Column(name = "type_field")
    private String typeField;

    @Column(name = "propertie_name")
    private String propertieName;

    @Column(name = "document_id_alfresco")
    private String documentIdAlfresco;

    @Column(name = "folder_id_alfresco")
    private String folderIdAlfresco;

    @Column(name = "name_folder_alfresco")
    private String nameFolderAlfresco;

    @Column(name = "site_id_alfresco")
    private String siteIdAlfresco;

    @Column(name = "name_site_alfresco")
    private String nameSiteAlfresco;

    @Column(name = "value_field")
    private String valueField;

    @Column(name = "custom_field_id")
    private Long customFieldId;

    @Column(name = "template_id")
    private Long templateId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdFile() {
        return idFile;
    }

    public GearLibrary idFile(String idFile) {
        this.idFile = idFile;
        return this;
    }

    public void setIdFile(String idFile) {
        this.idFile = idFile;
    }

    public String getDocumentName() {
        return documentName;
    }

    public GearLibrary documentName(String documentName) {
        this.documentName = documentName;
        return this;
    }

    public void setDocumentName(String documentName) {
        this.documentName = documentName;
    }

    public String getDocumentDomain() {
        return documentDomain;
    }

    public GearLibrary documentDomain(String documentDomain) {
        this.documentDomain = documentDomain;
        return this;
    }

    public void setDocumentDomain(String documentDomain) {
        this.documentDomain = documentDomain;
    }

    public String getDocumentTitle() {
        return documentTitle;
    }

    public GearLibrary documentTitle(String documentTitle) {
        this.documentTitle = documentTitle;
        return this;
    }

    public void setDocumentTitle(String documentTitle) {
        this.documentTitle = documentTitle;
    }

    public String getDocumentType() {
        return documentType;
    }

    public GearLibrary documentType(String documentType) {
        this.documentType = documentType;
        return this;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public String getDocumentDescription() {
        return documentDescription;
    }

    public GearLibrary documentDescription(String documentDescription) {
        this.documentDescription = documentDescription;
        return this;
    }

    public void setDocumentDescription(String documentDescription) {
        this.documentDescription = documentDescription;
    }

    public Boolean isDocumentIsCopy() {
        return documentIsCopy;
    }

    public GearLibrary documentIsCopy(Boolean documentIsCopy) {
        this.documentIsCopy = documentIsCopy;
        return this;
    }

    public void setDocumentIsCopy(Boolean documentIsCopy) {
        this.documentIsCopy = documentIsCopy;
    }

    public Boolean isDocumentIsDraft() {
        return documentIsDraft;
    }

    public GearLibrary documentIsDraft(Boolean documentIsDraft) {
        this.documentIsDraft = documentIsDraft;
        return this;
    }

    public void setDocumentIsDraft(Boolean documentIsDraft) {
        this.documentIsDraft = documentIsDraft;
    }

    public String getLabelField() {
        return labelField;
    }

    public GearLibrary labelField(String labelField) {
        this.labelField = labelField;
        return this;
    }

    public void setLabelField(String labelField) {
        this.labelField = labelField;
    }

    public String getTypeField() {
        return typeField;
    }

    public GearLibrary typeField(String typeField) {
        this.typeField = typeField;
        return this;
    }

    public void setTypeField(String typeField) {
        this.typeField = typeField;
    }

    public String getPropertieName() {
        return propertieName;
    }

    public GearLibrary propertieName(String propertieName) {
        this.propertieName = propertieName;
        return this;
    }

    public void setPropertieName(String propertieName) {
        this.propertieName = propertieName;
    }

    public String getDocumentIdAlfresco() {
        return documentIdAlfresco;
    }

    public GearLibrary documentIdAlfresco(String documentIdAlfresco) {
        this.documentIdAlfresco = documentIdAlfresco;
        return this;
    }

    public void setDocumentIdAlfresco(String documentIdAlfresco) {
        this.documentIdAlfresco = documentIdAlfresco;
    }

    public String getFolderIdAlfresco() {
        return folderIdAlfresco;
    }

    public GearLibrary folderIdAlfresco(String folderIdAlfresco) {
        this.folderIdAlfresco = folderIdAlfresco;
        return this;
    }

    public void setFolderIdAlfresco(String folderIdAlfresco) {
        this.folderIdAlfresco = folderIdAlfresco;
    }

    public String getNameFolderAlfresco() {
        return nameFolderAlfresco;
    }

    public GearLibrary nameFolderAlfresco(String nameFolderAlfresco) {
        this.nameFolderAlfresco = nameFolderAlfresco;
        return this;
    }

    public void setNameFolderAlfresco(String nameFolderAlfresco) {
        this.nameFolderAlfresco = nameFolderAlfresco;
    }

    public String getSiteIdAlfresco() {
        return siteIdAlfresco;
    }

    public GearLibrary siteIdAlfresco(String siteIdAlfresco) {
        this.siteIdAlfresco = siteIdAlfresco;
        return this;
    }

    public void setSiteIdAlfresco(String siteIdAlfresco) {
        this.siteIdAlfresco = siteIdAlfresco;
    }

    public String getNameSiteAlfresco() {
        return nameSiteAlfresco;
    }

    public GearLibrary nameSiteAlfresco(String nameSiteAlfresco) {
        this.nameSiteAlfresco = nameSiteAlfresco;
        return this;
    }

    public void setNameSiteAlfresco(String nameSiteAlfresco) {
        this.nameSiteAlfresco = nameSiteAlfresco;
    }

    public String getValueField() {
        return valueField;
    }

    public GearLibrary valueField(String valueField) {
        this.valueField = valueField;
        return this;
    }

    public void setValueField(String valueField) {
        this.valueField = valueField;
    }

    public Long getCustomFieldId() {
        return customFieldId;
    }

    public GearLibrary customFieldId(Long customFieldId) {
        this.customFieldId = customFieldId;
        return this;
    }

    public void setCustomFieldId(Long customFieldId) {
        this.customFieldId = customFieldId;
    }

    public Long getTemplateId() {
        return templateId;
    }

    public GearLibrary templateId(Long templateId) {
        this.templateId = templateId;
        return this;
    }

    public void setTemplateId(Long templateId) {
        this.templateId = templateId;
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
        GearLibrary gearLibrary = (GearLibrary) o;
        if (gearLibrary.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearLibrary.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearLibrary{" +
            "id=" + getId() +
            ", idFile='" + getIdFile() + "'" +
            ", documentName='" + getDocumentName() + "'" +
            ", documentDomain='" + getDocumentDomain() + "'" +
            ", documentTitle='" + getDocumentTitle() + "'" +
            ", documentType='" + getDocumentType() + "'" +
            ", documentDescription='" + getDocumentDescription() + "'" +
            ", documentIsCopy='" + isDocumentIsCopy() + "'" +
            ", documentIsDraft='" + isDocumentIsDraft() + "'" +
            ", labelField='" + getLabelField() + "'" +
            ", typeField='" + getTypeField() + "'" +
            ", propertieName='" + getPropertieName() + "'" +
            ", documentIdAlfresco='" + getDocumentIdAlfresco() + "'" +
            ", folderIdAlfresco='" + getFolderIdAlfresco() + "'" +
            ", nameFolderAlfresco='" + getNameFolderAlfresco() + "'" +
            ", siteIdAlfresco='" + getSiteIdAlfresco() + "'" +
            ", nameSiteAlfresco='" + getNameSiteAlfresco() + "'" +
            ", valueField='" + getValueField() + "'" +
            ", customFieldId=" + getCustomFieldId() +
            ", templateId=" + getTemplateId() +
            "}";
    }
}
