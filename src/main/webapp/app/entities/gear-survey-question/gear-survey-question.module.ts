import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GeargatewaySharedModule } from 'app/shared';
import {
    GearSurveyQuestionComponent,
    GearSurveyQuestionDetailComponent,
    GearSurveyQuestionUpdateComponent,
    GearSurveyQuestionDeletePopupComponent,
    GearSurveyQuestionDeleteDialogComponent,
    gearSurveyQuestionRoute,
    gearSurveyQuestionPopupRoute
} from './';

const ENTITY_STATES = [...gearSurveyQuestionRoute, ...gearSurveyQuestionPopupRoute];

@NgModule({
    imports: [GeargatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GearSurveyQuestionComponent,
        GearSurveyQuestionDetailComponent,
        GearSurveyQuestionUpdateComponent,
        GearSurveyQuestionDeleteDialogComponent,
        GearSurveyQuestionDeletePopupComponent
    ],
    entryComponents: [
        GearSurveyQuestionComponent,
        GearSurveyQuestionUpdateComponent,
        GearSurveyQuestionDeleteDialogComponent,
        GearSurveyQuestionDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeargatewayGearSurveyQuestionModule {}
