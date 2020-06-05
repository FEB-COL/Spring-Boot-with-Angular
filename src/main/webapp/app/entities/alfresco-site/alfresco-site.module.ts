import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GeargatewaySharedModule } from 'app/shared';
import {
    AlfrescoSiteComponent,
    AlfrescoSiteDetailComponent,
    AlfrescoSiteUpdateComponent,
    AlfrescoSiteDeletePopupComponent,
    AlfrescoSiteDeleteDialogComponent,
    alfrescoSiteRoute,
    alfrescoSitePopupRoute
} from './';

const ENTITY_STATES = [...alfrescoSiteRoute, ...alfrescoSitePopupRoute];

@NgModule({
    imports: [GeargatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AlfrescoSiteComponent,
        AlfrescoSiteDetailComponent,
        AlfrescoSiteUpdateComponent,
        AlfrescoSiteDeleteDialogComponent,
        AlfrescoSiteDeletePopupComponent
    ],
    entryComponents: [
        AlfrescoSiteComponent,
        AlfrescoSiteUpdateComponent,
        AlfrescoSiteDeleteDialogComponent,
        AlfrescoSiteDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeargatewayAlfrescoSiteModule {}
