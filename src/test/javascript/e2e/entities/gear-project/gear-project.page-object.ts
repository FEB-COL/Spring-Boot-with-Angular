import { element, by, ElementFinder } from 'protractor';

export class GearProjectComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-project div table .btn-danger'));
    title = element.all(by.css('jhi-gear-project div h2#page-heading span')).first();

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

export class GearProjectUpdatePage {
    pageTitle = element(by.id('jhi-gear-project-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    descriptionInput = element(by.id('field_description'));
    budgetInput = element(by.id('field_budget'));
    percentageCompletedInput = element(by.id('field_percentageCompleted'));
    spendInput = element(by.id('field_spend'));
    startDateInput = element(by.id('field_startDate'));
    endDateInput = element(by.id('field_endDate'));
    attachInput = element(by.id('field_attach'));
    createdByInput = element(by.id('field_createdBy'));
    creationDateInput = element(by.id('field_creationDate'));
    lastModifiedByInput = element(by.id('field_lastModifiedBy'));
    lastModifiedDateInput = element(by.id('field_lastModifiedDate'));
    gearIterationSelect = element(by.id('field_gearIteration'));
    gearPortfolioSelect = element(by.id('field_gearPortfolio'));

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

    async setBudgetInput(budget) {
        await this.budgetInput.sendKeys(budget);
    }

    async getBudgetInput() {
        return this.budgetInput.getAttribute('value');
    }

    async setPercentageCompletedInput(percentageCompleted) {
        await this.percentageCompletedInput.sendKeys(percentageCompleted);
    }

    async getPercentageCompletedInput() {
        return this.percentageCompletedInput.getAttribute('value');
    }

    async setSpendInput(spend) {
        await this.spendInput.sendKeys(spend);
    }

    async getSpendInput() {
        return this.spendInput.getAttribute('value');
    }

    async setStartDateInput(startDate) {
        await this.startDateInput.sendKeys(startDate);
    }

    async getStartDateInput() {
        return this.startDateInput.getAttribute('value');
    }

    async setEndDateInput(endDate) {
        await this.endDateInput.sendKeys(endDate);
    }

    async getEndDateInput() {
        return this.endDateInput.getAttribute('value');
    }

    async setAttachInput(attach) {
        await this.attachInput.sendKeys(attach);
    }

    async getAttachInput() {
        return this.attachInput.getAttribute('value');
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

    async gearIterationSelectLastOption() {
        await this.gearIterationSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async gearIterationSelectOption(option) {
        await this.gearIterationSelect.sendKeys(option);
    }

    getGearIterationSelect(): ElementFinder {
        return this.gearIterationSelect;
    }

    async getGearIterationSelectedOption() {
        return this.gearIterationSelect.element(by.css('option:checked')).getText();
    }

    async gearPortfolioSelectLastOption() {
        await this.gearPortfolioSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async gearPortfolioSelectOption(option) {
        await this.gearPortfolioSelect.sendKeys(option);
    }

    getGearPortfolioSelect(): ElementFinder {
        return this.gearPortfolioSelect;
    }

    async getGearPortfolioSelectedOption() {
        return this.gearPortfolioSelect.element(by.css('option:checked')).getText();
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

export class GearProjectDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearProject-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearProject'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
