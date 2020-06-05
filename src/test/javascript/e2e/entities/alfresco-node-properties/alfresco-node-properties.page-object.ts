import { element, by, ElementFinder } from 'protractor';

export class AlfrescoNodePropertiesComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-alfresco-node-properties div table .btn-danger'));
    title = element.all(by.css('jhi-alfresco-node-properties div h2#page-heading span')).first();

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

export class AlfrescoNodePropertiesUpdatePage {
    pageTitle = element(by.id('jhi-alfresco-node-properties-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    documentTypeInput = element(by.id('field_documentType'));
    documentTitleInput = element(by.id('field_documentTitle'));
    fileNameInput = element(by.id('field_fileName'));
    siteIdInput = element(by.id('field_siteId'));
    descriptionInput = element(by.id('field_description'));
    notesInput = element(by.id('field_notes'));
    versionTypeInput = element(by.id('field_versionType'));
    versionLabelInput = element(by.id('field_versionLabel'));
    textField1Input = element(by.id('field_textField1'));
    textField2Input = element(by.id('field_textField2'));
    textField3Input = element(by.id('field_textField3'));
    textField4Input = element(by.id('field_textField4'));
    textField5Input = element(by.id('field_textField5'));
    textField6Input = element(by.id('field_textField6'));
    textField7Input = element(by.id('field_textField7'));
    alfrescoNodeSelect = element(by.id('field_alfrescoNode'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDocumentTypeInput(documentType) {
        await this.documentTypeInput.sendKeys(documentType);
    }

    async getDocumentTypeInput() {
        return this.documentTypeInput.getAttribute('value');
    }

    async setDocumentTitleInput(documentTitle) {
        await this.documentTitleInput.sendKeys(documentTitle);
    }

    async getDocumentTitleInput() {
        return this.documentTitleInput.getAttribute('value');
    }

    async setFileNameInput(fileName) {
        await this.fileNameInput.sendKeys(fileName);
    }

    async getFileNameInput() {
        return this.fileNameInput.getAttribute('value');
    }

    async setSiteIdInput(siteId) {
        await this.siteIdInput.sendKeys(siteId);
    }

    async getSiteIdInput() {
        return this.siteIdInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setNotesInput(notes) {
        await this.notesInput.sendKeys(notes);
    }

    async getNotesInput() {
        return this.notesInput.getAttribute('value');
    }

    async setVersionTypeInput(versionType) {
        await this.versionTypeInput.sendKeys(versionType);
    }

    async getVersionTypeInput() {
        return this.versionTypeInput.getAttribute('value');
    }

    async setVersionLabelInput(versionLabel) {
        await this.versionLabelInput.sendKeys(versionLabel);
    }

    async getVersionLabelInput() {
        return this.versionLabelInput.getAttribute('value');
    }

    async setTextField1Input(textField1) {
        await this.textField1Input.sendKeys(textField1);
    }

    async getTextField1Input() {
        return this.textField1Input.getAttribute('value');
    }

    async setTextField2Input(textField2) {
        await this.textField2Input.sendKeys(textField2);
    }

    async getTextField2Input() {
        return this.textField2Input.getAttribute('value');
    }

    async setTextField3Input(textField3) {
        await this.textField3Input.sendKeys(textField3);
    }

    async getTextField3Input() {
        return this.textField3Input.getAttribute('value');
    }

    async setTextField4Input(textField4) {
        await this.textField4Input.sendKeys(textField4);
    }

    async getTextField4Input() {
        return this.textField4Input.getAttribute('value');
    }

    async setTextField5Input(textField5) {
        await this.textField5Input.sendKeys(textField5);
    }

    async getTextField5Input() {
        return this.textField5Input.getAttribute('value');
    }

    async setTextField6Input(textField6) {
        await this.textField6Input.sendKeys(textField6);
    }

    async getTextField6Input() {
        return this.textField6Input.getAttribute('value');
    }

    async setTextField7Input(textField7) {
        await this.textField7Input.sendKeys(textField7);
    }

    async getTextField7Input() {
        return this.textField7Input.getAttribute('value');
    }

    async alfrescoNodeSelectLastOption() {
        await this.alfrescoNodeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async alfrescoNodeSelectOption(option) {
        await this.alfrescoNodeSelect.sendKeys(option);
    }

    getAlfrescoNodeSelect(): ElementFinder {
        return this.alfrescoNodeSelect;
    }

    async getAlfrescoNodeSelectedOption() {
        return this.alfrescoNodeSelect.element(by.css('option:checked')).getText();
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

export class AlfrescoNodePropertiesDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-alfrescoNodeProperties-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-alfrescoNodeProperties'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
