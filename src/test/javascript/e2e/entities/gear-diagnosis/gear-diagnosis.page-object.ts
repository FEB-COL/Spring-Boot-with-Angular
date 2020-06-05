import { element, by, ElementFinder } from 'protractor';

export class GearDiagnosisComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-diagnosis div table .btn-danger'));
    title = element.all(by.css('jhi-gear-diagnosis div h2#page-heading span')).first();

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

export class GearDiagnosisUpdatePage {
    pageTitle = element(by.id('jhi-gear-diagnosis-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    descriptionInput = element(by.id('field_description'));
    creationDateInput = element(by.id('field_creationDate'));
    levelMaturityInput = element(by.id('field_levelMaturity'));
    gearDiagnosisTypeSelect = element(by.id('field_gearDiagnosisType'));
    gearDomainSelect = element(by.id('field_gearDomain'));

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

    async setLevelMaturityInput(levelMaturity) {
        await this.levelMaturityInput.sendKeys(levelMaturity);
    }

    async getLevelMaturityInput() {
        return this.levelMaturityInput.getAttribute('value');
    }

    async gearDiagnosisTypeSelectLastOption() {
        await this.gearDiagnosisTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async gearDiagnosisTypeSelectOption(option) {
        await this.gearDiagnosisTypeSelect.sendKeys(option);
    }

    getGearDiagnosisTypeSelect(): ElementFinder {
        return this.gearDiagnosisTypeSelect;
    }

    async getGearDiagnosisTypeSelectedOption() {
        return this.gearDiagnosisTypeSelect.element(by.css('option:checked')).getText();
    }

    async gearDomainSelectLastOption() {
        await this.gearDomainSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async gearDomainSelectOption(option) {
        await this.gearDomainSelect.sendKeys(option);
    }

    getGearDomainSelect(): ElementFinder {
        return this.gearDomainSelect;
    }

    async getGearDomainSelectedOption() {
        return this.gearDomainSelect.element(by.css('option:checked')).getText();
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

export class GearDiagnosisDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearDiagnosis-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearDiagnosis'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
