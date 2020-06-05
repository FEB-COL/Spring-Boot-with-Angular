package co.fuziontek.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A AlfrescoNodeProperties.
 */
@Entity
@Table(name = "alfresco_node_properties")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AlfrescoNodeProperties implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "document_type")
    private String documentType;

    @Column(name = "document_title")
    private String documentTitle;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "site_id")
    private String siteId;

    @Column(name = "description")
    private String description;

    @Column(name = "notes")
    private String notes;

    @Column(name = "version_type")
    private String versionType;

    @Column(name = "version_label")
    private String versionLabel;

    @Column(name = "text_field_1")
    private String textField1;

    @Column(name = "text_field_2")
    private String textField2;

    @Column(name = "text_field_3")
    private String textField3;

    @Column(name = "text_field_4")
    private String textField4;

    @Column(name = "text_field_5")
    private String textField5;

    @Column(name = "text_field_6")
    private String textField6;

    @Column(name = "text_field_7")
    private String textField7;

    @ManyToOne
    @JsonIgnoreProperties("alfrescoProperties")
    private AfrescoNode alfrescoNode;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDocumentType() {
        return documentType;
    }

    public AlfrescoNodeProperties documentType(String documentType) {
        this.documentType = documentType;
        return this;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public String getDocumentTitle() {
        return documentTitle;
    }

    public AlfrescoNodeProperties documentTitle(String documentTitle) {
        this.documentTitle = documentTitle;
        return this;
    }

    public void setDocumentTitle(String documentTitle) {
        this.documentTitle = documentTitle;
    }

    public String getFileName() {
        return fileName;
    }

    public AlfrescoNodeProperties fileName(String fileName) {
        this.fileName = fileName;
        return this;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getSiteId() {
        return siteId;
    }

    public AlfrescoNodeProperties siteId(String siteId) {
        this.siteId = siteId;
        return this;
    }

    public void setSiteId(String siteId) {
        this.siteId = siteId;
    }

    public String getDescription() {
        return description;
    }

    public AlfrescoNodeProperties description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNotes() {
        return notes;
    }

    public AlfrescoNodeProperties notes(String notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getVersionType() {
        return versionType;
    }

    public AlfrescoNodeProperties versionType(String versionType) {
        this.versionType = versionType;
        return this;
    }

    public void setVersionType(String versionType) {
        this.versionType = versionType;
    }

    public String getVersionLabel() {
        return versionLabel;
    }

    public AlfrescoNodeProperties versionLabel(String versionLabel) {
        this.versionLabel = versionLabel;
        return this;
    }

    public void setVersionLabel(String versionLabel) {
        this.versionLabel = versionLabel;
    }

    public String getTextField1() {
        return textField1;
    }

    public AlfrescoNodeProperties textField1(String textField1) {
        this.textField1 = textField1;
        return this;
    }

    public void setTextField1(String textField1) {
        this.textField1 = textField1;
    }

    public String getTextField2() {
        return textField2;
    }

    public AlfrescoNodeProperties textField2(String textField2) {
        this.textField2 = textField2;
        return this;
    }

    public void setTextField2(String textField2) {
        this.textField2 = textField2;
    }

    public String getTextField3() {
        return textField3;
    }

    public AlfrescoNodeProperties textField3(String textField3) {
        this.textField3 = textField3;
        return this;
    }

    public void setTextField3(String textField3) {
        this.textField3 = textField3;
    }

    public String getTextField4() {
        return textField4;
    }

    public AlfrescoNodeProperties textField4(String textField4) {
        this.textField4 = textField4;
        return this;
    }

    public void setTextField4(String textField4) {
        this.textField4 = textField4;
    }

    public String getTextField5() {
        return textField5;
    }

    public AlfrescoNodeProperties textField5(String textField5) {
        this.textField5 = textField5;
        return this;
    }

    public void setTextField5(String textField5) {
        this.textField5 = textField5;
    }

    public String getTextField6() {
        return textField6;
    }

    public AlfrescoNodeProperties textField6(String textField6) {
        this.textField6 = textField6;
        return this;
    }

    public void setTextField6(String textField6) {
        this.textField6 = textField6;
    }

    public String getTextField7() {
        return textField7;
    }

    public AlfrescoNodeProperties textField7(String textField7) {
        this.textField7 = textField7;
        return this;
    }

    public void setTextField7(String textField7) {
        this.textField7 = textField7;
    }

    public AfrescoNode getAlfrescoNode() {
        return alfrescoNode;
    }

    public AlfrescoNodeProperties alfrescoNode(AfrescoNode afrescoNode) {
        this.alfrescoNode = afrescoNode;
        return this;
    }

    public void setAlfrescoNode(AfrescoNode afrescoNode) {
        this.alfrescoNode = afrescoNode;
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
        AlfrescoNodeProperties alfrescoNodeProperties = (AlfrescoNodeProperties) o;
        if (alfrescoNodeProperties.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), alfrescoNodeProperties.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AlfrescoNodeProperties{" +
            "id=" + getId() +
            ", documentType='" + getDocumentType() + "'" +
            ", documentTitle='" + getDocumentTitle() + "'" +
            ", fileName='" + getFileName() + "'" +
            ", siteId='" + getSiteId() + "'" +
            ", description='" + getDescription() + "'" +
            ", notes='" + getNotes() + "'" +
            ", versionType='" + getVersionType() + "'" +
            ", versionLabel='" + getVersionLabel() + "'" +
            ", textField1='" + getTextField1() + "'" +
            ", textField2='" + getTextField2() + "'" +
            ", textField3='" + getTextField3() + "'" +
            ", textField4='" + getTextField4() + "'" +
            ", textField5='" + getTextField5() + "'" +
            ", textField6='" + getTextField6() + "'" +
            ", textField7='" + getTextField7() + "'" +
            "}";
    }
}
