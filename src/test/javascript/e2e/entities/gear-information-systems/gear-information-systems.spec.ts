/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    GearInformationSystemsComponentsPage,
    GearInformationSystemsDeleteDialog,
    GearInformationSystemsUpdatePage
} from './gear-information-systems.page-object';

const expect = chai.expect;

describe('GearInformationSystems e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearInformationSystemsUpdatePage: GearInformationSystemsUpdatePage;
    let gearInformationSystemsComponentsPage: GearInformationSystemsComponentsPage;
    let gearInformationSystemsDeleteDialog: GearInformationSystemsDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearInformationSystems', async () => {
        await navBarPage.goToEntity('gear-information-systems');
        gearInformationSystemsComponentsPage = new GearInformationSystemsComponentsPage();
        expect(await gearInformationSystemsComponentsPage.getTitle()).to.eq('geargatewayApp.gearInformationSystems.home.title');
    });

    it('should load create GearInformationSystems page', async () => {
        await gearInformationSystemsComponentsPage.clickOnCreateButton();
        gearInformationSystemsUpdatePage = new GearInformationSystemsUpdatePage();
        expect(await gearInformationSystemsUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearInformationSystems.home.createOrEditLabel');
        await gearInformationSystemsUpdatePage.cancel();
    });

    it('should create and save GearInformationSystems', async () => {
        const nbButtonsBeforeCreate = await gearInformationSystemsComponentsPage.countDeleteButtons();

        await gearInformationSystemsComponentsPage.clickOnCreateButton();
        await promise.all([
            gearInformationSystemsUpdatePage.setNameInput('name'),
            gearInformationSystemsUpdatePage.setDescriptionInput('description'),
            gearInformationSystemsUpdatePage.setVersionInput('version'),
            gearInformationSystemsUpdatePage.setAcquisitionDateInput('2000-12-31'),
            gearInformationSystemsUpdatePage.setStartDateInput('2000-12-31'),
            gearInformationSystemsUpdatePage.setResponsibleInput('responsible'),
            gearInformationSystemsUpdatePage.setResponsibleEmailInput('responsibleEmail'),
            gearInformationSystemsUpdatePage.setProviderInput('provider'),
            gearInformationSystemsUpdatePage.setInitialCostInput('5'),
            gearInformationSystemsUpdatePage.setMainteinanceCostInput('5'),
            gearInformationSystemsUpdatePage.setCreationDateInput('2000-12-31'),
            gearInformationSystemsUpdatePage.setModifyDateInput('2000-12-31'),
            gearInformationSystemsUpdatePage.gearOrganizationalUnitSelectLastOption(),
            gearInformationSystemsUpdatePage.parCoinTypeSelectLastOption()
        ]);
        expect(await gearInformationSystemsUpdatePage.getNameInput()).to.eq('name');
        expect(await gearInformationSystemsUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await gearInformationSystemsUpdatePage.getVersionInput()).to.eq('version');
        expect(await gearInformationSystemsUpdatePage.getAcquisitionDateInput()).to.eq('2000-12-31');
        expect(await gearInformationSystemsUpdatePage.getStartDateInput()).to.eq('2000-12-31');
        expect(await gearInformationSystemsUpdatePage.getResponsibleInput()).to.eq('responsible');
        expect(await gearInformationSystemsUpdatePage.getResponsibleEmailInput()).to.eq('responsibleEmail');
        expect(await gearInformationSystemsUpdatePage.getProviderInput()).to.eq('provider');
        expect(await gearInformationSystemsUpdatePage.getInitialCostInput()).to.eq('5');
        expect(await gearInformationSystemsUpdatePage.getMainteinanceCostInput()).to.eq('5');
        expect(await gearInformationSystemsUpdatePage.getCreationDateInput()).to.eq('2000-12-31');
        expect(await gearInformationSystemsUpdatePage.getModifyDateInput()).to.eq('2000-12-31');
        await gearInformationSystemsUpdatePage.save();
        expect(await gearInformationSystemsUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearInformationSystemsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearInformationSystems', async () => {
        const nbButtonsBeforeDelete = await gearInformationSystemsComponentsPage.countDeleteButtons();
        await gearInformationSystemsComponentsPage.clickOnLastDeleteButton();

        gearInformationSystemsDeleteDialog = new GearInformationSystemsDeleteDialog();
        expect(await gearInformationSystemsDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearInformationSystems.delete.question');
        await gearInformationSystemsDeleteDialog.clickOnConfirmButton();

        expect(await gearInformationSystemsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
