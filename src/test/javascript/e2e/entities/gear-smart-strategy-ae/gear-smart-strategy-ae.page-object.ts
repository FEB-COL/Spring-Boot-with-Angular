import { element, by, ElementFinder } from 'protractor';

export class GearSmartStrategyAEComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-smart-strategy-ae div table .btn-danger'));
    title = element.all(by.css('jhi-gear-smart-strategy-ae div h2#page-heading span')).first();

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

export class GearSmartStrategyAEUpdatePage {
    pageTitle = element(by.id('jhi-gear-smart-strategy-ae-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    drescriptionInput = element(by.id('field_drescription'));
    geargoalsstrategyaeSelect = element(by.id('field_geargoalsstrategyae'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setDrescriptionInput(drescription) {
        await this.drescriptionInput.sendKeys(drescription);
    }

    async getDrescriptionInput() {
        return this.drescriptionInput.getAttribute('value');
    }

    async geargoalsstrategyaeSelectLastOption() {
        await this.geargoalsstrategyaeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async geargoalsstrategyaeSelectOption(option) {
        await this.geargoalsstrategyaeSelect.sendKeys(option);
    }

    getGeargoalsstrategyaeSelect(): ElementFinder {
        return this.geargoalsstrategyaeSelect;
    }

    async getGeargoalsstrategyaeSelectedOption() {
        return this.geargoalsstrategyaeSelect.element(by.css('option:checked')).getText();
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

export class GearSmartStrategyAEDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearSmartStrategyAE-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearSmartStrategyAE'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
