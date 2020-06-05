import { element, by, ElementFinder } from 'protractor';

export class GearValueChainMacroprocessComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-value-chain-macroprocess div table .btn-danger'));
    title = element.all(by.css('jhi-gear-value-chain-macroprocess div h2#page-heading span')).first();

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

export class GearValueChainMacroprocessUpdatePage {
    pageTitle = element(by.id('jhi-gear-value-chain-macroprocess-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    decriptionInput = element(by.id('field_decription'));
    creationDateInput = element(by.id('field_creationDate'));
    lastUpdateInput = element(by.id('field_lastUpdate'));
    draftInput = element(by.id('field_draft'));
    orderInput = element(by.id('field_order'));
    gearvaluechaincategorySelect = element(by.id('field_gearvaluechaincategory'));

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

    getDraftInput() {
        return this.draftInput;
    }
    async setOrderInput(order) {
        await this.orderInput.sendKeys(order);
    }

    async getOrderInput() {
        return this.orderInput.getAttribute('value');
    }

    async gearvaluechaincategorySelectLastOption() {
        await this.gearvaluechaincategorySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async gearvaluechaincategorySelectOption(option) {
        await this.gearvaluechaincategorySelect.sendKeys(option);
    }

    getGearvaluechaincategorySelect(): ElementFinder {
        return this.gearvaluechaincategorySelect;
    }

    async getGearvaluechaincategorySelectedOption() {
        return this.gearvaluechaincategorySelect.element(by.css('option:checked')).getText();
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

export class GearValueChainMacroprocessDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearValueChainMacroprocess-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearValueChainMacroprocess'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
