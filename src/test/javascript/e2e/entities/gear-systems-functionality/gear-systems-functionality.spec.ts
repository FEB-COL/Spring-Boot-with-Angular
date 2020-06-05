/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    GearSystemsFunctionalityComponentsPage,
    GearSystemsFunctionalityDeleteDialog,
    GearSystemsFunctionalityUpdatePage
} from './gear-systems-functionality.page-object';

const expect = chai.expect;

describe('GearSystemsFunctionality e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearSystemsFunctionalityUpdatePage: GearSystemsFunctionalityUpdatePage;
    let gearSystemsFunctionalityComponentsPage: GearSystemsFunctionalityComponentsPage;
    let gearSystemsFunctionalityDeleteDialog: GearSystemsFunctionalityDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearSystemsFunctionalities', async () => {
        await navBarPage.goToEntity('gear-systems-functionality');
        gearSystemsFunctionalityComponentsPage = new GearSystemsFunctionalityComponentsPage();
        expect(await gearSystemsFunctionalityComponentsPage.getTitle()).to.eq('geargatewayApp.gearSystemsFunctionality.home.title');
    });

    it('should load create GearSystemsFunctionality page', async () => {
        await gearSystemsFunctionalityComponentsPage.clickOnCreateButton();
        gearSystemsFunctionalityUpdatePage = new GearSystemsFunctionalityUpdatePage();
        expect(await gearSystemsFunctionalityUpdatePage.getPageTitle()).to.eq(
            'geargatewayApp.gearSystemsFunctionality.home.createOrEditLabel'
        );
        await gearSystemsFunctionalityUpdatePage.cancel();
    });

    it('should create and save GearSystemsFunctionalities', async () => {
        const nbButtonsBeforeCreate = await gearSystemsFunctionalityComponentsPage.countDeleteButtons();

        await gearSystemsFunctionalityComponentsPage.clickOnCreateButton();
        await promise.all([
            gearSystemsFunctionalityUpdatePage.setNameInput('name'),
            gearSystemsFunctionalityUpdatePage.setDescriptionInput('description'),
            gearSystemsFunctionalityUpdatePage.setCreationDateInput('2000-12-31'),
            gearSystemsFunctionalityUpdatePage.setModifyDateInput('2000-12-31'),
            gearSystemsFunctionalityUpdatePage.gearinformationsystemsSelectLastOption()
        ]);
        expect(await gearSystemsFunctionalityUpdatePage.getNameInput()).to.eq('name');
        expect(await gearSystemsFunctionalityUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await gearSystemsFunctionalityUpdatePage.getCreationDateInput()).to.eq('2000-12-31');
        expect(await gearSystemsFunctionalityUpdatePage.getModifyDateInput()).to.eq('2000-12-31');
        await gearSystemsFunctionalityUpdatePage.save();
        expect(await gearSystemsFunctionalityUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearSystemsFunctionalityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearSystemsFunctionality', async () => {
        const nbButtonsBeforeDelete = await gearSystemsFunctionalityComponentsPage.countDeleteButtons();
        await gearSystemsFunctionalityComponentsPage.clickOnLastDeleteButton();

        gearSystemsFunctionalityDeleteDialog = new GearSystemsFunctionalityDeleteDialog();
        expect(await gearSystemsFunctionalityDeleteDialog.getDialogTitle()).to.eq(
            'geargatewayApp.gearSystemsFunctionality.delete.question'
        );
        await gearSystemsFunctionalityDeleteDialog.clickOnConfirmButton();

        expect(await gearSystemsFunctionalityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
