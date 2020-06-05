import { element, by, ElementFinder } from 'protractor';

export class GearDomainComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-domain div table .btn-danger'));
    title = element.all(by.css('jhi-gear-domain div h2#page-heading span')).first();

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

export class GearDomainUpdatePage {
    pageTitle = element(by.id('jhi-gear-domain-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    domainIdInput = element(by.id('field_domainId'));
    companyIdInput = element(by.id('field_companyId'));
    companyDescriptionInput = element(by.id('field_companyDescription'));
    siteIdInput = element(by.id('field_siteId'));
    jhiStorageInput = element(by.id('field_jhiStorage'));
    storageUsedInput = element(by.id('field_storageUsed'));
    levelMaturityInput = element(by.id('field_levelMaturity'));
    totalWikiInput = element(by.id('field_totalWiki'));
    totalFileFinalVersionInput = element(by.id('field_totalFileFinalVersion'));
    totalFileDraftInput = element(by.id('field_totalFileDraft'));
    totalFileUploadInput = element(by.id('field_totalFileUpload'));
    gearOrganizationalUnitSelect = element(by.id('field_gearOrganizationalUnit'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setDomainIdInput(domainId) {
        await this.domainIdInput.sendKeys(domainId);
    }

    async getDomainIdInput() {
        return this.domainIdInput.getAttribute('value');
    }

    async setCompanyIdInput(companyId) {
        await this.companyIdInput.sendKeys(companyId);
    }

    async getCompanyIdInput() {
        return this.companyIdInput.getAttribute('value');
    }

    async setCompanyDescriptionInput(companyDescription) {
        await this.companyDescriptionInput.sendKeys(companyDescription);
    }

    async getCompanyDescriptionInput() {
        return this.companyDescriptionInput.getAttribute('value');
    }

    async setSiteIdInput(siteId) {
        await this.siteIdInput.sendKeys(siteId);
    }

    async getSiteIdInput() {
        return this.siteIdInput.getAttribute('value');
    }

    async setJhiStorageInput(jhiStorage) {
        await this.jhiStorageInput.sendKeys(jhiStorage);
    }

    async getJhiStorageInput() {
        return this.jhiStorageInput.getAttribute('value');
    }

    async setStorageUsedInput(storageUsed) {
        await this.storageUsedInput.sendKeys(storageUsed);
    }

    async getStorageUsedInput() {
        return this.storageUsedInput.getAttribute('value');
    }

    async setLevelMaturityInput(levelMaturity) {
        await this.levelMaturityInput.sendKeys(levelMaturity);
    }

    async getLevelMaturityInput() {
        return this.levelMaturityInput.getAttribute('value');
    }

    async setTotalWikiInput(totalWiki) {
        await this.totalWikiInput.sendKeys(totalWiki);
    }

    async getTotalWikiInput() {
        return this.totalWikiInput.getAttribute('value');
    }

    async setTotalFileFinalVersionInput(totalFileFinalVersion) {
        await this.totalFileFinalVersionInput.sendKeys(totalFileFinalVersion);
    }

    async getTotalFileFinalVersionInput() {
        return this.totalFileFinalVersionInput.getAttribute('value');
    }

    async setTotalFileDraftInput(totalFileDraft) {
        await this.totalFileDraftInput.sendKeys(totalFileDraft);
    }

    async getTotalFileDraftInput() {
        return this.totalFileDraftInput.getAttribute('value');
    }

    async setTotalFileUploadInput(totalFileUpload) {
        await this.totalFileUploadInput.sendKeys(totalFileUpload);
    }

    async getTotalFileUploadInput() {
        return this.totalFileUploadInput.getAttribute('value');
    }

    async gearOrganizationalUnitSelectLastOption() {
        await this.gearOrganizationalUnitSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async gearOrganizationalUnitSelectOption(option) {
        await this.gearOrganizationalUnitSelect.sendKeys(option);
    }

    getGearOrganizationalUnitSelect(): ElementFinder {
        return this.gearOrganizationalUnitSelect;
    }

    async getGearOrganizationalUnitSelectedOption() {
        return this.gearOrganizationalUnitSelect.element(by.css('option:checked')).getText();
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

export class GearDomainDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearDomain-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearDomain'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
