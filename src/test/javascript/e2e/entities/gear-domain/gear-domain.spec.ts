/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GearDomainComponentsPage, GearDomainDeleteDialog, GearDomainUpdatePage } from './gear-domain.page-object';

const expect = chai.expect;

describe('GearDomain e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearDomainUpdatePage: GearDomainUpdatePage;
    let gearDomainComponentsPage: GearDomainComponentsPage;
    let gearDomainDeleteDialog: GearDomainDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearDomains', async () => {
        await navBarPage.goToEntity('gear-domain');
        gearDomainComponentsPage = new GearDomainComponentsPage();
        expect(await gearDomainComponentsPage.getTitle()).to.eq('geargatewayApp.gearDomain.home.title');
    });

    it('should load create GearDomain page', async () => {
        await gearDomainComponentsPage.clickOnCreateButton();
        gearDomainUpdatePage = new GearDomainUpdatePage();
        expect(await gearDomainUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearDomain.home.createOrEditLabel');
        await gearDomainUpdatePage.cancel();
    });

    it('should create and save GearDomains', async () => {
        const nbButtonsBeforeCreate = await gearDomainComponentsPage.countDeleteButtons();

        await gearDomainComponentsPage.clickOnCreateButton();
        await promise.all([
            gearDomainUpdatePage.setNameInput('name'),
            gearDomainUpdatePage.setDomainIdInput('domainId'),
            gearDomainUpdatePage.setCompanyIdInput('5'),
            gearDomainUpdatePage.setCompanyDescriptionInput('companyDescription'),
            gearDomainUpdatePage.setSiteIdInput('siteId'),
            gearDomainUpdatePage.setJhiStorageInput('5'),
            gearDomainUpdatePage.setStorageUsedInput('5'),
            gearDomainUpdatePage.setLevelMaturityInput('5'),
            gearDomainUpdatePage.setTotalWikiInput('5'),
            gearDomainUpdatePage.setTotalFileFinalVersionInput('5'),
            gearDomainUpdatePage.setTotalFileDraftInput('5'),
            gearDomainUpdatePage.setTotalFileUploadInput('5'),
            gearDomainUpdatePage.gearOrganizationalUnitSelectLastOption()
        ]);
        expect(await gearDomainUpdatePage.getNameInput()).to.eq('name');
        expect(await gearDomainUpdatePage.getDomainIdInput()).to.eq('domainId');
        expect(await gearDomainUpdatePage.getCompanyIdInput()).to.eq('5');
        expect(await gearDomainUpdatePage.getCompanyDescriptionInput()).to.eq('companyDescription');
        expect(await gearDomainUpdatePage.getSiteIdInput()).to.eq('siteId');
        expect(await gearDomainUpdatePage.getJhiStorageInput()).to.eq('5');
        expect(await gearDomainUpdatePage.getStorageUsedInput()).to.eq('5');
        expect(await gearDomainUpdatePage.getLevelMaturityInput()).to.eq('5');
        expect(await gearDomainUpdatePage.getTotalWikiInput()).to.eq('5');
        expect(await gearDomainUpdatePage.getTotalFileFinalVersionInput()).to.eq('5');
        expect(await gearDomainUpdatePage.getTotalFileDraftInput()).to.eq('5');
        expect(await gearDomainUpdatePage.getTotalFileUploadInput()).to.eq('5');
        await gearDomainUpdatePage.save();
        expect(await gearDomainUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearDomainComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearDomain', async () => {
        const nbButtonsBeforeDelete = await gearDomainComponentsPage.countDeleteButtons();
        await gearDomainComponentsPage.clickOnLastDeleteButton();

        gearDomainDeleteDialog = new GearDomainDeleteDialog();
        expect(await gearDomainDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearDomain.delete.question');
        await gearDomainDeleteDialog.clickOnConfirmButton();

        expect(await gearDomainComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
