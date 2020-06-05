import { element, by, ElementFinder } from 'protractor';

export class GearCustomFieldTemplateComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-custom-field-template div table .btn-danger'));
    title = element.all(by.css('jhi-gear-custom-field-template div h2#page-heading span')).first();

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

export class GearCustomFieldTemplateUpdatePage {
    pageTitle = element(by.id('jhi-gear-custom-field-template-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    labelFieldInput = element(by.id('field_labelField'));
    defaultValueInput = element(by.id('field_defaultValue'));
    fieldTypeInput = element(by.id('field_fieldType'));
    listOptionsInput = element(by.id('field_listOptions'));
    gearDdocumenttypeSelect = element(by.id('field_gearDdocumenttype'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setLabelFieldInput(labelField) {
        await this.labelFieldInput.sendKeys(labelField);
    }

    async getLabelFieldInput() {
        return this.labelFieldInput.getAttribute('value');
    }

    async setDefaultValueInput(defaultValue) {
        await this.defaultValueInput.sendKeys(defaultValue);
    }

    async getDefaultValueInput() {
        return this.defaultValueInput.getAttribute('value');
    }

    async setFieldTypeInput(fieldType) {
        await this.fieldTypeInput.sendKeys(fieldType);
    }

    async getFieldTypeInput() {
        return this.fieldTypeInput.getAttribute('value');
    }

    async setListOptionsInput(listOptions) {
        await this.listOptionsInput.sendKeys(listOptions);
    }

    async getListOptionsInput() {
        return this.listOptionsInput.getAttribute('value');
    }

    async gearDdocumenttypeSelectLastOption() {
        await this.gearDdocumenttypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async gearDdocumenttypeSelectOption(option) {
        await this.gearDdocumenttypeSelect.sendKeys(option);
    }

    getGearDdocumenttypeSelect(): ElementFinder {
        return this.gearDdocumenttypeSelect;
    }

    async getGearDdocumenttypeSelectedOption() {
        return this.gearDdocumenttypeSelect.element(by.css('option:checked')).getText();
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

export class GearCustomFieldTemplateDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearCustomFieldTemplate-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearCustomFieldTemplate'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
