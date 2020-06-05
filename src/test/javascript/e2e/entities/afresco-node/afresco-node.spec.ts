/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AfrescoNodeComponentsPage, AfrescoNodeDeleteDialog, AfrescoNodeUpdatePage } from './afresco-node.page-object';

const expect = chai.expect;

describe('AfrescoNode e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let afrescoNodeUpdatePage: AfrescoNodeUpdatePage;
    let afrescoNodeComponentsPage: AfrescoNodeComponentsPage;
    let afrescoNodeDeleteDialog: AfrescoNodeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load AfrescoNodes', async () => {
        await navBarPage.goToEntity('afresco-node');
        afrescoNodeComponentsPage = new AfrescoNodeComponentsPage();
        expect(await afrescoNodeComponentsPage.getTitle()).to.eq('geargatewayApp.afrescoNode.home.title');
    });

    it('should load create AfrescoNode page', async () => {
        await afrescoNodeComponentsPage.clickOnCreateButton();
        afrescoNodeUpdatePage = new AfrescoNodeUpdatePage();
        expect(await afrescoNodeUpdatePage.getPageTitle()).to.eq('geargatewayApp.afrescoNode.home.createOrEditLabel');
        await afrescoNodeUpdatePage.cancel();
    });

    it('should create and save AfrescoNodes', async () => {
        const nbButtonsBeforeCreate = await afrescoNodeComponentsPage.countDeleteButtons();

        await afrescoNodeComponentsPage.clickOnCreateButton();
        await promise.all([
            afrescoNodeUpdatePage.setCreatedAtInput('createdAt'),
            afrescoNodeUpdatePage.setModifiedAtInput('modifiedAt'),
            afrescoNodeUpdatePage.setNameInput('name'),
            afrescoNodeUpdatePage.setLocationInput('location'),
            afrescoNodeUpdatePage.setNTypeInput('nType'),
            afrescoNodeUpdatePage.setParentIdInput('parentId'),
            afrescoNodeUpdatePage.alfrescoSiteSelectLastOption()
        ]);
        expect(await afrescoNodeUpdatePage.getCreatedAtInput()).to.eq('createdAt');
        expect(await afrescoNodeUpdatePage.getModifiedAtInput()).to.eq('modifiedAt');
        expect(await afrescoNodeUpdatePage.getNameInput()).to.eq('name');
        expect(await afrescoNodeUpdatePage.getLocationInput()).to.eq('location');
        expect(await afrescoNodeUpdatePage.getNTypeInput()).to.eq('nType');
        expect(await afrescoNodeUpdatePage.getParentIdInput()).to.eq('parentId');
        await afrescoNodeUpdatePage.save();
        expect(await afrescoNodeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await afrescoNodeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last AfrescoNode', async () => {
        const nbButtonsBeforeDelete = await afrescoNodeComponentsPage.countDeleteButtons();
        await afrescoNodeComponentsPage.clickOnLastDeleteButton();

        afrescoNodeDeleteDialog = new AfrescoNodeDeleteDialog();
        expect(await afrescoNodeDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.afrescoNode.delete.question');
        await afrescoNodeDeleteDialog.clickOnConfirmButton();

        expect(await afrescoNodeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
