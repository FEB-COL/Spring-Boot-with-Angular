/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    GearGoalsStrategyAEComponentsPage,
    GearGoalsStrategyAEDeleteDialog,
    GearGoalsStrategyAEUpdatePage
} from './gear-goals-strategy-ae.page-object';

const expect = chai.expect;

describe('GearGoalsStrategyAE e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearGoalsStrategyAEUpdatePage: GearGoalsStrategyAEUpdatePage;
    let gearGoalsStrategyAEComponentsPage: GearGoalsStrategyAEComponentsPage;
    let gearGoalsStrategyAEDeleteDialog: GearGoalsStrategyAEDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearGoalsStrategyAES', async () => {
        await navBarPage.goToEntity('gear-goals-strategy-ae');
        gearGoalsStrategyAEComponentsPage = new GearGoalsStrategyAEComponentsPage();
        expect(await gearGoalsStrategyAEComponentsPage.getTitle()).to.eq('geargatewayApp.gearGoalsStrategyAE.home.title');
    });

    it('should load create GearGoalsStrategyAE page', async () => {
        await gearGoalsStrategyAEComponentsPage.clickOnCreateButton();
        gearGoalsStrategyAEUpdatePage = new GearGoalsStrategyAEUpdatePage();
        expect(await gearGoalsStrategyAEUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearGoalsStrategyAE.home.createOrEditLabel');
        await gearGoalsStrategyAEUpdatePage.cancel();
    });

    it('should create and save GearGoalsStrategyAES', async () => {
        const nbButtonsBeforeCreate = await gearGoalsStrategyAEComponentsPage.countDeleteButtons();

        await gearGoalsStrategyAEComponentsPage.clickOnCreateButton();
        await promise.all([
            gearGoalsStrategyAEUpdatePage.setNameInput('name'),
            gearGoalsStrategyAEUpdatePage.setDrescriptionInput('drescription'),
            gearGoalsStrategyAEUpdatePage.gearOrganizationalUnitSelectLastOption()
        ]);
        expect(await gearGoalsStrategyAEUpdatePage.getNameInput()).to.eq('name');
        expect(await gearGoalsStrategyAEUpdatePage.getDrescriptionInput()).to.eq('drescription');
        await gearGoalsStrategyAEUpdatePage.save();
        expect(await gearGoalsStrategyAEUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearGoalsStrategyAEComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearGoalsStrategyAE', async () => {
        const nbButtonsBeforeDelete = await gearGoalsStrategyAEComponentsPage.countDeleteButtons();
        await gearGoalsStrategyAEComponentsPage.clickOnLastDeleteButton();

        gearGoalsStrategyAEDeleteDialog = new GearGoalsStrategyAEDeleteDialog();
        expect(await gearGoalsStrategyAEDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearGoalsStrategyAE.delete.question');
        await gearGoalsStrategyAEDeleteDialog.clickOnConfirmButton();

        expect(await gearGoalsStrategyAEComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
