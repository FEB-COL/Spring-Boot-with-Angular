/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ParLicenceTypeComponentsPage, ParLicenceTypeDeleteDialog, ParLicenceTypeUpdatePage } from './par-licence-type.page-object';

const expect = chai.expect;

describe('ParLicenceType e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let parLicenceTypeUpdatePage: ParLicenceTypeUpdatePage;
    let parLicenceTypeComponentsPage: ParLicenceTypeComponentsPage;
    let parLicenceTypeDeleteDialog: ParLicenceTypeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ParLicenceTypes', async () => {
        await navBarPage.goToEntity('par-licence-type');
        parLicenceTypeComponentsPage = new ParLicenceTypeComponentsPage();
        expect(await parLicenceTypeComponentsPage.getTitle()).to.eq('geargatewayApp.parLicenceType.home.title');
    });

    it('should load create ParLicenceType page', async () => {
        await parLicenceTypeComponentsPage.clickOnCreateButton();
        parLicenceTypeUpdatePage = new ParLicenceTypeUpdatePage();
        expect(await parLicenceTypeUpdatePage.getPageTitle()).to.eq('geargatewayApp.parLicenceType.home.createOrEditLabel');
        await parLicenceTypeUpdatePage.cancel();
    });

    it('should create and save ParLicenceTypes', async () => {
        const nbButtonsBeforeCreate = await parLicenceTypeComponentsPage.countDeleteButtons();

        await parLicenceTypeComponentsPage.clickOnCreateButton();
        await promise.all([parLicenceTypeUpdatePage.setNameInput('name'), parLicenceTypeUpdatePage.setDescriptionInput('description')]);
        expect(await parLicenceTypeUpdatePage.getNameInput()).to.eq('name');
        expect(await parLicenceTypeUpdatePage.getDescriptionInput()).to.eq('description');
        await parLicenceTypeUpdatePage.save();
        expect(await parLicenceTypeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await parLicenceTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ParLicenceType', async () => {
        const nbButtonsBeforeDelete = await parLicenceTypeComponentsPage.countDeleteButtons();
        await parLicenceTypeComponentsPage.clickOnLastDeleteButton();

        parLicenceTypeDeleteDialog = new ParLicenceTypeDeleteDialog();
        expect(await parLicenceTypeDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.parLicenceType.delete.question');
        await parLicenceTypeDeleteDialog.clickOnConfirmButton();

        expect(await parLicenceTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
