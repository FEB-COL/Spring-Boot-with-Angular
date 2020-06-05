/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    GearSurveyQuestionTypeComponentsPage,
    GearSurveyQuestionTypeDeleteDialog,
    GearSurveyQuestionTypeUpdatePage
} from './gear-survey-question-type.page-object';

const expect = chai.expect;

describe('GearSurveyQuestionType e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearSurveyQuestionTypeUpdatePage: GearSurveyQuestionTypeUpdatePage;
    let gearSurveyQuestionTypeComponentsPage: GearSurveyQuestionTypeComponentsPage;
    let gearSurveyQuestionTypeDeleteDialog: GearSurveyQuestionTypeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearSurveyQuestionTypes', async () => {
        await navBarPage.goToEntity('gear-survey-question-type');
        gearSurveyQuestionTypeComponentsPage = new GearSurveyQuestionTypeComponentsPage();
        expect(await gearSurveyQuestionTypeComponentsPage.getTitle()).to.eq('geargatewayApp.gearSurveyQuestionType.home.title');
    });

    it('should load create GearSurveyQuestionType page', async () => {
        await gearSurveyQuestionTypeComponentsPage.clickOnCreateButton();
        gearSurveyQuestionTypeUpdatePage = new GearSurveyQuestionTypeUpdatePage();
        expect(await gearSurveyQuestionTypeUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearSurveyQuestionType.home.createOrEditLabel');
        await gearSurveyQuestionTypeUpdatePage.cancel();
    });

    it('should create and save GearSurveyQuestionTypes', async () => {
        const nbButtonsBeforeCreate = await gearSurveyQuestionTypeComponentsPage.countDeleteButtons();

        await gearSurveyQuestionTypeComponentsPage.clickOnCreateButton();
        await promise.all([
            gearSurveyQuestionTypeUpdatePage.setNameInput('name'),
            gearSurveyQuestionTypeUpdatePage.setDescriptionInput('description')
        ]);
        expect(await gearSurveyQuestionTypeUpdatePage.getNameInput()).to.eq('name');
        expect(await gearSurveyQuestionTypeUpdatePage.getDescriptionInput()).to.eq('description');
        await gearSurveyQuestionTypeUpdatePage.save();
        expect(await gearSurveyQuestionTypeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearSurveyQuestionTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearSurveyQuestionType', async () => {
        const nbButtonsBeforeDelete = await gearSurveyQuestionTypeComponentsPage.countDeleteButtons();
        await gearSurveyQuestionTypeComponentsPage.clickOnLastDeleteButton();

        gearSurveyQuestionTypeDeleteDialog = new GearSurveyQuestionTypeDeleteDialog();
        expect(await gearSurveyQuestionTypeDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearSurveyQuestionType.delete.question');
        await gearSurveyQuestionTypeDeleteDialog.clickOnConfirmButton();

        expect(await gearSurveyQuestionTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
