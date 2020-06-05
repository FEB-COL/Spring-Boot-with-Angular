import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GeargatewaySharedModule } from 'app/shared';
import {
    AlfrescoNodePropertiesComponent,
    AlfrescoNodePropertiesDetailComponent,
    AlfrescoNodePropertiesUpdateComponent,
    AlfrescoNodePropertiesDeletePopupComponent,
    AlfrescoNodePropertiesDeleteDialogComponent,
    alfrescoNodePropertiesRoute,
    alfrescoNodePropertiesPopupRoute
} from './';

const ENTITY_STATES = [...alfrescoNodePropertiesRoute, ...alfrescoNodePropertiesPopupRoute];

@NgModule({
    imports: [GeargatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AlfrescoNodePropertiesComponent,
        AlfrescoNodePropertiesDetailComponent,
        AlfrescoNodePropertiesUpdateComponent,
        AlfrescoNodePropertiesDeleteDialogComponent,
        AlfrescoNodePropertiesDeletePopupComponent
    ],
    entryComponents: [
        AlfrescoNodePropertiesComponent,
        AlfrescoNodePropertiesUpdateComponent,
        AlfrescoNodePropertiesDeleteDialogComponent,
        AlfrescoNodePropertiesDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeargatewayAlfrescoNodePropertiesModule {}
