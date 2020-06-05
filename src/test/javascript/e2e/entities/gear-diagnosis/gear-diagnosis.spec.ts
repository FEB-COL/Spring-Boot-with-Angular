/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GearDiagnosisComponentsPage, GearDiagnosisDeleteDialog, GearDiagnosisUpdatePage } from './gear-diagnosis.page-object';

const expect = chai.expect;

describe('GearDiagnosis e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearDiagnosisUpdatePage: GearDiagnosisUpdatePage;
    let gearDiagnosisComponentsPage: GearDiagnosisComponentsPage;
    let gearDiagnosisDeleteDialog: GearDiagnosisDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearDiagnoses', async () => {
        await navBarPage.goToEntity('gear-diagnosis');
        gearDiagnosisComponentsPage = new GearDiagnosisComponentsPage();
        expect(await gearDiagnosisComponentsPage.getTitle()).to.eq('geargatewayApp.gearDiagnosis.home.title');
    });

    it('should load create GearDiagnosis page', async () => {
        await gearDiagnosisComponentsPage.clickOnCreateButton();
        gearDiagnosisUpdatePage = new GearDiagnosisUpdatePage();
        expect(await gearDiagnosisUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearDiagnosis.home.createOrEditLabel');
        await gearDiagnosisUpdatePage.cancel();
    });

    it('should create and save GearDiagnoses', async () => {
        const nbButtonsBeforeCreate = await gearDiagnosisComponentsPage.countDeleteButtons();

        await gearDiagnosisComponentsPage.clickOnCreateButton();
        await promise.all([
            gearDiagnosisUpdatePage.setNameInput('name'),
            gearDiagnosisUpdatePage.setDescriptionInput('description'),
            gearDiagnosisUpdatePage.setCreationDateInput('2000-12-31'),
            gearDiagnosisUpdatePage.setLevelMaturityInput('5'),
            gearDiagnosisUpdatePage.gearDiagnosisTypeSelectLastOption(),
            gearDiagnosisUpdatePage.gearDomainSelectLastOption()
        ]);
        expect(await gearDiagnosisUpdatePage.getNameInput()).to.eq('name');
        expect(await gearDiagnosisUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await gearDiagnosisUpdatePage.getCreationDateInput()).to.eq('2000-12-31');
        expect(await gearDiagnosisUpdatePage.getLevelMaturityInput()).to.eq('5');
        await gearDiagnosisUpdatePage.save();
        expect(await gearDiagnosisUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearDiagnosisComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearDiagnosis', async () => {
        const nbButtonsBeforeDelete = await gearDiagnosisComponentsPage.countDeleteButtons();
        await gearDiagnosisComponentsPage.clickOnLastDeleteButton();

        gearDiagnosisDeleteDialog = new GearDiagnosisDeleteDialog();
        expect(await gearDiagnosisDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearDiagnosis.delete.question');
        await gearDiagnosisDeleteDialog.clickOnConfirmButton();

        expect(await gearDiagnosisComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
