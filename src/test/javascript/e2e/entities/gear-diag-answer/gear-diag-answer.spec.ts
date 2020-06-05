/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GearDiagAnswerComponentsPage, GearDiagAnswerDeleteDialog, GearDiagAnswerUpdatePage } from './gear-diag-answer.page-object';

const expect = chai.expect;

describe('GearDiagAnswer e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearDiagAnswerUpdatePage: GearDiagAnswerUpdatePage;
    let gearDiagAnswerComponentsPage: GearDiagAnswerComponentsPage;
    let gearDiagAnswerDeleteDialog: GearDiagAnswerDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearDiagAnswers', async () => {
        await navBarPage.goToEntity('gear-diag-answer');
        gearDiagAnswerComponentsPage = new GearDiagAnswerComponentsPage();
        expect(await gearDiagAnswerComponentsPage.getTitle()).to.eq('geargatewayApp.gearDiagAnswer.home.title');
    });

    it('should load create GearDiagAnswer page', async () => {
        await gearDiagAnswerComponentsPage.clickOnCreateButton();
        gearDiagAnswerUpdatePage = new GearDiagAnswerUpdatePage();
        expect(await gearDiagAnswerUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearDiagAnswer.home.createOrEditLabel');
        await gearDiagAnswerUpdatePage.cancel();
    });

    it('should create and save GearDiagAnswers', async () => {
        const nbButtonsBeforeCreate = await gearDiagAnswerComponentsPage.countDeleteButtons();

        await gearDiagAnswerComponentsPage.clickOnCreateButton();
        await promise.all([
            gearDiagAnswerUpdatePage.setAnswerInput('5'),
            gearDiagAnswerUpdatePage.setCreationDateInput('2000-12-31'),
            gearDiagAnswerUpdatePage.gearDiagquestionSelectLastOption()
        ]);
        expect(await gearDiagAnswerUpdatePage.getAnswerInput()).to.eq('5');
        expect(await gearDiagAnswerUpdatePage.getCreationDateInput()).to.eq('2000-12-31');
        await gearDiagAnswerUpdatePage.save();
        expect(await gearDiagAnswerUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearDiagAnswerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearDiagAnswer', async () => {
        const nbButtonsBeforeDelete = await gearDiagAnswerComponentsPage.countDeleteButtons();
        await gearDiagAnswerComponentsPage.clickOnLastDeleteButton();

        gearDiagAnswerDeleteDialog = new GearDiagAnswerDeleteDialog();
        expect(await gearDiagAnswerDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearDiagAnswer.delete.question');
        await gearDiagAnswerDeleteDialog.clickOnConfirmButton();

        expect(await gearDiagAnswerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
