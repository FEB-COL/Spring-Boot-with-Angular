/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GearOptionComponentsPage, GearOptionDeleteDialog, GearOptionUpdatePage } from './gear-option.page-object';

const expect = chai.expect;

describe('GearOption e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearOptionUpdatePage: GearOptionUpdatePage;
    let gearOptionComponentsPage: GearOptionComponentsPage;
    let gearOptionDeleteDialog: GearOptionDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearOptions', async () => {
        await navBarPage.goToEntity('gear-option');
        gearOptionComponentsPage = new GearOptionComponentsPage();
        expect(await gearOptionComponentsPage.getTitle()).to.eq('geargatewayApp.gearOption.home.title');
    });

    it('should load create GearOption page', async () => {
        await gearOptionComponentsPage.clickOnCreateButton();
        gearOptionUpdatePage = new GearOptionUpdatePage();
        expect(await gearOptionUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearOption.home.createOrEditLabel');
        await gearOptionUpdatePage.cancel();
    });

    it('should create and save GearOptions', async () => {
        const nbButtonsBeforeCreate = await gearOptionComponentsPage.countDeleteButtons();

        await gearOptionComponentsPage.clickOnCreateButton();
        await promise.all([
            gearOptionUpdatePage.setNameInput('name'),
            gearOptionUpdatePage.setDescriptionInput('description'),
            gearOptionUpdatePage.geardecisionSelectLastOption()
        ]);
        expect(await gearOptionUpdatePage.getNameInput()).to.eq('name');
        expect(await gearOptionUpdatePage.getDescriptionInput()).to.eq('description');
        await gearOptionUpdatePage.save();
        expect(await gearOptionUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearOptionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearOption', async () => {
        const nbButtonsBeforeDelete = await gearOptionComponentsPage.countDeleteButtons();
        await gearOptionComponentsPage.clickOnLastDeleteButton();

        gearOptionDeleteDialog = new GearOptionDeleteDialog();
        expect(await gearOptionDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearOption.delete.question');
        await gearOptionDeleteDialog.clickOnConfirmButton();

        expect(await gearOptionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
