import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GeargatewaySharedModule } from 'app/shared';
import {
    GearAmbitComponent,
    GearAmbitDetailComponent,
    GearAmbitUpdateComponent,
    GearAmbitDeletePopupComponent,
    GearAmbitDeleteDialogComponent,
    gearAmbitRoute,
    gearAmbitPopupRoute
} from './';

const ENTITY_STATES = [...gearAmbitRoute, ...gearAmbitPopupRoute];

@NgModule({
    imports: [GeargatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GearAmbitComponent,
        GearAmbitDetailComponent,
        GearAmbitUpdateComponent,
        GearAmbitDeleteDialogComponent,
        GearAmbitDeletePopupComponent
    ],
    entryComponents: [GearAmbitComponent, GearAmbitUpdateComponent, GearAmbitDeleteDialogComponent, GearAmbitDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeargatewayGearAmbitModule {}
