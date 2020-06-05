import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GeargatewaySharedModule } from 'app/shared';
import {
    AfrescoNodeComponent,
    AfrescoNodeDetailComponent,
    AfrescoNodeUpdateComponent,
    AfrescoNodeDeletePopupComponent,
    AfrescoNodeDeleteDialogComponent,
    afrescoNodeRoute,
    afrescoNodePopupRoute
} from './';

const ENTITY_STATES = [...afrescoNodeRoute, ...afrescoNodePopupRoute];

@NgModule({
    imports: [GeargatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AfrescoNodeComponent,
        AfrescoNodeDetailComponent,
        AfrescoNodeUpdateComponent,
        AfrescoNodeDeleteDialogComponent,
        AfrescoNodeDeletePopupComponent
    ],
    entryComponents: [AfrescoNodeComponent, AfrescoNodeUpdateComponent, AfrescoNodeDeleteDialogComponent, AfrescoNodeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeargatewayAfrescoNodeModule {}
