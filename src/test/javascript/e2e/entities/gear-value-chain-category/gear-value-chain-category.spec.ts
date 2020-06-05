/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    GearValueChainCategoryComponentsPage,
    GearValueChainCategoryDeleteDialog,
    GearValueChainCategoryUpdatePage
} from './gear-value-chain-category.page-object';

const expect = chai.expect;

describe('GearValueChainCategory e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearValueChainCategoryUpdatePage: GearValueChainCategoryUpdatePage;
    let gearValueChainCategoryComponentsPage: GearValueChainCategoryComponentsPage;
    let gearValueChainCategoryDeleteDialog: GearValueChainCategoryDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearValueChainCategories', async () => {
        await navBarPage.goToEntity('gear-value-chain-category');
        gearValueChainCategoryComponentsPage = new GearValueChainCategoryComponentsPage();
        expect(await gearValueChainCategoryComponentsPage.getTitle()).to.eq('geargatewayApp.gearValueChainCategory.home.title');
    });

    it('should load create GearValueChainCategory page', async () => {
        await gearValueChainCategoryComponentsPage.clickOnCreateButton();
        gearValueChainCategoryUpdatePage = new GearValueChainCategoryUpdatePage();
        expect(await gearValueChainCategoryUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearValueChainCategory.home.createOrEditLabel');
        await gearValueChainCategoryUpdatePage.cancel();
    });

    it('should create and save GearValueChainCategories', async () => {
        const nbButtonsBeforeCreate = await gearValueChainCategoryComponentsPage.countDeleteButtons();

        await gearValueChainCategoryComponentsPage.clickOnCreateButton();
        await promise.all([
            gearValueChainCategoryUpdatePage.setNameInput('name'),
            gearValueChainCategoryUpdatePage.setDecriptionInput('decription'),
            gearValueChainCategoryUpdatePage.setColorInput('color'),
            gearValueChainCategoryUpdatePage.setCreationDateInput('2000-12-31'),
            gearValueChainCategoryUpdatePage.setLastUpdateInput('2000-12-31'),
            gearValueChainCategoryUpdatePage.gearOrganizationalUnitSelectLastOption()
        ]);
        expect(await gearValueChainCategoryUpdatePage.getNameInput()).to.eq('name');
        expect(await gearValueChainCategoryUpdatePage.getDecriptionInput()).to.eq('decription');
        expect(await gearValueChainCategoryUpdatePage.getColorInput()).to.eq('color');
        expect(await gearValueChainCategoryUpdatePage.getCreationDateInput()).to.eq('2000-12-31');
        expect(await gearValueChainCategoryUpdatePage.getLastUpdateInput()).to.eq('2000-12-31');
        await gearValueChainCategoryUpdatePage.save();
        expect(await gearValueChainCategoryUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearValueChainCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearValueChainCategory', async () => {
        const nbButtonsBeforeDelete = await gearValueChainCategoryComponentsPage.countDeleteButtons();
        await gearValueChainCategoryComponentsPage.clickOnLastDeleteButton();

        gearValueChainCategoryDeleteDialog = new GearValueChainCategoryDeleteDialog();
        expect(await gearValueChainCategoryDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearValueChainCategory.delete.question');
        await gearValueChainCategoryDeleteDialog.clickOnConfirmButton();

        expect(await gearValueChainCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
