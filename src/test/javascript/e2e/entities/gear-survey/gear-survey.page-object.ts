import { element, by, ElementFinder } from 'protractor';

export class GearSurveyComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-survey div table .btn-danger'));
    title = element.all(by.css('jhi-gear-survey div h2#page-heading span')).first();

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

export class GearSurveyUpdatePage {
    pageTitle = element(by.id('jhi-gear-survey-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    startInput = element(by.id('field_start'));
    endInput = element(by.id('field_end'));
    descriptionInput = element(by.id('field_description'));
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

    async setStartInput(start) {
        await this.startInput.sendKeys(start);
    }

    async getStartInput() {
        return this.startInput.getAttribute('value');
    }

    async setEndInput(end) {
        await this.endInput.sendKeys(end);
    }

    async getEndInput() {
        return this.endInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
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

export class GearSurveyDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearSurvey-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearSurvey'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
