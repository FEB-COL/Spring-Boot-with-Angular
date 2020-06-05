/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GearSurveySolveComponentsPage, GearSurveySolveDeleteDialog, GearSurveySolveUpdatePage } from './gear-survey-solve.page-object';

const expect = chai.expect;

describe('GearSurveySolve e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearSurveySolveUpdatePage: GearSurveySolveUpdatePage;
    let gearSurveySolveComponentsPage: GearSurveySolveComponentsPage;
    let gearSurveySolveDeleteDialog: GearSurveySolveDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearSurveySolves', async () => {
        await navBarPage.goToEntity('gear-survey-solve');
        gearSurveySolveComponentsPage = new GearSurveySolveComponentsPage();
        expect(await gearSurveySolveComponentsPage.getTitle()).to.eq('geargatewayApp.gearSurveySolve.home.title');
    });

    it('should load create GearSurveySolve page', async () => {
        await gearSurveySolveComponentsPage.clickOnCreateButton();
        gearSurveySolveUpdatePage = new GearSurveySolveUpdatePage();
        expect(await gearSurveySolveUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearSurveySolve.home.createOrEditLabel');
        await gearSurveySolveUpdatePage.cancel();
    });

    it('should create and save GearSurveySolves', async () => {
        const nbButtonsBeforeCreate = await gearSurveySolveComponentsPage.countDeleteButtons();

        await gearSurveySolveComponentsPage.clickOnCreateButton();
        await promise.all([
            gearSurveySolveUpdatePage.setTextInput('text'),
            gearSurveySolveUpdatePage.gearsurveySelectLastOption(),
            gearSurveySolveUpdatePage.gearsurveyquestionSelectLastOption(),
            gearSurveySolveUpdatePage.gearsurveyanswerSelectLastOption(),
            gearSurveySolveUpdatePage.gearUserSelectLastOption()
        ]);
        expect(await gearSurveySolveUpdatePage.getTextInput()).to.eq('text');
        await gearSurveySolveUpdatePage.save();
        expect(await gearSurveySolveUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearSurveySolveComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearSurveySolve', async () => {
        const nbButtonsBeforeDelete = await gearSurveySolveComponentsPage.countDeleteButtons();
        await gearSurveySolveComponentsPage.clickOnLastDeleteButton();

        gearSurveySolveDeleteDialog = new GearSurveySolveDeleteDialog();
        expect(await gearSurveySolveDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearSurveySolve.delete.question');
        await gearSurveySolveDeleteDialog.clickOnConfirmButton();

        expect(await gearSurveySolveComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
