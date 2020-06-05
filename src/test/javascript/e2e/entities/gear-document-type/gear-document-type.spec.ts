/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GearDocumentTypeComponentsPage, GearDocumentTypeDeleteDialog, GearDocumentTypeUpdatePage } from './gear-document-type.page-object';

const expect = chai.expect;

describe('GearDocumentType e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearDocumentTypeUpdatePage: GearDocumentTypeUpdatePage;
    let gearDocumentTypeComponentsPage: GearDocumentTypeComponentsPage;
    let gearDocumentTypeDeleteDialog: GearDocumentTypeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearDocumentTypes', async () => {
        await navBarPage.goToEntity('gear-document-type');
        gearDocumentTypeComponentsPage = new GearDocumentTypeComponentsPage();
        expect(await gearDocumentTypeComponentsPage.getTitle()).to.eq('geargatewayApp.gearDocumentType.home.title');
    });

    it('should load create GearDocumentType page', async () => {
        await gearDocumentTypeComponentsPage.clickOnCreateButton();
        gearDocumentTypeUpdatePage = new GearDocumentTypeUpdatePage();
        expect(await gearDocumentTypeUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearDocumentType.home.createOrEditLabel');
        await gearDocumentTypeUpdatePage.cancel();
    });

    it('should create and save GearDocumentTypes', async () => {
        const nbButtonsBeforeCreate = await gearDocumentTypeComponentsPage.countDeleteButtons();

        await gearDocumentTypeComponentsPage.clickOnCreateButton();
        await promise.all([gearDocumentTypeUpdatePage.setNameInput('name'), gearDocumentTypeUpdatePage.geardomainSelectLastOption()]);
        expect(await gearDocumentTypeUpdatePage.getNameInput()).to.eq('name');
        await gearDocumentTypeUpdatePage.save();
        expect(await gearDocumentTypeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearDocumentTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearDocumentType', async () => {
        const nbButtonsBeforeDelete = await gearDocumentTypeComponentsPage.countDeleteButtons();
        await gearDocumentTypeComponentsPage.clickOnLastDeleteButton();

        gearDocumentTypeDeleteDialog = new GearDocumentTypeDeleteDialog();
        expect(await gearDocumentTypeDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearDocumentType.delete.question');
        await gearDocumentTypeDeleteDialog.clickOnConfirmButton();

        expect(await gearDocumentTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
