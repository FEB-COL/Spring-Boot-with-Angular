package co.fuziontek.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Created by JuanPablo on 08/06/2017.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class FileUploadDto {

    private String documentName;
    private String documentDomain;
    private String documentTitle;
    private String documentType;
    private String documentDescription;
    private Boolean documentIsCopy;
    private Boolean documentIsDraft;
    private String labelField;

    private String typeField;

    private String propertieName;

    private String nodeId;

    private String valueField;

    private Long customFieldId;
    private Long templateId;


    public String getDocumentName() {
        return documentName;
    }

    public void setDocumentName(String documentName) {
        this.documentName = documentName;
    }

    public String getDocumentDomain() {
        return documentDomain;
    }

    public void setDocumentDomain(String documentDomain) {
        this.documentDomain = documentDomain;
    }

    public String getDocumentTitle() {
        return documentTitle;
    }

    public void setDocumentTitle(String documentTitle) {
        this.documentTitle = documentTitle;
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public String getDocumentDescription() {
        return documentDescription;
    }

    public void setDocumentDescription(String documentDescription) {
        this.documentDescription = documentDescription;
    }

    public Boolean getDocumentIsCopy() {
        return documentIsCopy;
    }

    public void setDocumentIsCopy(Boolean documentIsCopy) {
        this.documentIsCopy = documentIsCopy;
    }

    public String getLabelField() {
        return labelField;
    }

    public void setLabelField(String labelField) {
        this.labelField = labelField;
    }

    public String getTypeField() {
        return typeField;
    }

    public void setTypeField(String typeField) {
        this.typeField = typeField;
    }

    public String getPropertieName() {
        return propertieName;
    }

    public void setPropertieName(String propertieName) {
        this.propertieName = propertieName;
    }

    public Boolean getDocumentIsDraft() {
        return documentIsDraft;
    }

    public void setDocumentIsDraft(Boolean documentIsDraft) {
        this.documentIsDraft = documentIsDraft;
    }

    public String getNodeId() {
        return nodeId;
    }

    public void setNodeId(String nodeId) {
        this.nodeId = nodeId;
    }

    public String getValueField() {
        return valueField;
    }

    public void setValueField(String valueField) {
        this.valueField = valueField;
    }

    public Long getCustomFieldId() {
        return customFieldId;
    }

    public void setCustomFieldId(Long customFieldId) {
        this.customFieldId = customFieldId;
    }

    public Long getTemplateId() {
        return templateId;
    }

    public void setTemplateId(Long templateId) {
        this.templateId = templateId;
    }
}
