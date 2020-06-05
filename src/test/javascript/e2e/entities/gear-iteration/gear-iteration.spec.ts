/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GearIterationComponentsPage, GearIterationDeleteDialog, GearIterationUpdatePage } from './gear-iteration.page-object';

const expect = chai.expect;

describe('GearIteration e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearIterationUpdatePage: GearIterationUpdatePage;
    let gearIterationComponentsPage: GearIterationComponentsPage;
    let gearIterationDeleteDialog: GearIterationDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearIterations', async () => {
        await navBarPage.goToEntity('gear-iteration');
        gearIterationComponentsPage = new GearIterationComponentsPage();
        expect(await gearIterationComponentsPage.getTitle()).to.eq('geargatewayApp.gearIteration.home.title');
    });

    it('should load create GearIteration page', async () => {
        await gearIterationComponentsPage.clickOnCreateButton();
        gearIterationUpdatePage = new GearIterationUpdatePage();
        expect(await gearIterationUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearIteration.home.createOrEditLabel');
        await gearIterationUpdatePage.cancel();
    });

    it('should create and save GearIterations', async () => {
        const nbButtonsBeforeCreate = await gearIterationComponentsPage.countDeleteButtons();

        await gearIterationComponentsPage.clickOnCreateButton();
        await promise.all([
            gearIterationUpdatePage.setNameInput('name'),
            gearIterationUpdatePage.setDescriptionInput('description'),
            gearIterationUpdatePage.setStartDateInput('2000-12-31'),
            gearIterationUpdatePage.setEndDateInput('2000-12-31'),
            gearIterationUpdatePage.setCreatedByInput('createdBy'),
            gearIterationUpdatePage.setCreationDateInput('2000-12-31'),
            gearIterationUpdatePage.setLastModifiedByInput('lastModifiedBy'),
            gearIterationUpdatePage.setLastModifiedDateInput('2000-12-31')
        ]);
        expect(await gearIterationUpdatePage.getNameInput()).to.eq('name');
        expect(await gearIterationUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await gearIterationUpdatePage.getStartDateInput()).to.eq('2000-12-31');
        expect(await gearIterationUpdatePage.getEndDateInput()).to.eq('2000-12-31');
        expect(await gearIterationUpdatePage.getCreatedByInput()).to.eq('createdBy');
        expect(await gearIterationUpdatePage.getCreationDateInput()).to.eq('2000-12-31');
        expect(await gearIterationUpdatePage.getLastModifiedByInput()).to.eq('lastModifiedBy');
        expect(await gearIterationUpdatePage.getLastModifiedDateInput()).to.eq('2000-12-31');
        await gearIterationUpdatePage.save();
        expect(await gearIterationUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearIterationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearIteration', async () => {
        const nbButtonsBeforeDelete = await gearIterationComponentsPage.countDeleteButtons();
        await gearIterationComponentsPage.clickOnLastDeleteButton();

        gearIterationDeleteDialog = new GearIterationDeleteDialog();
        expect(await gearIterationDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearIteration.delete.question');
        await gearIterationDeleteDialog.clickOnConfirmButton();

        expect(await gearIterationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
