import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GeargatewaySharedModule } from 'app/shared';
import {
    GearSurveySolveComponent,
    GearSurveySolveDetailComponent,
    GearSurveySolveUpdateComponent,
    GearSurveySolveDeletePopupComponent,
    GearSurveySolveDeleteDialogComponent,
    gearSurveySolveRoute,
    gearSurveySolvePopupRoute
} from './';

const ENTITY_STATES = [...gearSurveySolveRoute, ...gearSurveySolvePopupRoute];

@NgModule({
    imports: [GeargatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GearSurveySolveComponent,
        GearSurveySolveDetailComponent,
        GearSurveySolveUpdateComponent,
        GearSurveySolveDeleteDialogComponent,
        GearSurveySolveDeletePopupComponent
    ],
    entryComponents: [
        GearSurveySolveComponent,
        GearSurveySolveUpdateComponent,
        GearSurveySolveDeleteDialogComponent,
        GearSurveySolveDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeargatewayGearSurveySolveModule {}
