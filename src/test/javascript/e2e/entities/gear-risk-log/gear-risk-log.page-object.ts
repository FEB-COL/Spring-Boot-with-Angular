import { element, by, ElementFinder } from 'protractor';

export class GearRiskLogComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-risk-log div table .btn-danger'));
    title = element.all(by.css('jhi-gear-risk-log div h2#page-heading span')).first();

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

export class GearRiskLogUpdatePage {
    pageTitle = element(by.id('jhi-gear-risk-log-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    logInput = element(by.id('field_log'));
    dateInput = element(by.id('field_date'));
    createdByInput = element(by.id('field_createdBy'));
    creationDateInput = element(by.id('field_creationDate'));
    lastModifiedByInput = element(by.id('field_lastModifiedBy'));
    lastModifiedDateInput = element(by.id('field_lastModifiedDate'));
    gearProjectRiskSelect = element(by.id('field_gearProjectRisk'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setLogInput(log) {
        await this.logInput.sendKeys(log);
    }

    async getLogInput() {
        return this.logInput.getAttribute('value');
    }

    async setDateInput(date) {
        await this.dateInput.sendKeys(date);
    }

    async getDateInput() {
        return this.dateInput.getAttribute('value');
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

    async gearProjectRiskSelectLastOption() {
        await this.gearProjectRiskSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async gearProjectRiskSelectOption(option) {
        await this.gearProjectRiskSelect.sendKeys(option);
    }

    getGearProjectRiskSelect(): ElementFinder {
        return this.gearProjectRiskSelect;
    }

    async getGearProjectRiskSelectedOption() {
        return this.gearProjectRiskSelect.element(by.css('option:checked')).getText();
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

export class GearRiskLogDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearRiskLog-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearRiskLog'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
