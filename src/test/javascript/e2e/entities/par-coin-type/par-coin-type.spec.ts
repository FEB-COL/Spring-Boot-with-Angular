/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ParCoinTypeComponentsPage, ParCoinTypeDeleteDialog, ParCoinTypeUpdatePage } from './par-coin-type.page-object';

const expect = chai.expect;

describe('ParCoinType e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let parCoinTypeUpdatePage: ParCoinTypeUpdatePage;
    let parCoinTypeComponentsPage: ParCoinTypeComponentsPage;
    let parCoinTypeDeleteDialog: ParCoinTypeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ParCoinTypes', async () => {
        await navBarPage.goToEntity('par-coin-type');
        parCoinTypeComponentsPage = new ParCoinTypeComponentsPage();
        expect(await parCoinTypeComponentsPage.getTitle()).to.eq('geargatewayApp.parCoinType.home.title');
    });

    it('should load create ParCoinType page', async () => {
        await parCoinTypeComponentsPage.clickOnCreateButton();
        parCoinTypeUpdatePage = new ParCoinTypeUpdatePage();
        expect(await parCoinTypeUpdatePage.getPageTitle()).to.eq('geargatewayApp.parCoinType.home.createOrEditLabel');
        await parCoinTypeUpdatePage.cancel();
    });

    it('should create and save ParCoinTypes', async () => {
        const nbButtonsBeforeCreate = await parCoinTypeComponentsPage.countDeleteButtons();

        await parCoinTypeComponentsPage.clickOnCreateButton();
        await promise.all([
            parCoinTypeUpdatePage.setNameInput('name'),
            parCoinTypeUpdatePage.setDescriptionInput('description'),
            parCoinTypeUpdatePage.setSymbolInput('symbol')
        ]);
        expect(await parCoinTypeUpdatePage.getNameInput()).to.eq('name');
        expect(await parCoinTypeUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await parCoinTypeUpdatePage.getSymbolInput()).to.eq('symbol');
        await parCoinTypeUpdatePage.save();
        expect(await parCoinTypeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await parCoinTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ParCoinType', async () => {
        const nbButtonsBeforeDelete = await parCoinTypeComponentsPage.countDeleteButtons();
        await parCoinTypeComponentsPage.clickOnLastDeleteButton();

        parCoinTypeDeleteDialog = new ParCoinTypeDeleteDialog();
        expect(await parCoinTypeDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.parCoinType.delete.question');
        await parCoinTypeDeleteDialog.clickOnConfirmButton();

        expect(await parCoinTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
