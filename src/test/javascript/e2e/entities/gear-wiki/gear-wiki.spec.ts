/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GearWikiComponentsPage, GearWikiDeleteDialog, GearWikiUpdatePage } from './gear-wiki.page-object';

const expect = chai.expect;

describe('GearWiki e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearWikiUpdatePage: GearWikiUpdatePage;
    let gearWikiComponentsPage: GearWikiComponentsPage;
    let gearWikiDeleteDialog: GearWikiDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearWikis', async () => {
        await navBarPage.goToEntity('gear-wiki');
        gearWikiComponentsPage = new GearWikiComponentsPage();
        expect(await gearWikiComponentsPage.getTitle()).to.eq('geargatewayApp.gearWiki.home.title');
    });

    it('should load create GearWiki page', async () => {
        await gearWikiComponentsPage.clickOnCreateButton();
        gearWikiUpdatePage = new GearWikiUpdatePage();
        expect(await gearWikiUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearWiki.home.createOrEditLabel');
        await gearWikiUpdatePage.cancel();
    });

    it('should create and save GearWikis', async () => {
        const nbButtonsBeforeCreate = await gearWikiComponentsPage.countDeleteButtons();

        await gearWikiComponentsPage.clickOnCreateButton();
        await promise.all([
            gearWikiUpdatePage.setTitleInput('title'),
            gearWikiUpdatePage.setTextInput('text'),
            gearWikiUpdatePage.setIdImageInput('idImage')
        ]);
        expect(await gearWikiUpdatePage.getTitleInput()).to.eq('title');
        expect(await gearWikiUpdatePage.getTextInput()).to.eq('text');
        expect(await gearWikiUpdatePage.getIdImageInput()).to.eq('idImage');
        await gearWikiUpdatePage.save();
        expect(await gearWikiUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearWikiComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearWiki', async () => {
        const nbButtonsBeforeDelete = await gearWikiComponentsPage.countDeleteButtons();
        await gearWikiComponentsPage.clickOnLastDeleteButton();

        gearWikiDeleteDialog = new GearWikiDeleteDialog();
        expect(await gearWikiDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearWiki.delete.question');
        await gearWikiDeleteDialog.clickOnConfirmButton();

        expect(await gearWikiComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
