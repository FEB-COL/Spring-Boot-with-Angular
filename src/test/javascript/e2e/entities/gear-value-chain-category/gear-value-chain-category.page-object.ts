import { element, by, ElementFinder } from 'protractor';

export class GearValueChainCategoryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-value-chain-category div table .btn-danger'));
    title = element.all(by.css('jhi-gear-value-chain-category div h2#page-heading span')).first();

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

export class GearValueChainCategoryUpdatePage {
    pageTitle = element(by.id('jhi-gear-value-chain-category-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    decriptionInput = element(by.id('field_decription'));
    colorInput = element(by.id('field_color'));
    creationDateInput = element(by.id('field_creationDate'));
    lastUpdateInput = element(by.id('field_lastUpdate'));
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

    async setDecriptionInput(decription) {
        await this.decriptionInput.sendKeys(decription);
    }

    async getDecriptionInput() {
        return this.decriptionInput.getAttribute('value');
    }

    async setColorInput(color) {
        await this.colorInput.sendKeys(color);
    }

    async getColorInput() {
        return this.colorInput.getAttribute('value');
    }

    async setCreationDateInput(creationDate) {
        await this.creationDateInput.sendKeys(creationDate);
    }

    async getCreationDateInput() {
        return this.creationDateInput.getAttribute('value');
    }

    async setLastUpdateInput(lastUpdate) {
        await this.lastUpdateInput.sendKeys(lastUpdate);
    }

    async getLastUpdateInput() {
        return this.lastUpdateInput.getAttribute('value');
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

export class GearValueChainCategoryDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearValueChainCategory-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearValueChainCategory'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
