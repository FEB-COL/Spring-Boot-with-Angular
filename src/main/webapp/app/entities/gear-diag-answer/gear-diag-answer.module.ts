import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GeargatewaySharedModule } from 'app/shared';
import {
    GearDiagAnswerComponent,
    GearDiagAnswerDetailComponent,
    GearDiagAnswerUpdateComponent,
    GearDiagAnswerDeletePopupComponent,
    GearDiagAnswerDeleteDialogComponent,
    gearDiagAnswerRoute,
    gearDiagAnswerPopupRoute
} from './';

const ENTITY_STATES = [...gearDiagAnswerRoute, ...gearDiagAnswerPopupRoute];

@NgModule({
    imports: [GeargatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GearDiagAnswerComponent,
        GearDiagAnswerDetailComponent,
        GearDiagAnswerUpdateComponent,
        GearDiagAnswerDeleteDialogComponent,
        GearDiagAnswerDeletePopupComponent
    ],
    entryComponents: [
        GearDiagAnswerComponent,
        GearDiagAnswerUpdateComponent,
        GearDiagAnswerDeleteDialogComponent,
        GearDiagAnswerDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeargatewayGearDiagAnswerModule {}
