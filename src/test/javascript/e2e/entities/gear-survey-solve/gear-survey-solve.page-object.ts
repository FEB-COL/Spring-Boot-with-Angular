import { element, by, ElementFinder } from 'protractor';

export class GearSurveySolveComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-survey-solve div table .btn-danger'));
    title = element.all(by.css('jhi-gear-survey-solve div h2#page-heading span')).first();

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

export class GearSurveySolveUpdatePage {
    pageTitle = element(by.id('jhi-gear-survey-solve-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    textInput = element(by.id('field_text'));
    gearsurveySelect = element(by.id('field_gearsurvey'));
    gearsurveyquestionSelect = element(by.id('field_gearsurveyquestion'));
    gearsurveyanswerSelect = element(by.id('field_gearsurveyanswer'));
    gearUserSelect = element(by.id('field_gearUser'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTextInput(text) {
        await this.textInput.sendKeys(text);
    }

    async getTextInput() {
        return this.textInput.getAttribute('value');
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

    async gearsurveyanswerSelectLastOption() {
        await this.gearsurveyanswerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async gearsurveyanswerSelectOption(option) {
        await this.gearsurveyanswerSelect.sendKeys(option);
    }

    getGearsurveyanswerSelect(): ElementFinder {
        return this.gearsurveyanswerSelect;
    }

    async getGearsurveyanswerSelectedOption() {
        return this.gearsurveyanswerSelect.element(by.css('option:checked')).getText();
    }

    async gearUserSelectLastOption() {
        await this.gearUserSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async gearUserSelectOption(option) {
        await this.gearUserSelect.sendKeys(option);
    }

    getGearUserSelect(): ElementFinder {
        return this.gearUserSelect;
    }

    async getGearUserSelectedOption() {
        return this.gearUserSelect.element(by.css('option:checked')).getText();
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

export class GearSurveySolveDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearSurveySolve-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearSurveySolve'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
