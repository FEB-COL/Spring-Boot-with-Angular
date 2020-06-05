import { element, by, ElementFinder } from 'protractor';

export class GearDiagQuestionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-diag-question div table .btn-danger'));
    title = element.all(by.css('jhi-gear-diag-question div h2#page-heading span')).first();

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

export class GearDiagQuestionUpdatePage {
    pageTitle = element(by.id('jhi-gear-diag-question-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    descriptionInput = element(by.id('field_description'));
    creationDateInput = element(by.id('field_creationDate'));
    gearDiagnosisSelect = element(by.id('field_gearDiagnosis'));
    gearAmbitSelect = element(by.id('field_gearAmbit'));

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

    async gearDiagnosisSelectLastOption() {
        await this.gearDiagnosisSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async gearDiagnosisSelectOption(option) {
        await this.gearDiagnosisSelect.sendKeys(option);
    }

    getGearDiagnosisSelect(): ElementFinder {
        return this.gearDiagnosisSelect;
    }

    async getGearDiagnosisSelectedOption() {
        return this.gearDiagnosisSelect.element(by.css('option:checked')).getText();
    }

    async gearAmbitSelectLastOption() {
        await this.gearAmbitSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async gearAmbitSelectOption(option) {
        await this.gearAmbitSelect.sendKeys(option);
    }

    getGearAmbitSelect(): ElementFinder {
        return this.gearAmbitSelect;
    }

    async getGearAmbitSelectedOption() {
        return this.gearAmbitSelect.element(by.css('option:checked')).getText();
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

export class GearDiagQuestionDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearDiagQuestion-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearDiagQuestion'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
