import { element, by, ElementFinder } from 'protractor';

export class GearDocumentTypeComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-document-type div table .btn-danger'));
    title = element.all(by.css('jhi-gear-document-type div h2#page-heading span')).first();

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

export class GearDocumentTypeUpdatePage {
    pageTitle = element(by.id('jhi-gear-document-type-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    geardomainSelect = element(by.id('field_geardomain'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async geardomainSelectLastOption() {
        await this.geardomainSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async geardomainSelectOption(option) {
        await this.geardomainSelect.sendKeys(option);
    }

    getGeardomainSelect(): ElementFinder {
        return this.geardomainSelect;
    }

    async getGeardomainSelectedOption() {
        return this.geardomainSelect.element(by.css('option:checked')).getText();
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

export class GearDocumentTypeDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearDocumentType-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearDocumentType'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
