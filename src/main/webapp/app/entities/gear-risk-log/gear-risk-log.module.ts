import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GeargatewaySharedModule } from 'app/shared';
import {
    GearRiskLogComponent,
    GearRiskLogDetailComponent,
    GearRiskLogUpdateComponent,
    GearRiskLogDeletePopupComponent,
    GearRiskLogDeleteDialogComponent,
    gearRiskLogRoute,
    gearRiskLogPopupRoute
} from './';

const ENTITY_STATES = [...gearRiskLogRoute, ...gearRiskLogPopupRoute];

@NgModule({
    imports: [GeargatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GearRiskLogComponent,
        GearRiskLogDetailComponent,
        GearRiskLogUpdateComponent,
        GearRiskLogDeleteDialogComponent,
        GearRiskLogDeletePopupComponent
    ],
    entryComponents: [GearRiskLogComponent, GearRiskLogUpdateComponent, GearRiskLogDeleteDialogComponent, GearRiskLogDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeargatewayGearRiskLogModule {}
