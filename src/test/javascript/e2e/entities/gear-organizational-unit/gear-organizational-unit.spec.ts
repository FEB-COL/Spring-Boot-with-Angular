/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    GearOrganizationalUnitComponentsPage,
    GearOrganizationalUnitDeleteDialog,
    GearOrganizationalUnitUpdatePage
} from './gear-organizational-unit.page-object';

const expect = chai.expect;

describe('GearOrganizationalUnit e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearOrganizationalUnitUpdatePage: GearOrganizationalUnitUpdatePage;
    let gearOrganizationalUnitComponentsPage: GearOrganizationalUnitComponentsPage;
    let gearOrganizationalUnitDeleteDialog: GearOrganizationalUnitDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearOrganizationalUnits', async () => {
        await navBarPage.goToEntity('gear-organizational-unit');
        gearOrganizationalUnitComponentsPage = new GearOrganizationalUnitComponentsPage();
        expect(await gearOrganizationalUnitComponentsPage.getTitle()).to.eq('geargatewayApp.gearOrganizationalUnit.home.title');
    });

    it('should load create GearOrganizationalUnit page', async () => {
        await gearOrganizationalUnitComponentsPage.clickOnCreateButton();
        gearOrganizationalUnitUpdatePage = new GearOrganizationalUnitUpdatePage();
        expect(await gearOrganizationalUnitUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearOrganizationalUnit.home.createOrEditLabel');
        await gearOrganizationalUnitUpdatePage.cancel();
    });

    it('should create and save GearOrganizationalUnits', async () => {
        const nbButtonsBeforeCreate = await gearOrganizationalUnitComponentsPage.countDeleteButtons();

        await gearOrganizationalUnitComponentsPage.clickOnCreateButton();
        await promise.all([
            gearOrganizationalUnitUpdatePage.setNameInput('name'),
            gearOrganizationalUnitUpdatePage.setNodeIdAlfrescoInput('nodeIdAlfresco'),
            gearOrganizationalUnitUpdatePage.setSiteIdInput('siteId'),
            gearOrganizationalUnitUpdatePage.setSiteGuidInput('siteGuid'),
            gearOrganizationalUnitUpdatePage.setLowercaseRestrictionsInput('5'),
            gearOrganizationalUnitUpdatePage.setUppercaseRestrictionsInput('5'),
            gearOrganizationalUnitUpdatePage.setSpecialCharactersRestrictionsInput('5'),
            gearOrganizationalUnitUpdatePage.setDigitsRestrictionsInput('5'),
            gearOrganizationalUnitUpdatePage.setMinimumLengthRestrictionsInput('5'),
            gearOrganizationalUnitUpdatePage.setMaximumLengthRestrictionInput('5'),
            gearOrganizationalUnitUpdatePage.setRegexCorreoRestrictionInput('regexCorreoRestriction'),
            gearOrganizationalUnitUpdatePage.setMaximumAttempsRestrictionInput('5'),
            gearOrganizationalUnitUpdatePage.setAutomaticLockEmailInput('automaticLockEmail'),
            gearOrganizationalUnitUpdatePage.setManualLockEmailInput('manualLockEmail'),
            gearOrganizationalUnitUpdatePage.setResetPasswordEmailInput('resetPasswordEmail'),
            gearOrganizationalUnitUpdatePage.setPasswordExpiresDaysInput('5')
        ]);
        expect(await gearOrganizationalUnitUpdatePage.getNameInput()).to.eq('name');
        expect(await gearOrganizationalUnitUpdatePage.getNodeIdAlfrescoInput()).to.eq('nodeIdAlfresco');
        expect(await gearOrganizationalUnitUpdatePage.getSiteIdInput()).to.eq('siteId');
        expect(await gearOrganizationalUnitUpdatePage.getSiteGuidInput()).to.eq('siteGuid');
        expect(await gearOrganizationalUnitUpdatePage.getLowercaseRestrictionsInput()).to.eq('5');
        expect(await gearOrganizationalUnitUpdatePage.getUppercaseRestrictionsInput()).to.eq('5');
        expect(await gearOrganizationalUnitUpdatePage.getSpecialCharactersRestrictionsInput()).to.eq('5');
        expect(await gearOrganizationalUnitUpdatePage.getDigitsRestrictionsInput()).to.eq('5');
        expect(await gearOrganizationalUnitUpdatePage.getMinimumLengthRestrictionsInput()).to.eq('5');
        expect(await gearOrganizationalUnitUpdatePage.getMaximumLengthRestrictionInput()).to.eq('5');
        expect(await gearOrganizationalUnitUpdatePage.getRegexCorreoRestrictionInput()).to.eq('regexCorreoRestriction');
        expect(await gearOrganizationalUnitUpdatePage.getMaximumAttempsRestrictionInput()).to.eq('5');
        expect(await gearOrganizationalUnitUpdatePage.getAutomaticLockEmailInput()).to.eq('automaticLockEmail');
        expect(await gearOrganizationalUnitUpdatePage.getManualLockEmailInput()).to.eq('manualLockEmail');
        expect(await gearOrganizationalUnitUpdatePage.getResetPasswordEmailInput()).to.eq('resetPasswordEmail');
        expect(await gearOrganizationalUnitUpdatePage.getPasswordExpiresDaysInput()).to.eq('5');
        await gearOrganizationalUnitUpdatePage.save();
        expect(await gearOrganizationalUnitUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearOrganizationalUnitComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearOrganizationalUnit', async () => {
        const nbButtonsBeforeDelete = await gearOrganizationalUnitComponentsPage.countDeleteButtons();
        await gearOrganizationalUnitComponentsPage.clickOnLastDeleteButton();

        gearOrganizationalUnitDeleteDialog = new GearOrganizationalUnitDeleteDialog();
        expect(await gearOrganizationalUnitDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearOrganizationalUnit.delete.question');
        await gearOrganizationalUnitDeleteDialog.clickOnConfirmButton();

        expect(await gearOrganizationalUnitComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
