/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    GearSurveyQuestionComponentsPage,
    GearSurveyQuestionDeleteDialog,
    GearSurveyQuestionUpdatePage
} from './gear-survey-question.page-object';

const expect = chai.expect;

describe('GearSurveyQuestion e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearSurveyQuestionUpdatePage: GearSurveyQuestionUpdatePage;
    let gearSurveyQuestionComponentsPage: GearSurveyQuestionComponentsPage;
    let gearSurveyQuestionDeleteDialog: GearSurveyQuestionDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearSurveyQuestions', async () => {
        await navBarPage.goToEntity('gear-survey-question');
        gearSurveyQuestionComponentsPage = new GearSurveyQuestionComponentsPage();
        expect(await gearSurveyQuestionComponentsPage.getTitle()).to.eq('geargatewayApp.gearSurveyQuestion.home.title');
    });

    it('should load create GearSurveyQuestion page', async () => {
        await gearSurveyQuestionComponentsPage.clickOnCreateButton();
        gearSurveyQuestionUpdatePage = new GearSurveyQuestionUpdatePage();
        expect(await gearSurveyQuestionUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearSurveyQuestion.home.createOrEditLabel');
        await gearSurveyQuestionUpdatePage.cancel();
    });

    it('should create and save GearSurveyQuestions', async () => {
        const nbButtonsBeforeCreate = await gearSurveyQuestionComponentsPage.countDeleteButtons();

        await gearSurveyQuestionComponentsPage.clickOnCreateButton();
        await promise.all([
            gearSurveyQuestionUpdatePage.setTextInput('text'),
            gearSurveyQuestionUpdatePage.setDescriptionInput('description'),
            gearSurveyQuestionUpdatePage.setCorrectAnswerInput('5'),
            gearSurveyQuestionUpdatePage.gearsurveySelectLastOption(),
            gearSurveyQuestionUpdatePage.gearsurveyquestiontypeSelectLastOption()
        ]);
        expect(await gearSurveyQuestionUpdatePage.getTextInput()).to.eq('text');
        expect(await gearSurveyQuestionUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await gearSurveyQuestionUpdatePage.getCorrectAnswerInput()).to.eq('5');
        await gearSurveyQuestionUpdatePage.save();
        expect(await gearSurveyQuestionUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearSurveyQuestionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearSurveyQuestion', async () => {
        const nbButtonsBeforeDelete = await gearSurveyQuestionComponentsPage.countDeleteButtons();
        await gearSurveyQuestionComponentsPage.clickOnLastDeleteButton();

        gearSurveyQuestionDeleteDialog = new GearSurveyQuestionDeleteDialog();
        expect(await gearSurveyQuestionDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearSurveyQuestion.delete.question');
        await gearSurveyQuestionDeleteDialog.clickOnConfirmButton();

        expect(await gearSurveyQuestionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
