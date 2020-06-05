import { element, by, ElementFinder } from 'protractor';

export class GearOrganizationalUnitComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gear-organizational-unit div table .btn-danger'));
    title = element.all(by.css('jhi-gear-organizational-unit div h2#page-heading span')).first();

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

export class GearOrganizationalUnitUpdatePage {
    pageTitle = element(by.id('jhi-gear-organizational-unit-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    nodeIdAlfrescoInput = element(by.id('field_nodeIdAlfresco'));
    siteIdInput = element(by.id('field_siteId'));
    siteGuidInput = element(by.id('field_siteGuid'));
    lowercaseRestrictionsInput = element(by.id('field_lowercaseRestrictions'));
    uppercaseRestrictionsInput = element(by.id('field_uppercaseRestrictions'));
    specialCharactersRestrictionsInput = element(by.id('field_specialCharactersRestrictions'));
    digitsRestrictionsInput = element(by.id('field_digitsRestrictions'));
    minimumLengthRestrictionsInput = element(by.id('field_minimumLengthRestrictions'));
    maximumLengthRestrictionInput = element(by.id('field_maximumLengthRestriction'));
    regexCorreoRestrictionInput = element(by.id('field_regexCorreoRestriction'));
    maximumAttempsRestrictionInput = element(by.id('field_maximumAttempsRestriction'));
    automaticLockEmailInput = element(by.id('field_automaticLockEmail'));
    manualLockEmailInput = element(by.id('field_manualLockEmail'));
    resetPasswordEmailInput = element(by.id('field_resetPasswordEmail'));
    passwordExpiresDaysInput = element(by.id('field_passwordExpiresDays'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setNodeIdAlfrescoInput(nodeIdAlfresco) {
        await this.nodeIdAlfrescoInput.sendKeys(nodeIdAlfresco);
    }

    async getNodeIdAlfrescoInput() {
        return this.nodeIdAlfrescoInput.getAttribute('value');
    }

    async setSiteIdInput(siteId) {
        await this.siteIdInput.sendKeys(siteId);
    }

    async getSiteIdInput() {
        return this.siteIdInput.getAttribute('value');
    }

    async setSiteGuidInput(siteGuid) {
        await this.siteGuidInput.sendKeys(siteGuid);
    }

    async getSiteGuidInput() {
        return this.siteGuidInput.getAttribute('value');
    }

    async setLowercaseRestrictionsInput(lowercaseRestrictions) {
        await this.lowercaseRestrictionsInput.sendKeys(lowercaseRestrictions);
    }

    async getLowercaseRestrictionsInput() {
        return this.lowercaseRestrictionsInput.getAttribute('value');
    }

    async setUppercaseRestrictionsInput(uppercaseRestrictions) {
        await this.uppercaseRestrictionsInput.sendKeys(uppercaseRestrictions);
    }

    async getUppercaseRestrictionsInput() {
        return this.uppercaseRestrictionsInput.getAttribute('value');
    }

    async setSpecialCharactersRestrictionsInput(specialCharactersRestrictions) {
        await this.specialCharactersRestrictionsInput.sendKeys(specialCharactersRestrictions);
    }

    async getSpecialCharactersRestrictionsInput() {
        return this.specialCharactersRestrictionsInput.getAttribute('value');
    }

    async setDigitsRestrictionsInput(digitsRestrictions) {
        await this.digitsRestrictionsInput.sendKeys(digitsRestrictions);
    }

    async getDigitsRestrictionsInput() {
        return this.digitsRestrictionsInput.getAttribute('value');
    }

    async setMinimumLengthRestrictionsInput(minimumLengthRestrictions) {
        await this.minimumLengthRestrictionsInput.sendKeys(minimumLengthRestrictions);
    }

    async getMinimumLengthRestrictionsInput() {
        return this.minimumLengthRestrictionsInput.getAttribute('value');
    }

    async setMaximumLengthRestrictionInput(maximumLengthRestriction) {
        await this.maximumLengthRestrictionInput.sendKeys(maximumLengthRestriction);
    }

    async getMaximumLengthRestrictionInput() {
        return this.maximumLengthRestrictionInput.getAttribute('value');
    }

    async setRegexCorreoRestrictionInput(regexCorreoRestriction) {
        await this.regexCorreoRestrictionInput.sendKeys(regexCorreoRestriction);
    }

    async getRegexCorreoRestrictionInput() {
        return this.regexCorreoRestrictionInput.getAttribute('value');
    }

    async setMaximumAttempsRestrictionInput(maximumAttempsRestriction) {
        await this.maximumAttempsRestrictionInput.sendKeys(maximumAttempsRestriction);
    }

    async getMaximumAttempsRestrictionInput() {
        return this.maximumAttempsRestrictionInput.getAttribute('value');
    }

    async setAutomaticLockEmailInput(automaticLockEmail) {
        await this.automaticLockEmailInput.sendKeys(automaticLockEmail);
    }

    async getAutomaticLockEmailInput() {
        return this.automaticLockEmailInput.getAttribute('value');
    }

    async setManualLockEmailInput(manualLockEmail) {
        await this.manualLockEmailInput.sendKeys(manualLockEmail);
    }

    async getManualLockEmailInput() {
        return this.manualLockEmailInput.getAttribute('value');
    }

    async setResetPasswordEmailInput(resetPasswordEmail) {
        await this.resetPasswordEmailInput.sendKeys(resetPasswordEmail);
    }

    async getResetPasswordEmailInput() {
        return this.resetPasswordEmailInput.getAttribute('value');
    }

    async setPasswordExpiresDaysInput(passwordExpiresDays) {
        await this.passwordExpiresDaysInput.sendKeys(passwordExpiresDays);
    }

    async getPasswordExpiresDaysInput() {
        return this.passwordExpiresDaysInput.getAttribute('value');
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

export class GearOrganizationalUnitDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gearOrganizationalUnit-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gearOrganizationalUnit'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
