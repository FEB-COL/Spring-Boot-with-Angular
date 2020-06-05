/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    GearValueChainMacroprocessComponentsPage,
    GearValueChainMacroprocessDeleteDialog,
    GearValueChainMacroprocessUpdatePage
} from './gear-value-chain-macroprocess.page-object';

const expect = chai.expect;

describe('GearValueChainMacroprocess e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearValueChainMacroprocessUpdatePage: GearValueChainMacroprocessUpdatePage;
    let gearValueChainMacroprocessComponentsPage: GearValueChainMacroprocessComponentsPage;
    let gearValueChainMacroprocessDeleteDialog: GearValueChainMacroprocessDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearValueChainMacroprocesses', async () => {
        await navBarPage.goToEntity('gear-value-chain-macroprocess');
        gearValueChainMacroprocessComponentsPage = new GearValueChainMacroprocessComponentsPage();
        expect(await gearValueChainMacroprocessComponentsPage.getTitle()).to.eq('geargatewayApp.gearValueChainMacroprocess.home.title');
    });

    it('should load create GearValueChainMacroprocess page', async () => {
        await gearValueChainMacroprocessComponentsPage.clickOnCreateButton();
        gearValueChainMacroprocessUpdatePage = new GearValueChainMacroprocessUpdatePage();
        expect(await gearValueChainMacroprocessUpdatePage.getPageTitle()).to.eq(
            'geargatewayApp.gearValueChainMacroprocess.home.createOrEditLabel'
        );
        await gearValueChainMacroprocessUpdatePage.cancel();
    });

    it('should create and save GearValueChainMacroprocesses', async () => {
        const nbButtonsBeforeCreate = await gearValueChainMacroprocessComponentsPage.countDeleteButtons();

        await gearValueChainMacroprocessComponentsPage.clickOnCreateButton();
        await promise.all([
            gearValueChainMacroprocessUpdatePage.setNameInput('name'),
            gearValueChainMacroprocessUpdatePage.setDecriptionInput('decription'),
            gearValueChainMacroprocessUpdatePage.setCreationDateInput('2000-12-31'),
            gearValueChainMacroprocessUpdatePage.setLastUpdateInput('2000-12-31'),
            gearValueChainMacroprocessUpdatePage.setOrderInput('5'),
            gearValueChainMacroprocessUpdatePage.gearvaluechaincategorySelectLastOption()
        ]);
        expect(await gearValueChainMacroprocessUpdatePage.getNameInput()).to.eq('name');
        expect(await gearValueChainMacroprocessUpdatePage.getDecriptionInput()).to.eq('decription');
        expect(await gearValueChainMacroprocessUpdatePage.getCreationDateInput()).to.eq('2000-12-31');
        expect(await gearValueChainMacroprocessUpdatePage.getLastUpdateInput()).to.eq('2000-12-31');
        const selectedDraft = gearValueChainMacroprocessUpdatePage.getDraftInput();
        if (await selectedDraft.isSelected()) {
            await gearValueChainMacroprocessUpdatePage.getDraftInput().click();
            expect(await gearValueChainMacroprocessUpdatePage.getDraftInput().isSelected()).to.be.false;
        } else {
            await gearValueChainMacroprocessUpdatePage.getDraftInput().click();
            expect(await gearValueChainMacroprocessUpdatePage.getDraftInput().isSelected()).to.be.true;
        }
        expect(await gearValueChainMacroprocessUpdatePage.getOrderInput()).to.eq('5');
        await gearValueChainMacroprocessUpdatePage.save();
        expect(await gearValueChainMacroprocessUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearValueChainMacroprocessComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearValueChainMacroprocess', async () => {
        const nbButtonsBeforeDelete = await gearValueChainMacroprocessComponentsPage.countDeleteButtons();
        await gearValueChainMacroprocessComponentsPage.clickOnLastDeleteButton();

        gearValueChainMacroprocessDeleteDialog = new GearValueChainMacroprocessDeleteDialog();
        expect(await gearValueChainMacroprocessDeleteDialog.getDialogTitle()).to.eq(
            'geargatewayApp.gearValueChainMacroprocess.delete.question'
        );
        await gearValueChainMacroprocessDeleteDialog.clickOnConfirmButton();

        expect(await gearValueChainMacroprocessComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
