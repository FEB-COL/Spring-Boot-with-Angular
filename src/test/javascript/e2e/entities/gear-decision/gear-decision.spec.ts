/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GearDecisionComponentsPage, GearDecisionDeleteDialog, GearDecisionUpdatePage } from './gear-decision.page-object';

const expect = chai.expect;

describe('GearDecision e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearDecisionUpdatePage: GearDecisionUpdatePage;
    let gearDecisionComponentsPage: GearDecisionComponentsPage;
    let gearDecisionDeleteDialog: GearDecisionDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearDecisions', async () => {
        await navBarPage.goToEntity('gear-decision');
        gearDecisionComponentsPage = new GearDecisionComponentsPage();
        expect(await gearDecisionComponentsPage.getTitle()).to.eq('geargatewayApp.gearDecision.home.title');
    });

    it('should load create GearDecision page', async () => {
        await gearDecisionComponentsPage.clickOnCreateButton();
        gearDecisionUpdatePage = new GearDecisionUpdatePage();
        expect(await gearDecisionUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearDecision.home.createOrEditLabel');
        await gearDecisionUpdatePage.cancel();
    });

    it('should create and save GearDecisions', async () => {
        const nbButtonsBeforeCreate = await gearDecisionComponentsPage.countDeleteButtons();

        await gearDecisionComponentsPage.clickOnCreateButton();
        await promise.all([
            gearDecisionUpdatePage.setNameInput('name'),
            gearDecisionUpdatePage.setGoalInput('goal'),
            gearDecisionUpdatePage.geardomainSelectLastOption()
        ]);
        expect(await gearDecisionUpdatePage.getNameInput()).to.eq('name');
        expect(await gearDecisionUpdatePage.getGoalInput()).to.eq('goal');
        await gearDecisionUpdatePage.save();
        expect(await gearDecisionUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearDecisionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearDecision', async () => {
        const nbButtonsBeforeDelete = await gearDecisionComponentsPage.countDeleteButtons();
        await gearDecisionComponentsPage.clickOnLastDeleteButton();

        gearDecisionDeleteDialog = new GearDecisionDeleteDialog();
        expect(await gearDecisionDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearDecision.delete.question');
        await gearDecisionDeleteDialog.clickOnConfirmButton();

        expect(await gearDecisionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
