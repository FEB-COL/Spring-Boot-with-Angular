import { element, by, ElementFinder } from 'protractor';

export class GearSurveyQuestionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-survey-question div table .btn-danger'));
    title = element.all(by.css('jhi-gear-survey-question div h2#page-heading span')).first();

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

export class GearSurveyQuestionUpdatePage {
    pageTitle = element(by.id('jhi-gear-survey-question-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    textInput = element(by.id('field_text'));
    descriptionInput = element(by.id('field_description'));
    correctAnswerInput = element(by.id('field_correctAnswer'));
    gearsurveySelect = element(by.id('field_gearsurvey'));
    gearsurveyquestiontypeSelect = element(by.id('field_gearsurveyquestiontype'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTextInput(text) {
        await this.textInput.sendKeys(text);
    }

    async getTextInput() {
        return this.textInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setCorrectAnswerInput(correctAnswer) {
        await this.correctAnswerInput.sendKeys(correctAnswer);
    }

    async getCorrectAnswerInput() {
        return this.correctAnswerInput.getAttribute('value');
    }

    async gearsurveySelectLastOption() {
        await this.gearsurveySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async gearsurveySelectOption(option) {
        await this.gearsurveySelect.sendKeys(option);
    }

    getGearsurveySelect(): ElementFinder {
        return this.gearsurveySelect;
    }

    async getGearsurveySelectedOption() {
        return this.gearsurveySelect.element(by.css('option:checked')).getText();
    }

    async gearsurveyquestiontypeSelectLastOption() {
        await this.gearsurveyquestiontypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async gearsurveyquestiontypeSelectOption(option) {
        await this.gearsurveyquestiontypeSelect.sendKeys(option);
    }

    getGearsurveyquestiontypeSelect(): ElementFinder {
        return this.gearsurveyquestiontypeSelect;
    }

    async getGearsurveyquestiontypeSelectedOption() {
        return this.gearsurveyquestiontypeSelect.element(by.css('option:checked')).getText();
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

export class GearSurveyQuestionDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearSurveyQuestion-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearSurveyQuestion'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
