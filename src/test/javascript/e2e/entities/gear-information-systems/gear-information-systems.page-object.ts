import { element, by, ElementFinder } from 'protractor';

export class GearInformationSystemsComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-information-systems div table .btn-danger'));
    title = element.all(by.css('jhi-gear-information-systems div h2#page-heading span')).first();

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

export class GearInformationSystemsUpdatePage {
    pageTitle = element(by.id('jhi-gear-information-systems-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    descriptionInput = element(by.id('field_description'));
    versionInput = element(by.id('field_version'));
    acquisitionDateInput = element(by.id('field_acquisitionDate'));
    startDateInput = element(by.id('field_startDate'));
    responsibleInput = element(by.id('field_responsible'));
    responsibleEmailInput = element(by.id('field_responsibleEmail'));
    providerInput = element(by.id('field_provider'));
    initialCostInput = element(by.id('field_initialCost'));
    mainteinanceCostInput = element(by.id('field_mainteinanceCost'));
    creationDateInput = element(by.id('field_creationDate'));
    modifyDateInput = element(by.id('field_modifyDate'));
    gearOrganizationalUnitSelect = element(by.id('field_gearOrganizationalUnit'));
    parCoinTypeSelect = element(by.id('field_parCoinType'));

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

    async setVersionInput(version) {
        await this.versionInput.sendKeys(version);
    }

    async getVersionInput() {
        return this.versionInput.getAttribute('value');
    }

    async setAcquisitionDateInput(acquisitionDate) {
        await this.acquisitionDateInput.sendKeys(acquisitionDate);
    }

    async getAcquisitionDateInput() {
        return this.acquisitionDateInput.getAttribute('value');
    }

    async setStartDateInput(startDate) {
        await this.startDateInput.sendKeys(startDate);
    }

    async getStartDateInput() {
        return this.startDateInput.getAttribute('value');
    }

    async setResponsibleInput(responsible) {
        await this.responsibleInput.sendKeys(responsible);
    }

    async getResponsibleInput() {
        return this.responsibleInput.getAttribute('value');
    }

    async setResponsibleEmailInput(responsibleEmail) {
        await this.responsibleEmailInput.sendKeys(responsibleEmail);
    }

    async getResponsibleEmailInput() {
        return this.responsibleEmailInput.getAttribute('value');
    }

    async setProviderInput(provider) {
        await this.providerInput.sendKeys(provider);
    }

    async getProviderInput() {
        return this.providerInput.getAttribute('value');
    }

    async setInitialCostInput(initialCost) {
        await this.initialCostInput.sendKeys(initialCost);
    }

    async getInitialCostInput() {
        return this.initialCostInput.getAttribute('value');
    }

    async setMainteinanceCostInput(mainteinanceCost) {
        await this.mainteinanceCostInput.sendKeys(mainteinanceCost);
    }

    async getMainteinanceCostInput() {
        return this.mainteinanceCostInput.getAttribute('value');
    }

    async setCreationDateInput(creationDate) {
        await this.creationDateInput.sendKeys(creationDate);
    }

    async getCreationDateInput() {
        return this.creationDateInput.getAttribute('value');
    }

    async setModifyDateInput(modifyDate) {
        await this.modifyDateInput.sendKeys(modifyDate);
    }

    async getModifyDateInput() {
        return this.modifyDateInput.getAttribute('value');
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

    async parCoinTypeSelectLastOption() {
        await this.parCoinTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async parCoinTypeSelectOption(option) {
        await this.parCoinTypeSelect.sendKeys(option);
    }

    getParCoinTypeSelect(): ElementFinder {
        return this.parCoinTypeSelect;
    }

    async getParCoinTypeSelectedOption() {
        return this.parCoinTypeSelect.element(by.css('option:checked')).getText();
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

export class GearInformationSystemsDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearInformationSystems-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearInformationSystems'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
