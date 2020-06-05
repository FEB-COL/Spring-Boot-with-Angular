import { element, by, ElementFinder } from 'protractor';

export class GearSurveyAnswerComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-survey-answer div table .btn-danger'));
    title = element.all(by.css('jhi-gear-survey-answer div h2#page-heading span')).first();

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

export class GearSurveyAnswerUpdatePage {
    pageTitle = element(by.id('jhi-gear-survey-answer-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    textInput = element(by.id('field_text'));
    isCorrectInput = element(by.id('field_isCorrect'));
    gearsurveyquestionSelect = element(by.id('field_gearsurveyquestion'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTextInput(text) {
        await this.textInput.sendKeys(text);
    }

    async getTextInput() {
        return this.textInput.getAttribute('value');
    }

    getIsCorrectInput() {
        return this.isCorrectInput;
    }

    async gearsurveyquestionSelectLastOption() {
        await this.gearsurveyquestionSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async gearsurveyquestionSelectOption(option) {
        await this.gearsurveyquestionSelect.sendKeys(option);
    }

    getGearsurveyquestionSelect(): ElementFinder {
        return this.gearsurveyquestionSelect;
    }

    async getGearsurveyquestionSelectedOption() {
        return this.gearsurveyquestionSelect.element(by.css('option:checked')).getText();
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

export class GearSurveyAnswerDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearSurveyAnswer-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearSurveyAnswer'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
