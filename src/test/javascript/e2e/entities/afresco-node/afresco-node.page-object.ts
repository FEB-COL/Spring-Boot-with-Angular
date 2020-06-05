import { element, by, ElementFinder } from 'protractor';

export class AfrescoNodeComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-afresco-node div table .btn-danger'));
    title = element.all(by.css('jhi-afresco-node div h2#page-heading span')).first();

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

export class AfrescoNodeUpdatePage {
    pageTitle = element(by.id('jhi-afresco-node-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    createdAtInput = element(by.id('field_createdAt'));
    modifiedAtInput = element(by.id('field_modifiedAt'));
    nameInput = element(by.id('field_name'));
    locationInput = element(by.id('field_location'));
    nTypeInput = element(by.id('field_nType'));
    parentIdInput = element(by.id('field_parentId'));
    alfrescoSiteSelect = element(by.id('field_alfrescoSite'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setCreatedAtInput(createdAt) {
        await this.createdAtInput.sendKeys(createdAt);
    }

    async getCreatedAtInput() {
        return this.createdAtInput.getAttribute('value');
    }

    async setModifiedAtInput(modifiedAt) {
        await this.modifiedAtInput.sendKeys(modifiedAt);
    }

    async getModifiedAtInput() {
        return this.modifiedAtInput.getAttribute('value');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setLocationInput(location) {
        await this.locationInput.sendKeys(location);
    }

    async getLocationInput() {
        return this.locationInput.getAttribute('value');
    }

    async setNTypeInput(nType) {
        await this.nTypeInput.sendKeys(nType);
    }

    async getNTypeInput() {
        return this.nTypeInput.getAttribute('value');
    }

    async setParentIdInput(parentId) {
        await this.parentIdInput.sendKeys(parentId);
    }

    async getParentIdInput() {
        return this.parentIdInput.getAttribute('value');
    }

    async alfrescoSiteSelectLastOption() {
        await this.alfrescoSiteSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async alfrescoSiteSelectOption(option) {
        await this.alfrescoSiteSelect.sendKeys(option);
    }

    getAlfrescoSiteSelect(): ElementFinder {
        return this.alfrescoSiteSelect;
    }

    async getAlfrescoSiteSelectedOption() {
        return this.alfrescoSiteSelect.element(by.css('option:checked')).getText();
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

export class AfrescoNodeDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-afrescoNode-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-afrescoNode'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
