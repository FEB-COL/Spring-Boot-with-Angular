import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GeargatewaySharedModule } from 'app/shared';
import {
    GearDiagnosisTypeComponent,
    GearDiagnosisTypeDetailComponent,
    GearDiagnosisTypeUpdateComponent,
    GearDiagnosisTypeDeletePopupComponent,
    GearDiagnosisTypeDeleteDialogComponent,
    gearDiagnosisTypeRoute,
    gearDiagnosisTypePopupRoute
} from './';

const ENTITY_STATES = [...gearDiagnosisTypeRoute, ...gearDiagnosisTypePopupRoute];

@NgModule({
    imports: [GeargatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GearDiagnosisTypeComponent,
        GearDiagnosisTypeDetailComponent,
        GearDiagnosisTypeUpdateComponent,
        GearDiagnosisTypeDeleteDialogComponent,
        GearDiagnosisTypeDeletePopupComponent
    ],
    entryComponents: [
        GearDiagnosisTypeComponent,
        GearDiagnosisTypeUpdateComponent,
        GearDiagnosisTypeDeleteDialogComponent,
        GearDiagnosisTypeDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeargatewayGearDiagnosisTypeModule {}
