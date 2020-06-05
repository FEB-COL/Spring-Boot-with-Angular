import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GeargatewaySharedModule } from 'app/shared';
import {
    GearSurveyAnswerComponent,
    GearSurveyAnswerDetailComponent,
    GearSurveyAnswerUpdateComponent,
    GearSurveyAnswerDeletePopupComponent,
    GearSurveyAnswerDeleteDialogComponent,
    gearSurveyAnswerRoute,
    gearSurveyAnswerPopupRoute
} from './';

const ENTITY_STATES = [...gearSurveyAnswerRoute, ...gearSurveyAnswerPopupRoute];

@NgModule({
    imports: [GeargatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GearSurveyAnswerComponent,
        GearSurveyAnswerDetailComponent,
        GearSurveyAnswerUpdateComponent,
        GearSurveyAnswerDeleteDialogComponent,
        GearSurveyAnswerDeletePopupComponent
    ],
    entryComponents: [
        GearSurveyAnswerComponent,
        GearSurveyAnswerUpdateComponent,
        GearSurveyAnswerDeleteDialogComponent,
        GearSurveyAnswerDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeargatewayGearSurveyAnswerModule {}
