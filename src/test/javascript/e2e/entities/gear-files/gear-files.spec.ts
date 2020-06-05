/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GearFilesComponentsPage, GearFilesDeleteDialog, GearFilesUpdatePage } from './gear-files.page-object';

const expect = chai.expect;

describe('GearFiles e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearFilesUpdatePage: GearFilesUpdatePage;
    let gearFilesComponentsPage: GearFilesComponentsPage;
    let gearFilesDeleteDialog: GearFilesDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearFiles', async () => {
        await navBarPage.goToEntity('gear-files');
        gearFilesComponentsPage = new GearFilesComponentsPage();
        expect(await gearFilesComponentsPage.getTitle()).to.eq('geargatewayApp.gearFiles.home.title');
    });

    it('should load create GearFiles page', async () => {
        await gearFilesComponentsPage.clickOnCreateButton();
        gearFilesUpdatePage = new GearFilesUpdatePage();
        expect(await gearFilesUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearFiles.home.createOrEditLabel');
        await gearFilesUpdatePage.cancel();
    });

    it('should create and save GearFiles', async () => {
        const nbButtonsBeforeCreate = await gearFilesComponentsPage.countDeleteButtons();

        await gearFilesComponentsPage.clickOnCreateButton();
        await promise.all([
            gearFilesUpdatePage.setIdFileInput('idFile'),
            gearFilesUpdatePage.setDocumentNameInput('documentName'),
            gearFilesUpdatePage.setDocumentDomainInput('documentDomain'),
            gearFilesUpdatePage.setDocumentTitleInput('documentTitle'),
            gearFilesUpdatePage.setDocumentTypeInput('documentType'),
            gearFilesUpdatePage.setDocumentDescriptionInput('documentDescription'),
            gearFilesUpdatePage.setLabelFieldInput('labelField'),
            gearFilesUpdatePage.setTypeFieldInput('typeField'),
            gearFilesUpdatePage.setPropertieNameInput('propertieName'),
            gearFilesUpdatePage.setDocumentIdAlfrescoInput('documentIdAlfresco'),
            gearFilesUpdatePage.setFolderIdAlfrescoInput('folderIdAlfresco'),
            gearFilesUpdatePage.setNameFolderAlfrescoInput('nameFolderAlfresco'),
            gearFilesUpdatePage.setSiteIdAlfrescoInput('siteIdAlfresco'),
            gearFilesUpdatePage.setNameSiteAlfrescoInput('nameSiteAlfresco'),
            gearFilesUpdatePage.setValueFieldInput('valueField'),
            gearFilesUpdatePage.setCustomFieldIdInput('5'),
            gearFilesUpdatePage.setTemplateIdInput('5'),
            gearFilesUpdatePage.gearDomainSelectLastOption()
        ]);
        expect(await gearFilesUpdatePage.getIdFileInput()).to.eq('idFile');
        expect(await gearFilesUpdatePage.getDocumentNameInput()).to.eq('documentName');
        expect(await gearFilesUpdatePage.getDocumentDomainInput()).to.eq('documentDomain');
        expect(await gearFilesUpdatePage.getDocumentTitleInput()).to.eq('documentTitle');
        expect(await gearFilesUpdatePage.getDocumentTypeInput()).to.eq('documentType');
        expect(await gearFilesUpdatePage.getDocumentDescriptionInput()).to.eq('documentDescription');
        const selectedDocumentIsCopy = gearFilesUpdatePage.getDocumentIsCopyInput();
        if (await selectedDocumentIsCopy.isSelected()) {
            await gearFilesUpdatePage.getDocumentIsCopyInput().click();
            expect(await gearFilesUpdatePage.getDocumentIsCopyInput().isSelected()).to.be.false;
        } else {
            await gearFilesUpdatePage.getDocumentIsCopyInput().click();
            expect(await gearFilesUpdatePage.getDocumentIsCopyInput().isSelected()).to.be.true;
        }
        const selectedDocumentIsDraft = gearFilesUpdatePage.getDocumentIsDraftInput();
        if (await selectedDocumentIsDraft.isSelected()) {
            await gearFilesUpdatePage.getDocumentIsDraftInput().click();
            expect(await gearFilesUpdatePage.getDocumentIsDraftInput().isSelected()).to.be.false;
        } else {
            await gearFilesUpdatePage.getDocumentIsDraftInput().click();
            expect(await gearFilesUpdatePage.getDocumentIsDraftInput().isSelected()).to.be.true;
        }
        expect(await gearFilesUpdatePage.getLabelFieldInput()).to.eq('labelField');
        expect(await gearFilesUpdatePage.getTypeFieldInput()).to.eq('typeField');
        expect(await gearFilesUpdatePage.getPropertieNameInput()).to.eq('propertieName');
        expect(await gearFilesUpdatePage.getDocumentIdAlfrescoInput()).to.eq('documentIdAlfresco');
        expect(await gearFilesUpdatePage.getFolderIdAlfrescoInput()).to.eq('folderIdAlfresco');
        expect(await gearFilesUpdatePage.getNameFolderAlfrescoInput()).to.eq('nameFolderAlfresco');
        expect(await gearFilesUpdatePage.getSiteIdAlfrescoInput()).to.eq('siteIdAlfresco');
        expect(await gearFilesUpdatePage.getNameSiteAlfrescoInput()).to.eq('nameSiteAlfresco');
        expect(await gearFilesUpdatePage.getValueFieldInput()).to.eq('valueField');
        expect(await gearFilesUpdatePage.getCustomFieldIdInput()).to.eq('5');
        expect(await gearFilesUpdatePage.getTemplateIdInput()).to.eq('5');
        await gearFilesUpdatePage.save();
        expect(await gearFilesUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearFilesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearFiles', async () => {
        const nbButtonsBeforeDelete = await gearFilesComponentsPage.countDeleteButtons();
        await gearFilesComponentsPage.clickOnLastDeleteButton();

        gearFilesDeleteDialog = new GearFilesDeleteDialog();
        expect(await gearFilesDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearFiles.delete.question');
        await gearFilesDeleteDialog.clickOnConfirmButton();

        expect(await gearFilesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
