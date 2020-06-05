/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    GearDiagnosisTypeComponentsPage,
    GearDiagnosisTypeDeleteDialog,
    GearDiagnosisTypeUpdatePage
} from './gear-diagnosis-type.page-object';

const expect = chai.expect;

describe('GearDiagnosisType e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearDiagnosisTypeUpdatePage: GearDiagnosisTypeUpdatePage;
    let gearDiagnosisTypeComponentsPage: GearDiagnosisTypeComponentsPage;
    let gearDiagnosisTypeDeleteDialog: GearDiagnosisTypeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearDiagnosisTypes', async () => {
        await navBarPage.goToEntity('gear-diagnosis-type');
        gearDiagnosisTypeComponentsPage = new GearDiagnosisTypeComponentsPage();
        expect(await gearDiagnosisTypeComponentsPage.getTitle()).to.eq('geargatewayApp.gearDiagnosisType.home.title');
    });

    it('should load create GearDiagnosisType page', async () => {
        await gearDiagnosisTypeComponentsPage.clickOnCreateButton();
        gearDiagnosisTypeUpdatePage = new GearDiagnosisTypeUpdatePage();
        expect(await gearDiagnosisTypeUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearDiagnosisType.home.createOrEditLabel');
        await gearDiagnosisTypeUpdatePage.cancel();
    });

    it('should create and save GearDiagnosisTypes', async () => {
        const nbButtonsBeforeCreate = await gearDiagnosisTypeComponentsPage.countDeleteButtons();

        await gearDiagnosisTypeComponentsPage.clickOnCreateButton();
        await promise.all([
            gearDiagnosisTypeUpdatePage.setNameInput('name'),
            gearDiagnosisTypeUpdatePage.setDescriptionInput('description')
        ]);
        expect(await gearDiagnosisTypeUpdatePage.getNameInput()).to.eq('name');
        expect(await gearDiagnosisTypeUpdatePage.getDescriptionInput()).to.eq('description');
        await gearDiagnosisTypeUpdatePage.save();
        expect(await gearDiagnosisTypeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearDiagnosisTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearDiagnosisType', async () => {
        const nbButtonsBeforeDelete = await gearDiagnosisTypeComponentsPage.countDeleteButtons();
        await gearDiagnosisTypeComponentsPage.clickOnLastDeleteButton();

        gearDiagnosisTypeDeleteDialog = new GearDiagnosisTypeDeleteDialog();
        expect(await gearDiagnosisTypeDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearDiagnosisType.delete.question');
        await gearDiagnosisTypeDeleteDialog.clickOnConfirmButton();

        expect(await gearDiagnosisTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
