/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GearPortfolioComponentsPage, GearPortfolioDeleteDialog, GearPortfolioUpdatePage } from './gear-portfolio.page-object';

const expect = chai.expect;

describe('GearPortfolio e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearPortfolioUpdatePage: GearPortfolioUpdatePage;
    let gearPortfolioComponentsPage: GearPortfolioComponentsPage;
    let gearPortfolioDeleteDialog: GearPortfolioDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearPortfolios', async () => {
        await navBarPage.goToEntity('gear-portfolio');
        gearPortfolioComponentsPage = new GearPortfolioComponentsPage();
        expect(await gearPortfolioComponentsPage.getTitle()).to.eq('geargatewayApp.gearPortfolio.home.title');
    });

    it('should load create GearPortfolio page', async () => {
        await gearPortfolioComponentsPage.clickOnCreateButton();
        gearPortfolioUpdatePage = new GearPortfolioUpdatePage();
        expect(await gearPortfolioUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearPortfolio.home.createOrEditLabel');
        await gearPortfolioUpdatePage.cancel();
    });

    it('should create and save GearPortfolios', async () => {
        const nbButtonsBeforeCreate = await gearPortfolioComponentsPage.countDeleteButtons();

        await gearPortfolioComponentsPage.clickOnCreateButton();
        await promise.all([
            gearPortfolioUpdatePage.setNameInput('name'),
            gearPortfolioUpdatePage.setDescriptionInput('description'),
            gearPortfolioUpdatePage.setStartDateInput('2000-12-31'),
            gearPortfolioUpdatePage.setCreatedByInput('createdBy'),
            gearPortfolioUpdatePage.setCreationDateInput('2000-12-31'),
            gearPortfolioUpdatePage.setLastModifiedByInput('lastModifiedBy'),
            gearPortfolioUpdatePage.setLastModifiedDateInput('2000-12-31'),
            gearPortfolioUpdatePage.gearOrganizationalUnitSelectLastOption()
        ]);
        expect(await gearPortfolioUpdatePage.getNameInput()).to.eq('name');
        expect(await gearPortfolioUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await gearPortfolioUpdatePage.getStartDateInput()).to.eq('2000-12-31');
        expect(await gearPortfolioUpdatePage.getCreatedByInput()).to.eq('createdBy');
        expect(await gearPortfolioUpdatePage.getCreationDateInput()).to.eq('2000-12-31');
        expect(await gearPortfolioUpdatePage.getLastModifiedByInput()).to.eq('lastModifiedBy');
        expect(await gearPortfolioUpdatePage.getLastModifiedDateInput()).to.eq('2000-12-31');
        await gearPortfolioUpdatePage.save();
        expect(await gearPortfolioUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearPortfolioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearPortfolio', async () => {
        const nbButtonsBeforeDelete = await gearPortfolioComponentsPage.countDeleteButtons();
        await gearPortfolioComponentsPage.clickOnLastDeleteButton();

        gearPortfolioDeleteDialog = new GearPortfolioDeleteDialog();
        expect(await gearPortfolioDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearPortfolio.delete.question');
        await gearPortfolioDeleteDialog.clickOnConfirmButton();

        expect(await gearPortfolioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
