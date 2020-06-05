/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GearUserComponentsPage, GearUserDeleteDialog, GearUserUpdatePage } from './gear-user.page-object';

const expect = chai.expect;

describe('GearUser e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearUserUpdatePage: GearUserUpdatePage;
    let gearUserComponentsPage: GearUserComponentsPage;
    let gearUserDeleteDialog: GearUserDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearUsers', async () => {
        await navBarPage.goToEntity('gear-user');
        gearUserComponentsPage = new GearUserComponentsPage();
        expect(await gearUserComponentsPage.getTitle()).to.eq('geargatewayApp.gearUser.home.title');
    });

    it('should load create GearUser page', async () => {
        await gearUserComponentsPage.clickOnCreateButton();
        gearUserUpdatePage = new GearUserUpdatePage();
        expect(await gearUserUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearUser.home.createOrEditLabel');
        await gearUserUpdatePage.cancel();
    });

    it('should create and save GearUsers', async () => {
        const nbButtonsBeforeCreate = await gearUserComponentsPage.countDeleteButtons();

        await gearUserComponentsPage.clickOnCreateButton();
        await promise.all([
            gearUserUpdatePage.setNameInput('name'),
            gearUserUpdatePage.setPasswordInput('password'),
            gearUserUpdatePage.setEmailInput('email'),
            gearUserUpdatePage.setAvatarInput('avatar'),
            gearUserUpdatePage.setProfileInput('profile'),
            gearUserUpdatePage.setIdAlfrescoInput('idAlfresco'),
            gearUserUpdatePage.setLoginAttemptsInput('5'),
            gearUserUpdatePage.setLastUpdatePasswordDateInput('2000-12-31'),
            gearUserUpdatePage.setPasswordResetKeyInput('passwordResetKey'),
            gearUserUpdatePage.setPinInput('5'),
            gearUserUpdatePage.gearOrganizationalUnitSelectLastOption()
        ]);
        expect(await gearUserUpdatePage.getNameInput()).to.eq('name');
        expect(await gearUserUpdatePage.getPasswordInput()).to.eq('password');
        expect(await gearUserUpdatePage.getEmailInput()).to.eq('email');
        expect(await gearUserUpdatePage.getAvatarInput()).to.eq('avatar');
        expect(await gearUserUpdatePage.getProfileInput()).to.eq('profile');
        const selectedState = gearUserUpdatePage.getStateInput();
        if (await selectedState.isSelected()) {
            await gearUserUpdatePage.getStateInput().click();
            expect(await gearUserUpdatePage.getStateInput().isSelected()).to.be.false;
        } else {
            await gearUserUpdatePage.getStateInput().click();
            expect(await gearUserUpdatePage.getStateInput().isSelected()).to.be.true;
        }
        expect(await gearUserUpdatePage.getIdAlfrescoInput()).to.eq('idAlfresco');
        expect(await gearUserUpdatePage.getLoginAttemptsInput()).to.eq('5');
        expect(await gearUserUpdatePage.getLastUpdatePasswordDateInput()).to.eq('2000-12-31');
        expect(await gearUserUpdatePage.getPasswordResetKeyInput()).to.eq('passwordResetKey');
        expect(await gearUserUpdatePage.getPinInput()).to.eq('5');
        await gearUserUpdatePage.save();
        expect(await gearUserUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearUser', async () => {
        const nbButtonsBeforeDelete = await gearUserComponentsPage.countDeleteButtons();
        await gearUserComponentsPage.clickOnLastDeleteButton();

        gearUserDeleteDialog = new GearUserDeleteDialog();
        expect(await gearUserDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearUser.delete.question');
        await gearUserDeleteDialog.clickOnConfirmButton();

        expect(await gearUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
