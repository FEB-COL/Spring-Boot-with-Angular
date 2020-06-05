/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    GearValueChainProcessComponentsPage,
    GearValueChainProcessDeleteDialog,
    GearValueChainProcessUpdatePage
} from './gear-value-chain-process.page-object';

const expect = chai.expect;

describe('GearValueChainProcess e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearValueChainProcessUpdatePage: GearValueChainProcessUpdatePage;
    let gearValueChainProcessComponentsPage: GearValueChainProcessComponentsPage;
    let gearValueChainProcessDeleteDialog: GearValueChainProcessDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearValueChainProcesses', async () => {
        await navBarPage.goToEntity('gear-value-chain-process');
        gearValueChainProcessComponentsPage = new GearValueChainProcessComponentsPage();
        expect(await gearValueChainProcessComponentsPage.getTitle()).to.eq('geargatewayApp.gearValueChainProcess.home.title');
    });

    it('should load create GearValueChainProcess page', async () => {
        await gearValueChainProcessComponentsPage.clickOnCreateButton();
        gearValueChainProcessUpdatePage = new GearValueChainProcessUpdatePage();
        expect(await gearValueChainProcessUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearValueChainProcess.home.createOrEditLabel');
        await gearValueChainProcessUpdatePage.cancel();
    });

    it('should create and save GearValueChainProcesses', async () => {
        const nbButtonsBeforeCreate = await gearValueChainProcessComponentsPage.countDeleteButtons();

        await gearValueChainProcessComponentsPage.clickOnCreateButton();
        await promise.all([
            gearValueChainProcessUpdatePage.setNameInput('name'),
            gearValueChainProcessUpdatePage.setDecriptionInput('decription'),
            gearValueChainProcessUpdatePage.setCreationDateInput('2000-12-31'),
            gearValueChainProcessUpdatePage.setLastUpdateInput('2000-12-31'),
            gearValueChainProcessUpdatePage.setAttachInput('attach'),
            gearValueChainProcessUpdatePage.setInputsInput('inputs'),
            gearValueChainProcessUpdatePage.setOutputsInput('outputs'),
            gearValueChainProcessUpdatePage.gearvaluechainmacroprocessSelectLastOption()
        ]);
        expect(await gearValueChainProcessUpdatePage.getNameInput()).to.eq('name');
        expect(await gearValueChainProcessUpdatePage.getDecriptionInput()).to.eq('decription');
        expect(await gearValueChainProcessUpdatePage.getCreationDateInput()).to.eq('2000-12-31');
        expect(await gearValueChainProcessUpdatePage.getLastUpdateInput()).to.eq('2000-12-31');
        expect(await gearValueChainProcessUpdatePage.getAttachInput()).to.eq('attach');
        const selectedDraft = gearValueChainProcessUpdatePage.getDraftInput();
        if (await selectedDraft.isSelected()) {
            await gearValueChainProcessUpdatePage.getDraftInput().click();
            expect(await gearValueChainProcessUpdatePage.getDraftInput().isSelected()).to.be.false;
        } else {
            await gearValueChainProcessUpdatePage.getDraftInput().click();
            expect(await gearValueChainProcessUpdatePage.getDraftInput().isSelected()).to.be.true;
        }
        expect(await gearValueChainProcessUpdatePage.getInputsInput()).to.eq('inputs');
        expect(await gearValueChainProcessUpdatePage.getOutputsInput()).to.eq('outputs');
        await gearValueChainProcessUpdatePage.save();
        expect(await gearValueChainProcessUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearValueChainProcessComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearValueChainProcess', async () => {
        const nbButtonsBeforeDelete = await gearValueChainProcessComponentsPage.countDeleteButtons();
        await gearValueChainProcessComponentsPage.clickOnLastDeleteButton();

        gearValueChainProcessDeleteDialog = new GearValueChainProcessDeleteDialog();
        expect(await gearValueChainProcessDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearValueChainProcess.delete.question');
        await gearValueChainProcessDeleteDialog.clickOnConfirmButton();

        expect(await gearValueChainProcessComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
