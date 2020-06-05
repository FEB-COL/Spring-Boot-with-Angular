import { element, by, ElementFinder } from 'protractor';

export class GearGoalsStrategyAEComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-goals-strategy-ae div table .btn-danger'));
    title = element.all(by.css('jhi-gear-goals-strategy-ae div h2#page-heading span')).first();

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

export class GearGoalsStrategyAEUpdatePage {
    pageTitle = element(by.id('jhi-gear-goals-strategy-ae-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    drescriptionInput = element(by.id('field_drescription'));
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

    async setDrescriptionInput(drescription) {
        await this.drescriptionInput.sendKeys(drescription);
    }

    async getDrescriptionInput() {
        return this.drescriptionInput.getAttribute('value');
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

export class GearGoalsStrategyAEDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearGoalsStrategyAE-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearGoalsStrategyAE'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
