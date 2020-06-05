import { element, by, ElementFinder } from 'protractor';

export class GearWikiComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-wiki div table .btn-danger'));
    title = element.all(by.css('jhi-gear-wiki div h2#page-heading span')).first();

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

export class GearWikiUpdatePage {
    pageTitle = element(by.id('jhi-gear-wiki-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titleInput = element(by.id('field_title'));
    textInput = element(by.id('field_text'));
    idImageInput = element(by.id('field_idImage'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTitleInput(title) {
        await this.titleInput.sendKeys(title);
    }

    async getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    async setTextInput(text) {
        await this.textInput.sendKeys(text);
    }

    async getTextInput() {
        return this.textInput.getAttribute('value');
    }

    async setIdImageInput(idImage) {
        await this.idImageInput.sendKeys(idImage);
    }

    async getIdImageInput() {
        return this.idImageInput.getAttribute('value');
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

export class GearWikiDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearWiki-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearWiki'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
