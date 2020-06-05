/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GearCriteriaComponentsPage, GearCriteriaDeleteDialog, GearCriteriaUpdatePage } from './gear-criteria.page-object';

const expect = chai.expect;

describe('GearCriteria e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearCriteriaUpdatePage: GearCriteriaUpdatePage;
    let gearCriteriaComponentsPage: GearCriteriaComponentsPage;
    let gearCriteriaDeleteDialog: GearCriteriaDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearCriteria', async () => {
        await navBarPage.goToEntity('gear-criteria');
        gearCriteriaComponentsPage = new GearCriteriaComponentsPage();
        expect(await gearCriteriaComponentsPage.getTitle()).to.eq('geargatewayApp.gearCriteria.home.title');
    });

    it('should load create GearCriteria page', async () => {
        await gearCriteriaComponentsPage.clickOnCreateButton();
        gearCriteriaUpdatePage = new GearCriteriaUpdatePage();
        expect(await gearCriteriaUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearCriteria.home.createOrEditLabel');
        await gearCriteriaUpdatePage.cancel();
    });

    it('should create and save GearCriteria', async () => {
        const nbButtonsBeforeCreate = await gearCriteriaComponentsPage.countDeleteButtons();

        await gearCriteriaComponentsPage.clickOnCreateButton();
        await promise.all([
            gearCriteriaUpdatePage.setNameInput('name'),
            gearCriteriaUpdatePage.setDescriptionInput('description'),
            gearCriteriaUpdatePage.geardecisionSelectLastOption()
        ]);
        expect(await gearCriteriaUpdatePage.getNameInput()).to.eq('name');
        expect(await gearCriteriaUpdatePage.getDescriptionInput()).to.eq('description');
        await gearCriteriaUpdatePage.save();
        expect(await gearCriteriaUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearCriteriaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearCriteria', async () => {
        const nbButtonsBeforeDelete = await gearCriteriaComponentsPage.countDeleteButtons();
        await gearCriteriaComponentsPage.clickOnLastDeleteButton();

        gearCriteriaDeleteDialog = new GearCriteriaDeleteDialog();
        expect(await gearCriteriaDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearCriteria.delete.question');
        await gearCriteriaDeleteDialog.clickOnConfirmButton();

        expect(await gearCriteriaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
