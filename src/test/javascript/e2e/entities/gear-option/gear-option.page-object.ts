import { element, by, ElementFinder } from 'protractor';

export class GearOptionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-option div table .btn-danger'));
    title = element.all(by.css('jhi-gear-option div h2#page-heading span')).first();

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

export class GearOptionUpdatePage {
    pageTitle = element(by.id('jhi-gear-option-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    descriptionInput = element(by.id('field_description'));
    geardecisionSelect = element(by.id('field_geardecision'));

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

    async geardecisionSelectLastOption() {
        await this.geardecisionSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async geardecisionSelectOption(option) {
        await this.geardecisionSelect.sendKeys(option);
    }

    getGeardecisionSelect(): ElementFinder {
        return this.geardecisionSelect;
    }

    async getGeardecisionSelectedOption() {
        return this.geardecisionSelect.element(by.css('option:checked')).getText();
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

export class GearOptionDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearOption-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearOption'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
