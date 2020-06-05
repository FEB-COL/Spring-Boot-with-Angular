import { element, by, ElementFinder } from 'protractor';

export class AlfrescoSiteComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-alfresco-site div table .btn-danger'));
    title = element.all(by.css('jhi-alfresco-site div h2#page-heading span')).first();

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

export class AlfrescoSiteUpdatePage {
    pageTitle = element(by.id('jhi-alfresco-site-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    guidInput = element(by.id('field_guid'));
    identifyInput = element(by.id('field_identify'));
    roleInput = element(by.id('field_role'));
    titleInput = element(by.id('field_title'));
    descriptionInput = element(by.id('field_description'));
    visibilityInput = element(by.id('field_visibility'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setGuidInput(guid) {
        await this.guidInput.sendKeys(guid);
    }

    async getGuidInput() {
        return this.guidInput.getAttribute('value');
    }

    async setIdentifyInput(identify) {
        await this.identifyInput.sendKeys(identify);
    }

    async getIdentifyInput() {
        return this.identifyInput.getAttribute('value');
    }

    async setRoleInput(role) {
        await this.roleInput.sendKeys(role);
    }

    async getRoleInput() {
        return this.roleInput.getAttribute('value');
    }

    async setTitleInput(title) {
        await this.titleInput.sendKeys(title);
    }

    async getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setVisibilityInput(visibility) {
        await this.visibilityInput.sendKeys(visibility);
    }

    async getVisibilityInput() {
        return this.visibilityInput.getAttribute('value');
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

export class AlfrescoSiteDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-alfrescoSite-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-alfrescoSite'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
