import { element, by, ElementFinder } from 'protractor';

export class GearPortfolioComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-portfolio div table .btn-danger'));
    title = element.all(by.css('jhi-gear-portfolio div h2#page-heading span')).first();

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

export class GearPortfolioUpdatePage {
    pageTitle = element(by.id('jhi-gear-portfolio-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    descriptionInput = element(by.id('field_description'));
    startDateInput = element(by.id('field_startDate'));
    createdByInput = element(by.id('field_createdBy'));
    creationDateInput = element(by.id('field_creationDate'));
    lastModifiedByInput = element(by.id('field_lastModifiedBy'));
    lastModifiedDateInput = element(by.id('field_lastModifiedDate'));
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

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setStartDateInput(startDate) {
        await this.startDateInput.sendKeys(startDate);
    }

    async getStartDateInput() {
        return this.startDateInput.getAttribute('value');
    }

    async setCreatedByInput(createdBy) {
        await this.createdByInput.sendKeys(createdBy);
    }

    async getCreatedByInput() {
        return this.createdByInput.getAttribute('value');
    }

    async setCreationDateInput(creationDate) {
        await this.creationDateInput.sendKeys(creationDate);
    }

    async getCreationDateInput() {
        return this.creationDateInput.getAttribute('value');
    }

    async setLastModifiedByInput(lastModifiedBy) {
        await this.lastModifiedByInput.sendKeys(lastModifiedBy);
    }

    async getLastModifiedByInput() {
        return this.lastModifiedByInput.getAttribute('value');
    }

    async setLastModifiedDateInput(lastModifiedDate) {
        await this.lastModifiedDateInput.sendKeys(lastModifiedDate);
    }

    async getLastModifiedDateInput() {
        return this.lastModifiedDateInput.getAttribute('value');
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

export class GearPortfolioDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearPortfolio-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearPortfolio'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
