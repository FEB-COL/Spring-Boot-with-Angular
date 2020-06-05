/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GearProjectRiskComponentsPage, GearProjectRiskDeleteDialog, GearProjectRiskUpdatePage } from './gear-project-risk.page-object';

const expect = chai.expect;

describe('GearProjectRisk e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearProjectRiskUpdatePage: GearProjectRiskUpdatePage;
    let gearProjectRiskComponentsPage: GearProjectRiskComponentsPage;
    let gearProjectRiskDeleteDialog: GearProjectRiskDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearProjectRisks', async () => {
        await navBarPage.goToEntity('gear-project-risk');
        gearProjectRiskComponentsPage = new GearProjectRiskComponentsPage();
        expect(await gearProjectRiskComponentsPage.getTitle()).to.eq('geargatewayApp.gearProjectRisk.home.title');
    });

    it('should load create GearProjectRisk page', async () => {
        await gearProjectRiskComponentsPage.clickOnCreateButton();
        gearProjectRiskUpdatePage = new GearProjectRiskUpdatePage();
        expect(await gearProjectRiskUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearProjectRisk.home.createOrEditLabel');
        await gearProjectRiskUpdatePage.cancel();
    });

    it('should create and save GearProjectRisks', async () => {
        const nbButtonsBeforeCreate = await gearProjectRiskComponentsPage.countDeleteButtons();

        await gearProjectRiskComponentsPage.clickOnCreateButton();
        await promise.all([
            gearProjectRiskUpdatePage.setStatusInput('status'),
            gearProjectRiskUpdatePage.setImpactInput('5'),
            gearProjectRiskUpdatePage.setProbabilityInput('5'),
            gearProjectRiskUpdatePage.setDescriptionInput('description'),
            gearProjectRiskUpdatePage.setFirstImpactDateInput('2000-12-31'),
            gearProjectRiskUpdatePage.setMitigationStrategyInput('mitigationStrategy'),
            gearProjectRiskUpdatePage.setMitigationDescriptionInput('mitigationDescription'),
            gearProjectRiskUpdatePage.setExpectedCloseDateInput('2000-12-31'),
            gearProjectRiskUpdatePage.setCreatedByInput('createdBy'),
            gearProjectRiskUpdatePage.setCreationDateInput('2000-12-31'),
            gearProjectRiskUpdatePage.setLastModifiedByInput('lastModifiedBy'),
            gearProjectRiskUpdatePage.setLastModifiedDateInput('2000-12-31'),
            gearProjectRiskUpdatePage.gearProjectSelectLastOption()
        ]);
        expect(await gearProjectRiskUpdatePage.getStatusInput()).to.eq('status');
        expect(await gearProjectRiskUpdatePage.getImpactInput()).to.eq('5');
        expect(await gearProjectRiskUpdatePage.getProbabilityInput()).to.eq('5');
        expect(await gearProjectRiskUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await gearProjectRiskUpdatePage.getFirstImpactDateInput()).to.eq('2000-12-31');
        expect(await gearProjectRiskUpdatePage.getMitigationStrategyInput()).to.eq('mitigationStrategy');
        expect(await gearProjectRiskUpdatePage.getMitigationDescriptionInput()).to.eq('mitigationDescription');
        expect(await gearProjectRiskUpdatePage.getExpectedCloseDateInput()).to.eq('2000-12-31');
        expect(await gearProjectRiskUpdatePage.getCreatedByInput()).to.eq('createdBy');
        expect(await gearProjectRiskUpdatePage.getCreationDateInput()).to.eq('2000-12-31');
        expect(await gearProjectRiskUpdatePage.getLastModifiedByInput()).to.eq('lastModifiedBy');
        expect(await gearProjectRiskUpdatePage.getLastModifiedDateInput()).to.eq('2000-12-31');
        await gearProjectRiskUpdatePage.save();
        expect(await gearProjectRiskUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearProjectRiskComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearProjectRisk', async () => {
        const nbButtonsBeforeDelete = await gearProjectRiskComponentsPage.countDeleteButtons();
        await gearProjectRiskComponentsPage.clickOnLastDeleteButton();

        gearProjectRiskDeleteDialog = new GearProjectRiskDeleteDialog();
        expect(await gearProjectRiskDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearProjectRisk.delete.question');
        await gearProjectRiskDeleteDialog.clickOnConfirmButton();

        expect(await gearProjectRiskComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
