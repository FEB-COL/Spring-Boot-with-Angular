/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GearAmbitComponentsPage, GearAmbitDeleteDialog, GearAmbitUpdatePage } from './gear-ambit.page-object';

const expect = chai.expect;

describe('GearAmbit e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearAmbitUpdatePage: GearAmbitUpdatePage;
    let gearAmbitComponentsPage: GearAmbitComponentsPage;
    let gearAmbitDeleteDialog: GearAmbitDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearAmbits', async () => {
        await navBarPage.goToEntity('gear-ambit');
        gearAmbitComponentsPage = new GearAmbitComponentsPage();
        expect(await gearAmbitComponentsPage.getTitle()).to.eq('geargatewayApp.gearAmbit.home.title');
    });

    it('should load create GearAmbit page', async () => {
        await gearAmbitComponentsPage.clickOnCreateButton();
        gearAmbitUpdatePage = new GearAmbitUpdatePage();
        expect(await gearAmbitUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearAmbit.home.createOrEditLabel');
        await gearAmbitUpdatePage.cancel();
    });

    it('should create and save GearAmbits', async () => {
        const nbButtonsBeforeCreate = await gearAmbitComponentsPage.countDeleteButtons();

        await gearAmbitComponentsPage.clickOnCreateButton();
        await promise.all([gearAmbitUpdatePage.setNameInput('name'), gearAmbitUpdatePage.setDescriptionInput('description')]);
        expect(await gearAmbitUpdatePage.getNameInput()).to.eq('name');
        expect(await gearAmbitUpdatePage.getDescriptionInput()).to.eq('description');
        await gearAmbitUpdatePage.save();
        expect(await gearAmbitUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearAmbitComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearAmbit', async () => {
        const nbButtonsBeforeDelete = await gearAmbitComponentsPage.countDeleteButtons();
        await gearAmbitComponentsPage.clickOnLastDeleteButton();

        gearAmbitDeleteDialog = new GearAmbitDeleteDialog();
        expect(await gearAmbitDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearAmbit.delete.question');
        await gearAmbitDeleteDialog.clickOnConfirmButton();

        expect(await gearAmbitComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
