import { element, by, ElementFinder } from 'protractor';

export class GearProjectRiskComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-project-risk div table .btn-danger'));
    title = element.all(by.css('jhi-gear-project-risk div h2#page-heading span')).first();

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

export class GearProjectRiskUpdatePage {
    pageTitle = element(by.id('jhi-gear-project-risk-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    statusInput = element(by.id('field_status'));
    impactInput = element(by.id('field_impact'));
    probabilityInput = element(by.id('field_probability'));
    descriptionInput = element(by.id('field_description'));
    firstImpactDateInput = element(by.id('field_firstImpactDate'));
    mitigationStrategyInput = element(by.id('field_mitigationStrategy'));
    mitigationDescriptionInput = element(by.id('field_mitigationDescription'));
    expectedCloseDateInput = element(by.id('field_expectedCloseDate'));
    createdByInput = element(by.id('field_createdBy'));
    creationDateInput = element(by.id('field_creationDate'));
    lastModifiedByInput = element(by.id('field_lastModifiedBy'));
    lastModifiedDateInput = element(by.id('field_lastModifiedDate'));
    gearProjectSelect = element(by.id('field_gearProject'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setStatusInput(status) {
        await this.statusInput.sendKeys(status);
    }

    async getStatusInput() {
        return this.statusInput.getAttribute('value');
    }

    async setImpactInput(impact) {
        await this.impactInput.sendKeys(impact);
    }

    async getImpactInput() {
        return this.impactInput.getAttribute('value');
    }

    async setProbabilityInput(probability) {
        await this.probabilityInput.sendKeys(probability);
    }

    async getProbabilityInput() {
        return this.probabilityInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setFirstImpactDateInput(firstImpactDate) {
        await this.firstImpactDateInput.sendKeys(firstImpactDate);
    }

    async getFirstImpactDateInput() {
        return this.firstImpactDateInput.getAttribute('value');
    }

    async setMitigationStrategyInput(mitigationStrategy) {
        await this.mitigationStrategyInput.sendKeys(mitigationStrategy);
    }

    async getMitigationStrategyInput() {
        return this.mitigationStrategyInput.getAttribute('value');
    }

    async setMitigationDescriptionInput(mitigationDescription) {
        await this.mitigationDescriptionInput.sendKeys(mitigationDescription);
    }

    async getMitigationDescriptionInput() {
        return this.mitigationDescriptionInput.getAttribute('value');
    }

    async setExpectedCloseDateInput(expectedCloseDate) {
        await this.expectedCloseDateInput.sendKeys(expectedCloseDate);
    }

    async getExpectedCloseDateInput() {
        return this.expectedCloseDateInput.getAttribute('value');
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

    async gearProjectSelectLastOption() {
        await this.gearProjectSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async gearProjectSelectOption(option) {
        await this.gearProjectSelect.sendKeys(option);
    }

    getGearProjectSelect(): ElementFinder {
        return this.gearProjectSelect;
    }

    async getGearProjectSelectedOption() {
        return this.gearProjectSelect.element(by.css('option:checked')).getText();
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

export class GearProjectRiskDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearProjectRisk-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearProjectRisk'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
