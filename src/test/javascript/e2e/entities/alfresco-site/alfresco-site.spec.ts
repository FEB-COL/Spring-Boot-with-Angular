/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AlfrescoSiteComponentsPage, AlfrescoSiteDeleteDialog, AlfrescoSiteUpdatePage } from './alfresco-site.page-object';

const expect = chai.expect;

describe('AlfrescoSite e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let alfrescoSiteUpdatePage: AlfrescoSiteUpdatePage;
    let alfrescoSiteComponentsPage: AlfrescoSiteComponentsPage;
    let alfrescoSiteDeleteDialog: AlfrescoSiteDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load AlfrescoSites', async () => {
        await navBarPage.goToEntity('alfresco-site');
        alfrescoSiteComponentsPage = new AlfrescoSiteComponentsPage();
        expect(await alfrescoSiteComponentsPage.getTitle()).to.eq('geargatewayApp.alfrescoSite.home.title');
    });

    it('should load create AlfrescoSite page', async () => {
        await alfrescoSiteComponentsPage.clickOnCreateButton();
        alfrescoSiteUpdatePage = new AlfrescoSiteUpdatePage();
        expect(await alfrescoSiteUpdatePage.getPageTitle()).to.eq('geargatewayApp.alfrescoSite.home.createOrEditLabel');
        await alfrescoSiteUpdatePage.cancel();
    });

    it('should create and save AlfrescoSites', async () => {
        const nbButtonsBeforeCreate = await alfrescoSiteComponentsPage.countDeleteButtons();

        await alfrescoSiteComponentsPage.clickOnCreateButton();
        await promise.all([
            alfrescoSiteUpdatePage.setGuidInput('guid'),
            alfrescoSiteUpdatePage.setIdentifyInput('identify'),
            alfrescoSiteUpdatePage.setRoleInput('role'),
            alfrescoSiteUpdatePage.setTitleInput('title'),
            alfrescoSiteUpdatePage.setDescriptionInput('description'),
            alfrescoSiteUpdatePage.setVisibilityInput('visibility')
        ]);
        expect(await alfrescoSiteUpdatePage.getGuidInput()).to.eq('guid');
        expect(await alfrescoSiteUpdatePage.getIdentifyInput()).to.eq('identify');
        expect(await alfrescoSiteUpdatePage.getRoleInput()).to.eq('role');
        expect(await alfrescoSiteUpdatePage.getTitleInput()).to.eq('title');
        expect(await alfrescoSiteUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await alfrescoSiteUpdatePage.getVisibilityInput()).to.eq('visibility');
        await alfrescoSiteUpdatePage.save();
        expect(await alfrescoSiteUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await alfrescoSiteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last AlfrescoSite', async () => {
        const nbButtonsBeforeDelete = await alfrescoSiteComponentsPage.countDeleteButtons();
        await alfrescoSiteComponentsPage.clickOnLastDeleteButton();

        alfrescoSiteDeleteDialog = new AlfrescoSiteDeleteDialog();
        expect(await alfrescoSiteDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.alfrescoSite.delete.question');
        await alfrescoSiteDeleteDialog.clickOnConfirmButton();

        expect(await alfrescoSiteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
