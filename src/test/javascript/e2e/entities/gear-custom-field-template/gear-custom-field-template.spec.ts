/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    GearCustomFieldTemplateComponentsPage,
    GearCustomFieldTemplateDeleteDialog,
    GearCustomFieldTemplateUpdatePage
} from './gear-custom-field-template.page-object';

const expect = chai.expect;

describe('GearCustomFieldTemplate e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearCustomFieldTemplateUpdatePage: GearCustomFieldTemplateUpdatePage;
    let gearCustomFieldTemplateComponentsPage: GearCustomFieldTemplateComponentsPage;
    let gearCustomFieldTemplateDeleteDialog: GearCustomFieldTemplateDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearCustomFieldTemplates', async () => {
        await navBarPage.goToEntity('gear-custom-field-template');
        gearCustomFieldTemplateComponentsPage = new GearCustomFieldTemplateComponentsPage();
        expect(await gearCustomFieldTemplateComponentsPage.getTitle()).to.eq('geargatewayApp.gearCustomFieldTemplate.home.title');
    });

    it('should load create GearCustomFieldTemplate page', async () => {
        await gearCustomFieldTemplateComponentsPage.clickOnCreateButton();
        gearCustomFieldTemplateUpdatePage = new GearCustomFieldTemplateUpdatePage();
        expect(await gearCustomFieldTemplateUpdatePage.getPageTitle()).to.eq(
            'geargatewayApp.gearCustomFieldTemplate.home.createOrEditLabel'
        );
        await gearCustomFieldTemplateUpdatePage.cancel();
    });

    it('should create and save GearCustomFieldTemplates', async () => {
        const nbButtonsBeforeCreate = await gearCustomFieldTemplateComponentsPage.countDeleteButtons();

        await gearCustomFieldTemplateComponentsPage.clickOnCreateButton();
        await promise.all([
            gearCustomFieldTemplateUpdatePage.setLabelFieldInput('labelField'),
            gearCustomFieldTemplateUpdatePage.setDefaultValueInput('defaultValue'),
            gearCustomFieldTemplateUpdatePage.setFieldTypeInput('5'),
            gearCustomFieldTemplateUpdatePage.setListOptionsInput('listOptions'),
            gearCustomFieldTemplateUpdatePage.gearDdocumenttypeSelectLastOption()
        ]);
        expect(await gearCustomFieldTemplateUpdatePage.getLabelFieldInput()).to.eq('labelField');
        expect(await gearCustomFieldTemplateUpdatePage.getDefaultValueInput()).to.eq('defaultValue');
        expect(await gearCustomFieldTemplateUpdatePage.getFieldTypeInput()).to.eq('5');
        expect(await gearCustomFieldTemplateUpdatePage.getListOptionsInput()).to.eq('listOptions');
        await gearCustomFieldTemplateUpdatePage.save();
        expect(await gearCustomFieldTemplateUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearCustomFieldTemplateComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearCustomFieldTemplate', async () => {
        const nbButtonsBeforeDelete = await gearCustomFieldTemplateComponentsPage.countDeleteButtons();
        await gearCustomFieldTemplateComponentsPage.clickOnLastDeleteButton();

        gearCustomFieldTemplateDeleteDialog = new GearCustomFieldTemplateDeleteDialog();
        expect(await gearCustomFieldTemplateDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearCustomFieldTemplate.delete.question');
        await gearCustomFieldTemplateDeleteDialog.clickOnConfirmButton();

        expect(await gearCustomFieldTemplateComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
