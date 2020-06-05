/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GearProjectComponentsPage, GearProjectDeleteDialog, GearProjectUpdatePage } from './gear-project.page-object';

const expect = chai.expect;

describe('GearProject e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearProjectUpdatePage: GearProjectUpdatePage;
    let gearProjectComponentsPage: GearProjectComponentsPage;
    let gearProjectDeleteDialog: GearProjectDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearProjects', async () => {
        await navBarPage.goToEntity('gear-project');
        gearProjectComponentsPage = new GearProjectComponentsPage();
        expect(await gearProjectComponentsPage.getTitle()).to.eq('geargatewayApp.gearProject.home.title');
    });

    it('should load create GearProject page', async () => {
        await gearProjectComponentsPage.clickOnCreateButton();
        gearProjectUpdatePage = new GearProjectUpdatePage();
        expect(await gearProjectUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearProject.home.createOrEditLabel');
        await gearProjectUpdatePage.cancel();
    });

    it('should create and save GearProjects', async () => {
        const nbButtonsBeforeCreate = await gearProjectComponentsPage.countDeleteButtons();

        await gearProjectComponentsPage.clickOnCreateButton();
        await promise.all([
            gearProjectUpdatePage.setNameInput('name'),
            gearProjectUpdatePage.setDescriptionInput('description'),
            gearProjectUpdatePage.setBudgetInput('5'),
            gearProjectUpdatePage.setPercentageCompletedInput('5'),
            gearProjectUpdatePage.setSpendInput('5'),
            gearProjectUpdatePage.setStartDateInput('2000-12-31'),
            gearProjectUpdatePage.setEndDateInput('2000-12-31'),
            gearProjectUpdatePage.setAttachInput('attach'),
            gearProjectUpdatePage.setCreatedByInput('createdBy'),
            gearProjectUpdatePage.setCreationDateInput('2000-12-31'),
            gearProjectUpdatePage.setLastModifiedByInput('lastModifiedBy'),
            gearProjectUpdatePage.setLastModifiedDateInput('2000-12-31'),
            // gearProjectUpdatePage.gearIterationSelectLastOption(),
            gearProjectUpdatePage.gearPortfolioSelectLastOption()
        ]);
        expect(await gearProjectUpdatePage.getNameInput()).to.eq('name');
        expect(await gearProjectUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await gearProjectUpdatePage.getBudgetInput()).to.eq('5');
        expect(await gearProjectUpdatePage.getPercentageCompletedInput()).to.eq('5');
        expect(await gearProjectUpdatePage.getSpendInput()).to.eq('5');
        expect(await gearProjectUpdatePage.getStartDateInput()).to.eq('2000-12-31');
        expect(await gearProjectUpdatePage.getEndDateInput()).to.eq('2000-12-31');
        expect(await gearProjectUpdatePage.getAttachInput()).to.eq('attach');
        expect(await gearProjectUpdatePage.getCreatedByInput()).to.eq('createdBy');
        expect(await gearProjectUpdatePage.getCreationDateInput()).to.eq('2000-12-31');
        expect(await gearProjectUpdatePage.getLastModifiedByInput()).to.eq('lastModifiedBy');
        expect(await gearProjectUpdatePage.getLastModifiedDateInput()).to.eq('2000-12-31');
        await gearProjectUpdatePage.save();
        expect(await gearProjectUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearProjectComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearProject', async () => {
        const nbButtonsBeforeDelete = await gearProjectComponentsPage.countDeleteButtons();
        await gearProjectComponentsPage.clickOnLastDeleteButton();

        gearProjectDeleteDialog = new GearProjectDeleteDialog();
        expect(await gearProjectDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearProject.delete.question');
        await gearProjectDeleteDialog.clickOnConfirmButton();

        expect(await gearProjectComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
