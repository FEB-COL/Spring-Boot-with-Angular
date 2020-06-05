import { element, by, ElementFinder } from 'protractor';

export class GearDiagAnswerComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-diag-answer div table .btn-danger'));
    title = element.all(by.css('jhi-gear-diag-answer div h2#page-heading span')).first();

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

export class GearDiagAnswerUpdatePage {
    pageTitle = element(by.id('jhi-gear-diag-answer-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    answerInput = element(by.id('field_answer'));
    creationDateInput = element(by.id('field_creationDate'));
    gearDiagquestionSelect = element(by.id('field_gearDiagquestion'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setAnswerInput(answer) {
        await this.answerInput.sendKeys(answer);
    }

    async getAnswerInput() {
        return this.answerInput.getAttribute('value');
    }

    async setCreationDateInput(creationDate) {
        await this.creationDateInput.sendKeys(creationDate);
    }

    async getCreationDateInput() {
        return this.creationDateInput.getAttribute('value');
    }

    async gearDiagquestionSelectLastOption() {
        await this.gearDiagquestionSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async gearDiagquestionSelectOption(option) {
        await this.gearDiagquestionSelect.sendKeys(option);
    }

    getGearDiagquestionSelect(): ElementFinder {
        return this.gearDiagquestionSelect;
    }

    async getGearDiagquestionSelectedOption() {
        return this.gearDiagquestionSelect.element(by.css('option:checked')).getText();
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

export class GearDiagAnswerDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearDiagAnswer-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearDiagAnswer'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
