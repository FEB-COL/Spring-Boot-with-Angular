import { element, by, ElementFinder } from 'protractor';

export class GearDecisionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-decision div table .btn-danger'));
    title = element.all(by.css('jhi-gear-decision div h2#page-heading span')).first();

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

export class GearDecisionUpdatePage {
    pageTitle = element(by.id('jhi-gear-decision-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    goalInput = element(by.id('field_goal'));
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

    async setGoalInput(goal) {
        await this.goalInput.sendKeys(goal);
    }

    async getGoalInput() {
        return this.goalInput.getAttribute('value');
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

export class GearDecisionDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearDecision-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearDecision'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
