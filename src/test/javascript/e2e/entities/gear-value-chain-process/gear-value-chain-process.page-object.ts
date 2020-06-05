import { element, by, ElementFinder } from 'protractor';

export class GearValueChainProcessComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-value-chain-process div table .btn-danger'));
    title = element.all(by.css('jhi-gear-value-chain-process div h2#page-heading span')).first();

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

export class GearValueChainProcessUpdatePage {
    pageTitle = element(by.id('jhi-gear-value-chain-process-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    decriptionInput = element(by.id('field_decription'));
    creationDateInput = element(by.id('field_creationDate'));
    lastUpdateInput = element(by.id('field_lastUpdate'));
    attachInput = element(by.id('field_attach'));
    draftInput = element(by.id('field_draft'));
    inputsInput = element(by.id('field_inputs'));
    outputsInput = element(by.id('field_outputs'));
    gearvaluechainmacroprocessSelect = element(by.id('field_gearvaluechainmacroprocess'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setDecriptionInput(decription) {
        await this.decriptionInput.sendKeys(decription);
    }

    async getDecriptionInput() {
        return this.decriptionInput.getAttribute('value');
    }

    async setCreationDateInput(creationDate) {
        await this.creationDateInput.sendKeys(creationDate);
    }

    async getCreationDateInput() {
        return this.creationDateInput.getAttribute('value');
    }

    async setLastUpdateInput(lastUpdate) {
        await this.lastUpdateInput.sendKeys(lastUpdate);
    }

    async getLastUpdateInput() {
        return this.lastUpdateInput.getAttribute('value');
    }

    async setAttachInput(attach) {
        await this.attachInput.sendKeys(attach);
    }

    async getAttachInput() {
        return this.attachInput.getAttribute('value');
    }

    getDraftInput() {
        return this.draftInput;
    }
    async setInputsInput(inputs) {
        await this.inputsInput.sendKeys(inputs);
    }

    async getInputsInput() {
        return this.inputsInput.getAttribute('value');
    }

    async setOutputsInput(outputs) {
        await this.outputsInput.sendKeys(outputs);
    }

    async getOutputsInput() {
        return this.outputsInput.getAttribute('value');
    }

    async gearvaluechainmacroprocessSelectLastOption() {
        await this.gearvaluechainmacroprocessSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async gearvaluechainmacroprocessSelectOption(option) {
        await this.gearvaluechainmacroprocessSelect.sendKeys(option);
    }

    getGearvaluechainmacroprocessSelect(): ElementFinder {
        return this.gearvaluechainmacroprocessSelect;
    }

    async getGearvaluechainmacroprocessSelectedOption() {
        return this.gearvaluechainmacroprocessSelect.element(by.css('option:checked')).getText();
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

export class GearValueChainProcessDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearValueChainProcess-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearValueChainProcess'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
