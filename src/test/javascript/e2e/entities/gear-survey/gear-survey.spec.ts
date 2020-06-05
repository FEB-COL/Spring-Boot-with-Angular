/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GearSurveyComponentsPage, GearSurveyDeleteDialog, GearSurveyUpdatePage } from './gear-survey.page-object';

const expect = chai.expect;

describe('GearSurvey e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearSurveyUpdatePage: GearSurveyUpdatePage;
    let gearSurveyComponentsPage: GearSurveyComponentsPage;
    let gearSurveyDeleteDialog: GearSurveyDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearSurveys', async () => {
        await navBarPage.goToEntity('gear-survey');
        gearSurveyComponentsPage = new GearSurveyComponentsPage();
        expect(await gearSurveyComponentsPage.getTitle()).to.eq('geargatewayApp.gearSurvey.home.title');
    });

    it('should load create GearSurvey page', async () => {
        await gearSurveyComponentsPage.clickOnCreateButton();
        gearSurveyUpdatePage = new GearSurveyUpdatePage();
        expect(await gearSurveyUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearSurvey.home.createOrEditLabel');
        await gearSurveyUpdatePage.cancel();
    });

    it('should create and save GearSurveys', async () => {
        const nbButtonsBeforeCreate = await gearSurveyComponentsPage.countDeleteButtons();

        await gearSurveyComponentsPage.clickOnCreateButton();
        await promise.all([
            gearSurveyUpdatePage.setNameInput('name'),
            gearSurveyUpdatePage.setStartInput('2000-12-31'),
            gearSurveyUpdatePage.setEndInput('2000-12-31'),
            gearSurveyUpdatePage.setDescriptionInput('description'),
            gearSurveyUpdatePage.gearOrganizationalUnitSelectLastOption()
        ]);
        expect(await gearSurveyUpdatePage.getNameInput()).to.eq('name');
        expect(await gearSurveyUpdatePage.getStartInput()).to.eq('2000-12-31');
        expect(await gearSurveyUpdatePage.getEndInput()).to.eq('2000-12-31');
        expect(await gearSurveyUpdatePage.getDescriptionInput()).to.eq('description');
        await gearSurveyUpdatePage.save();
        expect(await gearSurveyUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearSurveyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearSurvey', async () => {
        const nbButtonsBeforeDelete = await gearSurveyComponentsPage.countDeleteButtons();
        await gearSurveyComponentsPage.clickOnLastDeleteButton();

        gearSurveyDeleteDialog = new GearSurveyDeleteDialog();
        expect(await gearSurveyDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearSurvey.delete.question');
        await gearSurveyDeleteDialog.clickOnConfirmButton();

        expect(await gearSurveyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
