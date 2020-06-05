import { element, by, ElementFinder } from 'protractor';

export class GearProcessInfoSystemComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-process-info-system div table .btn-danger'));
    title = element.all(by.css('jhi-gear-process-info-system div h2#page-heading span')).first();

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

export class GearProcessInfoSystemUpdatePage {
    pageTitle = element(by.id('jhi-gear-process-info-system-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    gearinformationsystemsSelect = element(by.id('field_gearinformationsystems'));
    gearvaluechainprocessSelect = element(by.id('field_gearvaluechainprocess'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
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

    async gearvaluechainprocessSelectLastOption() {
        await this.gearvaluechainprocessSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async gearvaluechainprocessSelectOption(option) {
        await this.gearvaluechainprocessSelect.sendKeys(option);
    }

    getGearvaluechainprocessSelect(): ElementFinder {
        return this.gearvaluechainprocessSelect;
    }

    async getGearvaluechainprocessSelectedOption() {
        return this.gearvaluechainprocessSelect.element(by.css('option:checked')).getText();
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

export class GearProcessInfoSystemDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearProcessInfoSystem-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearProcessInfoSystem'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
