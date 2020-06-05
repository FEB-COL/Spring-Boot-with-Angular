/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GearRiskLogComponentsPage, GearRiskLogDeleteDialog, GearRiskLogUpdatePage } from './gear-risk-log.page-object';

const expect = chai.expect;

describe('GearRiskLog e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearRiskLogUpdatePage: GearRiskLogUpdatePage;
    let gearRiskLogComponentsPage: GearRiskLogComponentsPage;
    let gearRiskLogDeleteDialog: GearRiskLogDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearRiskLogs', async () => {
        await navBarPage.goToEntity('gear-risk-log');
        gearRiskLogComponentsPage = new GearRiskLogComponentsPage();
        expect(await gearRiskLogComponentsPage.getTitle()).to.eq('geargatewayApp.gearRiskLog.home.title');
    });

    it('should load create GearRiskLog page', async () => {
        await gearRiskLogComponentsPage.clickOnCreateButton();
        gearRiskLogUpdatePage = new GearRiskLogUpdatePage();
        expect(await gearRiskLogUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearRiskLog.home.createOrEditLabel');
        await gearRiskLogUpdatePage.cancel();
    });

    it('should create and save GearRiskLogs', async () => {
        const nbButtonsBeforeCreate = await gearRiskLogComponentsPage.countDeleteButtons();

        await gearRiskLogComponentsPage.clickOnCreateButton();
        await promise.all([
            gearRiskLogUpdatePage.setLogInput('log'),
            gearRiskLogUpdatePage.setDateInput('2000-12-31'),
            gearRiskLogUpdatePage.setCreatedByInput('createdBy'),
            gearRiskLogUpdatePage.setCreationDateInput('2000-12-31'),
            gearRiskLogUpdatePage.setLastModifiedByInput('lastModifiedBy'),
            gearRiskLogUpdatePage.setLastModifiedDateInput('2000-12-31'),
            gearRiskLogUpdatePage.gearProjectRiskSelectLastOption()
        ]);
        expect(await gearRiskLogUpdatePage.getLogInput()).to.eq('log');
        expect(await gearRiskLogUpdatePage.getDateInput()).to.eq('2000-12-31');
        expect(await gearRiskLogUpdatePage.getCreatedByInput()).to.eq('createdBy');
        expect(await gearRiskLogUpdatePage.getCreationDateInput()).to.eq('2000-12-31');
        expect(await gearRiskLogUpdatePage.getLastModifiedByInput()).to.eq('lastModifiedBy');
        expect(await gearRiskLogUpdatePage.getLastModifiedDateInput()).to.eq('2000-12-31');
        await gearRiskLogUpdatePage.save();
        expect(await gearRiskLogUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearRiskLogComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearRiskLog', async () => {
        const nbButtonsBeforeDelete = await gearRiskLogComponentsPage.countDeleteButtons();
        await gearRiskLogComponentsPage.clickOnLastDeleteButton();

        gearRiskLogDeleteDialog = new GearRiskLogDeleteDialog();
        expect(await gearRiskLogDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearRiskLog.delete.question');
        await gearRiskLogDeleteDialog.clickOnConfirmButton();

        expect(await gearRiskLogComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
