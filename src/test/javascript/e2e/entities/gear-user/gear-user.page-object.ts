import { element, by, ElementFinder } from 'protractor';

export class GearUserComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-user div table .btn-danger'));
    title = element.all(by.css('jhi-gear-user div h2#page-heading span')).first();

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

export class GearUserUpdatePage {
    pageTitle = element(by.id('jhi-gear-user-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    passwordInput = element(by.id('field_password'));
    emailInput = element(by.id('field_email'));
    avatarInput = element(by.id('field_avatar'));
    profileInput = element(by.id('field_profile'));
    stateInput = element(by.id('field_state'));
    idAlfrescoInput = element(by.id('field_idAlfresco'));
    loginAttemptsInput = element(by.id('field_loginAttempts'));
    lastUpdatePasswordDateInput = element(by.id('field_lastUpdatePasswordDate'));
    passwordResetKeyInput = element(by.id('field_passwordResetKey'));
    pinInput = element(by.id('field_pin'));
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

    async setPasswordInput(password) {
        await this.passwordInput.sendKeys(password);
    }

    async getPasswordInput() {
        return this.passwordInput.getAttribute('value');
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async setAvatarInput(avatar) {
        await this.avatarInput.sendKeys(avatar);
    }

    async getAvatarInput() {
        return this.avatarInput.getAttribute('value');
    }

    async setProfileInput(profile) {
        await this.profileInput.sendKeys(profile);
    }

    async getProfileInput() {
        return this.profileInput.getAttribute('value');
    }

    getStateInput() {
        return this.stateInput;
    }
    async setIdAlfrescoInput(idAlfresco) {
        await this.idAlfrescoInput.sendKeys(idAlfresco);
    }

    async getIdAlfrescoInput() {
        return this.idAlfrescoInput.getAttribute('value');
    }

    async setLoginAttemptsInput(loginAttempts) {
        await this.loginAttemptsInput.sendKeys(loginAttempts);
    }

    async getLoginAttemptsInput() {
        return this.loginAttemptsInput.getAttribute('value');
    }

    async setLastUpdatePasswordDateInput(lastUpdatePasswordDate) {
        await this.lastUpdatePasswordDateInput.sendKeys(lastUpdatePasswordDate);
    }

    async getLastUpdatePasswordDateInput() {
        return this.lastUpdatePasswordDateInput.getAttribute('value');
    }

    async setPasswordResetKeyInput(passwordResetKey) {
        await this.passwordResetKeyInput.sendKeys(passwordResetKey);
    }

    async getPasswordResetKeyInput() {
        return this.passwordResetKeyInput.getAttribute('value');
    }

    async setPinInput(pin) {
        await this.pinInput.sendKeys(pin);
    }

    async getPinInput() {
        return this.pinInput.getAttribute('value');
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

export class GearUserDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearUser-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearUser'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
