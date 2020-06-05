import { element, by, ElementFinder } from 'protractor';

export class GearSystemsFunctionalityComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-systems-functionality div table .btn-danger'));
    title = element.all(by.css('jhi-gear-systems-functionality div h2#page-heading span')).first();

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

export class GearSystemsFunctionalityUpdatePage {
    pageTitle = element(by.id('jhi-gear-systems-functionality-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    descriptionInput = element(by.id('field_description'));
    creationDateInput = element(by.id('field_creationDate'));
    modifyDateInput = element(by.id('field_modifyDate'));
    gearinformationsystemsSelect = element(by.id('field_gearinformationsystems'));

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

    async gearinformationsystemsSelectLastOption() {
        await this.gearinformationsystemsSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async gearinformationsystemsSelectOption(option) {
        await this.gearinformationsystemsSelect.sendKeys(option);
    }

    getGearinformationsystemsSelect(): ElementFinder {
        return this.gearinformationsystemsSelect;
    }

    async getGearinformationsystemsSelectedOption() {
        return this.gearinformationsystemsSelect.element(by.css('option:checked')).getText();
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

export class GearSystemsFunctionalityDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearSystemsFunctionality-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearSystemsFunctionality'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
