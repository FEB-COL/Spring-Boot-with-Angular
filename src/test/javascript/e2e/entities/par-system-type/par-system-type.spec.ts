/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ParSystemTypeComponentsPage, ParSystemTypeDeleteDialog, ParSystemTypeUpdatePage } from './par-system-type.page-object';

const expect = chai.expect;

describe('ParSystemType e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let parSystemTypeUpdatePage: ParSystemTypeUpdatePage;
    let parSystemTypeComponentsPage: ParSystemTypeComponentsPage;
    let parSystemTypeDeleteDialog: ParSystemTypeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ParSystemTypes', async () => {
        await navBarPage.goToEntity('par-system-type');
        parSystemTypeComponentsPage = new ParSystemTypeComponentsPage();
        expect(await parSystemTypeComponentsPage.getTitle()).to.eq('geargatewayApp.parSystemType.home.title');
    });

    it('should load create ParSystemType page', async () => {
        await parSystemTypeComponentsPage.clickOnCreateButton();
        parSystemTypeUpdatePage = new ParSystemTypeUpdatePage();
        expect(await parSystemTypeUpdatePage.getPageTitle()).to.eq('geargatewayApp.parSystemType.home.createOrEditLabel');
        await parSystemTypeUpdatePage.cancel();
    });

    it('should create and save ParSystemTypes', async () => {
        const nbButtonsBeforeCreate = await parSystemTypeComponentsPage.countDeleteButtons();

        await parSystemTypeComponentsPage.clickOnCreateButton();
        await promise.all([parSystemTypeUpdatePage.setNameInput('name'), parSystemTypeUpdatePage.setDescriptionInput('description')]);
        expect(await parSystemTypeUpdatePage.getNameInput()).to.eq('name');
        expect(await parSystemTypeUpdatePage.getDescriptionInput()).to.eq('description');
        await parSystemTypeUpdatePage.save();
        expect(await parSystemTypeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await parSystemTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ParSystemType', async () => {
        const nbButtonsBeforeDelete = await parSystemTypeComponentsPage.countDeleteButtons();
        await parSystemTypeComponentsPage.clickOnLastDeleteButton();

        parSystemTypeDeleteDialog = new ParSystemTypeDeleteDialog();
        expect(await parSystemTypeDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.parSystemType.delete.question');
        await parSystemTypeDeleteDialog.clickOnConfirmButton();

        expect(await parSystemTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
