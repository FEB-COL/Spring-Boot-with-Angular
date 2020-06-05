/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    GearSmartStrategyAEComponentsPage,
    GearSmartStrategyAEDeleteDialog,
    GearSmartStrategyAEUpdatePage
} from './gear-smart-strategy-ae.page-object';

const expect = chai.expect;

describe('GearSmartStrategyAE e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearSmartStrategyAEUpdatePage: GearSmartStrategyAEUpdatePage;
    let gearSmartStrategyAEComponentsPage: GearSmartStrategyAEComponentsPage;
    let gearSmartStrategyAEDeleteDialog: GearSmartStrategyAEDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearSmartStrategyAES', async () => {
        await navBarPage.goToEntity('gear-smart-strategy-ae');
        gearSmartStrategyAEComponentsPage = new GearSmartStrategyAEComponentsPage();
        expect(await gearSmartStrategyAEComponentsPage.getTitle()).to.eq('geargatewayApp.gearSmartStrategyAE.home.title');
    });

    it('should load create GearSmartStrategyAE page', async () => {
        await gearSmartStrategyAEComponentsPage.clickOnCreateButton();
        gearSmartStrategyAEUpdatePage = new GearSmartStrategyAEUpdatePage();
        expect(await gearSmartStrategyAEUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearSmartStrategyAE.home.createOrEditLabel');
        await gearSmartStrategyAEUpdatePage.cancel();
    });

    it('should create and save GearSmartStrategyAES', async () => {
        const nbButtonsBeforeCreate = await gearSmartStrategyAEComponentsPage.countDeleteButtons();

        await gearSmartStrategyAEComponentsPage.clickOnCreateButton();
        await promise.all([
            gearSmartStrategyAEUpdatePage.setNameInput('name'),
            gearSmartStrategyAEUpdatePage.setDrescriptionInput('drescription'),
            gearSmartStrategyAEUpdatePage.geargoalsstrategyaeSelectLastOption()
        ]);
        expect(await gearSmartStrategyAEUpdatePage.getNameInput()).to.eq('name');
        expect(await gearSmartStrategyAEUpdatePage.getDrescriptionInput()).to.eq('drescription');
        await gearSmartStrategyAEUpdatePage.save();
        expect(await gearSmartStrategyAEUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearSmartStrategyAEComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearSmartStrategyAE', async () => {
        const nbButtonsBeforeDelete = await gearSmartStrategyAEComponentsPage.countDeleteButtons();
        await gearSmartStrategyAEComponentsPage.clickOnLastDeleteButton();

        gearSmartStrategyAEDeleteDialog = new GearSmartStrategyAEDeleteDialog();
        expect(await gearSmartStrategyAEDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearSmartStrategyAE.delete.question');
        await gearSmartStrategyAEDeleteDialog.clickOnConfirmButton();

        expect(await gearSmartStrategyAEComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
