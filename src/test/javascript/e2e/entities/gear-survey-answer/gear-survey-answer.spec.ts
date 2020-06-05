/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GearSurveyAnswerComponentsPage, GearSurveyAnswerDeleteDialog, GearSurveyAnswerUpdatePage } from './gear-survey-answer.page-object';

const expect = chai.expect;

describe('GearSurveyAnswer e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearSurveyAnswerUpdatePage: GearSurveyAnswerUpdatePage;
    let gearSurveyAnswerComponentsPage: GearSurveyAnswerComponentsPage;
    let gearSurveyAnswerDeleteDialog: GearSurveyAnswerDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearSurveyAnswers', async () => {
        await navBarPage.goToEntity('gear-survey-answer');
        gearSurveyAnswerComponentsPage = new GearSurveyAnswerComponentsPage();
        expect(await gearSurveyAnswerComponentsPage.getTitle()).to.eq('geargatewayApp.gearSurveyAnswer.home.title');
    });

    it('should load create GearSurveyAnswer page', async () => {
        await gearSurveyAnswerComponentsPage.clickOnCreateButton();
        gearSurveyAnswerUpdatePage = new GearSurveyAnswerUpdatePage();
        expect(await gearSurveyAnswerUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearSurveyAnswer.home.createOrEditLabel');
        await gearSurveyAnswerUpdatePage.cancel();
    });

    it('should create and save GearSurveyAnswers', async () => {
        const nbButtonsBeforeCreate = await gearSurveyAnswerComponentsPage.countDeleteButtons();

        await gearSurveyAnswerComponentsPage.clickOnCreateButton();
        await promise.all([
            gearSurveyAnswerUpdatePage.setTextInput('text'),
            gearSurveyAnswerUpdatePage.gearsurveyquestionSelectLastOption()
        ]);
        expect(await gearSurveyAnswerUpdatePage.getTextInput()).to.eq('text');
        const selectedIsCorrect = gearSurveyAnswerUpdatePage.getIsCorrectInput();
        if (await selectedIsCorrect.isSelected()) {
            await gearSurveyAnswerUpdatePage.getIsCorrectInput().click();
            expect(await gearSurveyAnswerUpdatePage.getIsCorrectInput().isSelected()).to.be.false;
        } else {
            await gearSurveyAnswerUpdatePage.getIsCorrectInput().click();
            expect(await gearSurveyAnswerUpdatePage.getIsCorrectInput().isSelected()).to.be.true;
        }
        await gearSurveyAnswerUpdatePage.save();
        expect(await gearSurveyAnswerUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearSurveyAnswerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearSurveyAnswer', async () => {
        const nbButtonsBeforeDelete = await gearSurveyAnswerComponentsPage.countDeleteButtons();
        await gearSurveyAnswerComponentsPage.clickOnLastDeleteButton();

        gearSurveyAnswerDeleteDialog = new GearSurveyAnswerDeleteDialog();
        expect(await gearSurveyAnswerDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearSurveyAnswer.delete.question');
        await gearSurveyAnswerDeleteDialog.clickOnConfirmButton();

        expect(await gearSurveyAnswerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
