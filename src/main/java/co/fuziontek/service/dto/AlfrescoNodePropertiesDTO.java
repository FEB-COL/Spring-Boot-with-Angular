package co.fuziontek.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the AlfrescoNodeProperties entity.
 */
public class AlfrescoNodePropertiesDTO implements Serializable {

    private Long id;

    private String documentType;

    private String documentTitle;

    private String fileName;

    private String siteId;

    private String description;

    private String notes;

    private String versionType;

    private String versionLabel;

    private String textField1;

    private String textField2;

    private String textField3;

    private String textField4;

    private String textField5;

    private String textField6;

    private String textField7;

    private Long alfrescoNodeId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public String getDocumentTitle() {
        return documentTitle;
    }

    public void setDocumentTitle(String documentTitle) {
        this.documentTitle = documentTitle;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getSiteId() {
        return siteId;
    }

    public void setSiteId(String siteId) {
        this.siteId = siteId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getVersionType() {
        return versionType;
    }

    public void setVersionType(String versionType) {
        this.versionType = versionType;
    }

    public String getVersionLabel() {
        return versionLabel;
    }

    public void setVersionLabel(String versionLabel) {
        this.versionLabel = versionLabel;
    }

    public String getTextField1() {
        return textField1;
    }

    public void setTextField1(String textField1) {
        this.textField1 = textField1;
    }

    public String getTextField2() {
        return textField2;
    }

    public void setTextField2(String textField2) {
        this.textField2 = textField2;
    }

    public String getTextField3() {
        return textField3;
    }

    public void setTextField3(String textField3) {
        this.textField3 = textField3;
    }

    public String getTextField4() {
        return textField4;
    }

    public void setTextField4(String textField4) {
        this.textField4 = textField4;
    }

    public String getTextField5() {
        return textField5;
    }

    public void setTextField5(String textField5) {
        this.textField5 = textField5;
    }

    public String getTextField6() {
        return textField6;
    }

    public void setTextField6(String textField6) {
        this.textField6 = textField6;
    }

    public String getTextField7() {
        return textField7;
    }

    public void setTextField7(String textField7) {
        this.textField7 = textField7;
    }

    public Long getAlfrescoNodeId() {
        return alfrescoNodeId;
    }

    public void setAlfrescoNodeId(Long afrescoNodeId) {
        this.alfrescoNodeId = afrescoNodeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AlfrescoNodePropertiesDTO alfrescoNodePropertiesDTO = (AlfrescoNodePropertiesDTO) o;
        if (alfrescoNodePropertiesDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), alfrescoNodePropertiesDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AlfrescoNodePropertiesDTO{" +
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
            ", alfrescoNode=" + getAlfrescoNodeId() +
            "}";
    }
}
