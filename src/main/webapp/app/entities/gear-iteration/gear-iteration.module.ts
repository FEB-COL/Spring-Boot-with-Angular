import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GeargatewaySharedModule } from 'app/shared';
import {
    GearIterationComponent,
    GearIterationDetailComponent,
    GearIterationUpdateComponent,
    GearIterationDeletePopupComponent,
    GearIterationDeleteDialogComponent,
    gearIterationRoute,
    gearIterationPopupRoute
} from './';

const ENTITY_STATES = [...gearIterationRoute, ...gearIterationPopupRoute];

@NgModule({
    imports: [GeargatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GearIterationComponent,
        GearIterationDetailComponent,
        GearIterationUpdateComponent,
        GearIterationDeleteDialogComponent,
        GearIterationDeletePopupComponent
    ],
    entryComponents: [
        GearIterationComponent,
        GearIterationUpdateComponent,
        GearIterationDeleteDialogComponent,
        GearIterationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeargatewayGearIterationModule {}
