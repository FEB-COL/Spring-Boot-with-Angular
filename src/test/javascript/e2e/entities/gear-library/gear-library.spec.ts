/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GearLibraryComponentsPage, GearLibraryDeleteDialog, GearLibraryUpdatePage } from './gear-library.page-object';

const expect = chai.expect;

describe('GearLibrary e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gearLibraryUpdatePage: GearLibraryUpdatePage;
    let gearLibraryComponentsPage: GearLibraryComponentsPage;
    let gearLibraryDeleteDialog: GearLibraryDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GearLibraries', async () => {
        await navBarPage.goToEntity('gear-library');
        gearLibraryComponentsPage = new GearLibraryComponentsPage();
        expect(await gearLibraryComponentsPage.getTitle()).to.eq('geargatewayApp.gearLibrary.home.title');
    });

    it('should load create GearLibrary page', async () => {
        await gearLibraryComponentsPage.clickOnCreateButton();
        gearLibraryUpdatePage = new GearLibraryUpdatePage();
        expect(await gearLibraryUpdatePage.getPageTitle()).to.eq('geargatewayApp.gearLibrary.home.createOrEditLabel');
        await gearLibraryUpdatePage.cancel();
    });

    it('should create and save GearLibraries', async () => {
        const nbButtonsBeforeCreate = await gearLibraryComponentsPage.countDeleteButtons();

        await gearLibraryComponentsPage.clickOnCreateButton();
        await promise.all([
            gearLibraryUpdatePage.setIdFileInput('idFile'),
            gearLibraryUpdatePage.setDocumentNameInput('documentName'),
            gearLibraryUpdatePage.setDocumentDomainInput('documentDomain'),
            gearLibraryUpdatePage.setDocumentTitleInput('documentTitle'),
            gearLibraryUpdatePage.setDocumentTypeInput('documentType'),
            gearLibraryUpdatePage.setDocumentDescriptionInput('documentDescription'),
            gearLibraryUpdatePage.setLabelFieldInput('labelField'),
            gearLibraryUpdatePage.setTypeFieldInput('typeField'),
            gearLibraryUpdatePage.setPropertieNameInput('propertieName'),
            gearLibraryUpdatePage.setDocumentIdAlfrescoInput('documentIdAlfresco'),
            gearLibraryUpdatePage.setFolderIdAlfrescoInput('folderIdAlfresco'),
            gearLibraryUpdatePage.setNameFolderAlfrescoInput('nameFolderAlfresco'),
            gearLibraryUpdatePage.setSiteIdAlfrescoInput('siteIdAlfresco'),
            gearLibraryUpdatePage.setNameSiteAlfrescoInput('nameSiteAlfresco'),
            gearLibraryUpdatePage.setValueFieldInput('valueField'),
            gearLibraryUpdatePage.setCustomFieldIdInput('5'),
            gearLibraryUpdatePage.setTemplateIdInput('5')
        ]);
        expect(await gearLibraryUpdatePage.getIdFileInput()).to.eq('idFile');
        expect(await gearLibraryUpdatePage.getDocumentNameInput()).to.eq('documentName');
        expect(await gearLibraryUpdatePage.getDocumentDomainInput()).to.eq('documentDomain');
        expect(await gearLibraryUpdatePage.getDocumentTitleInput()).to.eq('documentTitle');
        expect(await gearLibraryUpdatePage.getDocumentTypeInput()).to.eq('documentType');
        expect(await gearLibraryUpdatePage.getDocumentDescriptionInput()).to.eq('documentDescription');
        const selectedDocumentIsCopy = gearLibraryUpdatePage.getDocumentIsCopyInput();
        if (await selectedDocumentIsCopy.isSelected()) {
            await gearLibraryUpdatePage.getDocumentIsCopyInput().click();
            expect(await gearLibraryUpdatePage.getDocumentIsCopyInput().isSelected()).to.be.false;
        } else {
            await gearLibraryUpdatePage.getDocumentIsCopyInput().click();
            expect(await gearLibraryUpdatePage.getDocumentIsCopyInput().isSelected()).to.be.true;
        }
        const selectedDocumentIsDraft = gearLibraryUpdatePage.getDocumentIsDraftInput();
        if (await selectedDocumentIsDraft.isSelected()) {
            await gearLibraryUpdatePage.getDocumentIsDraftInput().click();
            expect(await gearLibraryUpdatePage.getDocumentIsDraftInput().isSelected()).to.be.false;
        } else {
            await gearLibraryUpdatePage.getDocumentIsDraftInput().click();
            expect(await gearLibraryUpdatePage.getDocumentIsDraftInput().isSelected()).to.be.true;
        }
        expect(await gearLibraryUpdatePage.getLabelFieldInput()).to.eq('labelField');
        expect(await gearLibraryUpdatePage.getTypeFieldInput()).to.eq('typeField');
        expect(await gearLibraryUpdatePage.getPropertieNameInput()).to.eq('propertieName');
        expect(await gearLibraryUpdatePage.getDocumentIdAlfrescoInput()).to.eq('documentIdAlfresco');
        expect(await gearLibraryUpdatePage.getFolderIdAlfrescoInput()).to.eq('folderIdAlfresco');
        expect(await gearLibraryUpdatePage.getNameFolderAlfrescoInput()).to.eq('nameFolderAlfresco');
        expect(await gearLibraryUpdatePage.getSiteIdAlfrescoInput()).to.eq('siteIdAlfresco');
        expect(await gearLibraryUpdatePage.getNameSiteAlfrescoInput()).to.eq('nameSiteAlfresco');
        expect(await gearLibraryUpdatePage.getValueFieldInput()).to.eq('valueField');
        expect(await gearLibraryUpdatePage.getCustomFieldIdInput()).to.eq('5');
        expect(await gearLibraryUpdatePage.getTemplateIdInput()).to.eq('5');
        await gearLibraryUpdatePage.save();
        expect(await gearLibraryUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gearLibraryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GearLibrary', async () => {
        const nbButtonsBeforeDelete = await gearLibraryComponentsPage.countDeleteButtons();
        await gearLibraryComponentsPage.clickOnLastDeleteButton();

        gearLibraryDeleteDialog = new GearLibraryDeleteDialog();
        expect(await gearLibraryDeleteDialog.getDialogTitle()).to.eq('geargatewayApp.gearLibrary.delete.question');
        await gearLibraryDeleteDialog.clickOnConfirmButton();

        expect(await gearLibraryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
