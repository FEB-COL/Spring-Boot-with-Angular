/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GearDiagQuestionComponentsPage, GearDiagQuestionDeleteDialog, GearDiagQuestionUpdatePage } from './gear-diag-question.page-object';

const expect = chai.expect;

describe('GearDiagQuestion e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearDiagQuestionUpdatePage: GearDiagQuestionUpdatePage;
    let gearDiagQuestionComponentsPage: GearDiagQuestionComponentsPage;
    let gearDiagQuestionDeleteDialog: GearDiagQuestionDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearDiagQuestions', async () => {
        await navBarPage.goToEntity('gear-diag-question');
        gearDiagQuestionComponentsPage = new GearDiagQuestionComponentsPage();
        expect(await gearDiagQuestionComponentsPage.getTitle()).to.eq('geargatewayApp.gearDiagQuestion.home.title');
    });

    it('should load create GearDiagQuestion page', async () => {
        await gearDiagQuestionComponentsPage.clickOnCreateButton();
        gearDiagQuestionUpdatePage = new GearDiagQuestionUpdatePage();
        expect(await gearDiagQuestionUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearDiagQuestion.home.createOrEditLabel');
        await gearDiagQuestionUpdatePage.cancel();
    });

    it('should create and save GearDiagQuestions', async () => {
        const nbButtonsBeforeCreate = await gearDiagQuestionComponentsPage.countDeleteButtons();

        await gearDiagQuestionComponentsPage.clickOnCreateButton();
        await promise.all([
            gearDiagQuestionUpdatePage.setNameInput('name'),
            gearDiagQuestionUpdatePage.setDescriptionInput('description'),
            gearDiagQuestionUpdatePage.setCreationDateInput('2000-12-31'),
            gearDiagQuestionUpdatePage.gearDiagnosisSelectLastOption(),
            gearDiagQuestionUpdatePage.gearAmbitSelectLastOption()
        ]);
        expect(await gearDiagQuestionUpdatePage.getNameInput()).to.eq('name');
        expect(await gearDiagQuestionUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await gearDiagQuestionUpdatePage.getCreationDateInput()).to.eq('2000-12-31');
        await gearDiagQuestionUpdatePage.save();
        expect(await gearDiagQuestionUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearDiagQuestionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearDiagQuestion', async () => {
        const nbButtonsBeforeDelete = await gearDiagQuestionComponentsPage.countDeleteButtons();
        await gearDiagQuestionComponentsPage.clickOnLastDeleteButton();

        gearDiagQuestionDeleteDialog = new GearDiagQuestionDeleteDialog();
        expect(await gearDiagQuestionDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearDiagQuestion.delete.question');
        await gearDiagQuestionDeleteDialog.clickOnConfirmButton();

        expect(await gearDiagQuestionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
