/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    AlfrescoNodePropertiesComponentsPage,
    AlfrescoNodePropertiesDeleteDialog,
    AlfrescoNodePropertiesUpdatePage
} from './alfresco-node-properties.page-object';

const expect = chai.expect;

describe('AlfrescoNodeProperties e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let alfrescoNodePropertiesUpdatePage: AlfrescoNodePropertiesUpdatePage;
    let alfrescoNodePropertiesComponentsPage: AlfrescoNodePropertiesComponentsPage;
    let alfrescoNodePropertiesDeleteDialog: AlfrescoNodePropertiesDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load AlfrescoNodeProperties', async () => {
        await navBarPage.goToEntity('alfresco-node-properties');
        alfrescoNodePropertiesComponentsPage = new AlfrescoNodePropertiesComponentsPage();
        expect(await alfrescoNodePropertiesComponentsPage.getTitle()).to.eq('geargatewayApp.alfrescoNodeProperties.home.title');
    });

    it('should load create AlfrescoNodeProperties page', async () => {
        await alfrescoNodePropertiesComponentsPage.clickOnCreateButton();
        alfrescoNodePropertiesUpdatePage = new AlfrescoNodePropertiesUpdatePage();
        expect(await alfrescoNodePropertiesUpdatePage.getPageTitle()).to.eq('geargatewayApp.alfrescoNodeProperties.home.createOrEditLabel');
        await alfrescoNodePropertiesUpdatePage.cancel();
    });

    it('should create and save AlfrescoNodeProperties', async () => {
        const nbButtonsBeforeCreate = await alfrescoNodePropertiesComponentsPage.countDeleteButtons();

        await alfrescoNodePropertiesComponentsPage.clickOnCreateButton();
        await promise.all([
            alfrescoNodePropertiesUpdatePage.setDocumentTypeInput('documentType'),
            alfrescoNodePropertiesUpdatePage.setDocumentTitleInput('documentTitle'),
            alfrescoNodePropertiesUpdatePage.setFileNameInput('fileName'),
            alfrescoNodePropertiesUpdatePage.setSiteIdInput('siteId'),
            alfrescoNodePropertiesUpdatePage.setDescriptionInput('description'),
            alfrescoNodePropertiesUpdatePage.setNotesInput('notes'),
            alfrescoNodePropertiesUpdatePage.setVersionTypeInput('versionType'),
            alfrescoNodePropertiesUpdatePage.setVersionLabelInput('versionLabel'),
            alfrescoNodePropertiesUpdatePage.setTextField1Input('textField1'),
            alfrescoNodePropertiesUpdatePage.setTextField2Input('textField2'),
            alfrescoNodePropertiesUpdatePage.setTextField3Input('textField3'),
            alfrescoNodePropertiesUpdatePage.setTextField4Input('textField4'),
            alfrescoNodePropertiesUpdatePage.setTextField5Input('textField5'),
            alfrescoNodePropertiesUpdatePage.setTextField6Input('textField6'),
            alfrescoNodePropertiesUpdatePage.setTextField7Input('textField7'),
            alfrescoNodePropertiesUpdatePage.alfrescoNodeSelectLastOption()
        ]);
        expect(await alfrescoNodePropertiesUpdatePage.getDocumentTypeInput()).to.eq('documentType');
        expect(await alfrescoNodePropertiesUpdatePage.getDocumentTitleInput()).to.eq('documentTitle');
        expect(await alfrescoNodePropertiesUpdatePage.getFileNameInput()).to.eq('fileName');
        expect(await alfrescoNodePropertiesUpdatePage.getSiteIdInput()).to.eq('siteId');
        expect(await alfrescoNodePropertiesUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await alfrescoNodePropertiesUpdatePage.getNotesInput()).to.eq('notes');
        expect(await alfrescoNodePropertiesUpdatePage.getVersionTypeInput()).to.eq('versionType');
        expect(await alfrescoNodePropertiesUpdatePage.getVersionLabelInput()).to.eq('versionLabel');
        expect(await alfrescoNodePropertiesUpdatePage.getTextField1Input()).to.eq('textField1');
        expect(await alfrescoNodePropertiesUpdatePage.getTextField2Input()).to.eq('textField2');
        expect(await alfrescoNodePropertiesUpdatePage.getTextField3Input()).to.eq('textField3');
        expect(await alfrescoNodePropertiesUpdatePage.getTextField4Input()).to.eq('textField4');
        expect(await alfrescoNodePropertiesUpdatePage.getTextField5Input()).to.eq('textField5');
        expect(await alfrescoNodePropertiesUpdatePage.getTextField6Input()).to.eq('textField6');
        expect(await alfrescoNodePropertiesUpdatePage.getTextField7Input()).to.eq('textField7');
        await alfrescoNodePropertiesUpdatePage.save();
        expect(await alfrescoNodePropertiesUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await alfrescoNodePropertiesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last AlfrescoNodeProperties', async () => {
        const nbButtonsBeforeDelete = await alfrescoNodePropertiesComponentsPage.countDeleteButtons();
        await alfrescoNodePropertiesComponentsPage.clickOnLastDeleteButton();

        alfrescoNodePropertiesDeleteDialog = new AlfrescoNodePropertiesDeleteDialog();
        expect(await alfrescoNodePropertiesDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.alfrescoNodeProperties.delete.question');
        await alfrescoNodePropertiesDeleteDialog.clickOnConfirmButton();

        expect(await alfrescoNodePropertiesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
