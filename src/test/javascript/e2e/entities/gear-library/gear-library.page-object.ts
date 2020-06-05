import { element, by, ElementFinder } from 'protractor';

export class GearLibraryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-library div table .btn-danger'));
    title = element.all(by.css('jhi-gear-library div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class GearLibraryUpdatePage {
    pageTitle = element(by.id('jhi-gear-library-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    idFileInput = element(by.id('field_idFile'));
    documentNameInput = element(by.id('field_documentName'));
    documentDomainInput = element(by.id('field_documentDomain'));
    documentTitleInput = element(by.id('field_documentTitle'));
    documentTypeInput = element(by.id('field_documentType'));
    documentDescriptionInput = element(by.id('field_documentDescription'));
    documentIsCopyInput = element(by.id('field_documentIsCopy'));
    documentIsDraftInput = element(by.id('field_documentIsDraft'));
    labelFieldInput = element(by.id('field_labelField'));
    typeFieldInput = element(by.id('field_typeField'));
    propertieNameInput = element(by.id('field_propertieName'));
    documentIdAlfrescoInput = element(by.id('field_documentIdAlfresco'));
    folderIdAlfrescoInput = element(by.id('field_folderIdAlfresco'));
    nameFolderAlfrescoInput = element(by.id('field_nameFolderAlfresco'));
    siteIdAlfrescoInput = element(by.id('field_siteIdAlfresco'));
    nameSiteAlfrescoInput = element(by.id('field_nameSiteAlfresco'));
    valueFieldInput = element(by.id('field_valueField'));
    customFieldIdInput = element(by.id('field_customFieldId'));
    templateIdInput = element(by.id('field_templateId'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setIdFileInput(idFile) {
        await this.idFileInput.sendKeys(idFile);
    }

    async getIdFileInput() {
        return this.idFileInput.getAttribute('value');
    }

    async setDocumentNameInput(documentName) {
        await this.documentNameInput.sendKeys(documentName);
    }

    async getDocumentNameInput() {
        return this.documentNameInput.getAttribute('value');
    }

    async setDocumentDomainInput(documentDomain) {
        await this.documentDomainInput.sendKeys(documentDomain);
    }

    async getDocumentDomainInput() {
        return this.documentDomainInput.getAttribute('value');
    }

    async setDocumentTitleInput(documentTitle) {
        await this.documentTitleInput.sendKeys(documentTitle);
    }

    async getDocumentTitleInput() {
        return this.documentTitleInput.getAttribute('value');
    }

    async setDocumentTypeInput(documentType) {
        await this.documentTypeInput.sendKeys(documentType);
    }

    async getDocumentTypeInput() {
        return this.documentTypeInput.getAttribute('value');
    }

    async setDocumentDescriptionInput(documentDescription) {
        await this.documentDescriptionInput.sendKeys(documentDescription);
    }

    async getDocumentDescriptionInput() {
        return this.documentDescriptionInput.getAttribute('value');
    }

    getDocumentIsCopyInput() {
        return this.documentIsCopyInput;
    }
    getDocumentIsDraftInput() {
        return this.documentIsDraftInput;
    }
    async setLabelFieldInput(labelField) {
        await this.labelFieldInput.sendKeys(labelField);
    }

    async getLabelFieldInput() {
        return this.labelFieldInput.getAttribute('value');
    }

    async setTypeFieldInput(typeField) {
        await this.typeFieldInput.sendKeys(typeField);
    }

    async getTypeFieldInput() {
        return this.typeFieldInput.getAttribute('value');
    }

    async setPropertieNameInput(propertieName) {
        await this.propertieNameInput.sendKeys(propertieName);
    }

    async getPropertieNameInput() {
        return this.propertieNameInput.getAttribute('value');
    }

    async setDocumentIdAlfrescoInput(documentIdAlfresco) {
        await this.documentIdAlfrescoInput.sendKeys(documentIdAlfresco);
    }

    async getDocumentIdAlfrescoInput() {
        return this.documentIdAlfrescoInput.getAttribute('value');
    }

    async setFolderIdAlfrescoInput(folderIdAlfresco) {
        await this.folderIdAlfrescoInput.sendKeys(folderIdAlfresco);
    }

    async getFolderIdAlfrescoInput() {
        return this.folderIdAlfrescoInput.getAttribute('value');
    }

    async setNameFolderAlfrescoInput(nameFolderAlfresco) {
        await this.nameFolderAlfrescoInput.sendKeys(nameFolderAlfresco);
    }

    async getNameFolderAlfrescoInput() {
        return this.nameFolderAlfrescoInput.getAttribute('value');
    }

    async setSiteIdAlfrescoInput(siteIdAlfresco) {
        await this.siteIdAlfrescoInput.sendKeys(siteIdAlfresco);
    }

    async getSiteIdAlfrescoInput() {
        return this.siteIdAlfrescoInput.getAttribute('value');
    }

    async setNameSiteAlfrescoInput(nameSiteAlfresco) {
        await this.nameSiteAlfrescoInput.sendKeys(nameSiteAlfresco);
    }

    async getNameSiteAlfrescoInput() {
        return this.nameSiteAlfrescoInput.getAttribute('value');
    }

    async setValueFieldInput(valueField) {
        await this.valueFieldInput.sendKeys(valueField);
    }

    async getValueFieldInput() {
        return this.valueFieldInput.getAttribute('value');
    }

    async setCustomFieldIdInput(customFieldId) {
        await this.customFieldIdInput.sendKeys(customFieldId);
    }

    async getCustomFieldIdInput() {
        return this.customFieldIdInput.getAttribute('value');
    }

    async setTemplateIdInput(templateId) {
        await this.templateIdInput.sendKeys(templateId);
    }

    async getTemplateIdInput() {
        return this.templateIdInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class GearLibraryDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearLibrary-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearLibrary'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
