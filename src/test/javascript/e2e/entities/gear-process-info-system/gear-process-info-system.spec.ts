/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    GearProcessInfoSystemComponentsPage,
    GearProcessInfoSystemDeleteDialog,
    GearProcessInfoSystemUpdatePage
} from './gear-process-info-system.page-object';

const expect = chai.expect;

describe('GearProcessInfoSystem e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearProcessInfoSystemUpdatePage: GearProcessInfoSystemUpdatePage;
    let gearProcessInfoSystemComponentsPage: GearProcessInfoSystemComponentsPage;
    let gearProcessInfoSystemDeleteDialog: GearProcessInfoSystemDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearProcessInfoSystems', async () => {
        await navBarPage.goToEntity('gear-process-info-system');
        gearProcessInfoSystemComponentsPage = new GearProcessInfoSystemComponentsPage();
        expect(await gearProcessInfoSystemComponentsPage.getTitle()).to.eq('geargatewayApp.gearProcessInfoSystem.home.title');
    });

    it('should load create GearProcessInfoSystem page', async () => {
        await gearProcessInfoSystemComponentsPage.clickOnCreateButton();
        gearProcessInfoSystemUpdatePage = new GearProcessInfoSystemUpdatePage();
        expect(await gearProcessInfoSystemUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearProcessInfoSystem.home.createOrEditLabel');
        await gearProcessInfoSystemUpdatePage.cancel();
    });

    it('should create and save GearProcessInfoSystems', async () => {
        const nbButtonsBeforeCreate = await gearProcessInfoSystemComponentsPage.countDeleteButtons();

        await gearProcessInfoSystemComponentsPage.clickOnCreateButton();
        await promise.all([
            gearProcessInfoSystemUpdatePage.gearinformationsystemsSelectLastOption(),
            gearProcessInfoSystemUpdatePage.gearvaluechainprocessSelectLastOption()
        ]);
        await gearProcessInfoSystemUpdatePage.save();
        expect(await gearProcessInfoSystemUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearProcessInfoSystemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearProcessInfoSystem', async () => {
        const nbButtonsBeforeDelete = await gearProcessInfoSystemComponentsPage.countDeleteButtons();
        await gearProcessInfoSystemComponentsPage.clickOnLastDeleteButton();

        gearProcessInfoSystemDeleteDialog = new GearProcessInfoSystemDeleteDialog();
        expect(await gearProcessInfoSystemDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearProcessInfoSystem.delete.question');
        await gearProcessInfoSystemDeleteDialog.clickOnConfirmButton();

        expect(await gearProcessInfoSystemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
