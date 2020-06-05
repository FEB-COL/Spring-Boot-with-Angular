import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GeargatewaySharedModule } from 'app/shared';
import {
    GearSurveyQuestionTypeComponent,
    GearSurveyQuestionTypeDetailComponent,
    GearSurveyQuestionTypeUpdateComponent,
    GearSurveyQuestionTypeDeletePopupComponent,
    GearSurveyQuestionTypeDeleteDialogComponent,
    gearSurveyQuestionTypeRoute,
    gearSurveyQuestionTypePopupRoute
} from './';

const ENTITY_STATES = [...gearSurveyQuestionTypeRoute, ...gearSurveyQuestionTypePopupRoute];

@NgModule({
    imports: [GeargatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GearSurveyQuestionTypeComponent,
        GearSurveyQuestionTypeDetailComponent,
        GearSurveyQuestionTypeUpdateComponent,
        GearSurveyQuestionTypeDeleteDialogComponent,
        GearSurveyQuestionTypeDeletePopupComponent
    ],
    entryComponents: [
        GearSurveyQuestionTypeComponent,
        GearSurveyQuestionTypeUpdateComponent,
        GearSurveyQuestionTypeDeleteDialogComponent,
        GearSurveyQuestionTypeDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeargatewayGearSurveyQuestionTypeModule {}
