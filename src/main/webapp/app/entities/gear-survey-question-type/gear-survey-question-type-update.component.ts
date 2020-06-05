import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGearSurveyQuestionType } from 'app/shared/model/gear-survey-question-type.model';
import { GearSurveyQuestionTypeService } from './gear-survey-question-type.service';

@Component({
    selector: 'jhi-gear-survey-question-type-update',
    templateUrl: './gear-survey-question-type-update.component.html'
})
export class GearSurveyQuestionTypeUpdateComponent implements OnInit {
    gearSurveyQuestionType: IGearSurveyQuestionType;
    isSaving: boolean;

    constructor(private gearSurveyQuestionTypeService: GearSurveyQuestionTypeService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearSurveyQuestionType }) => {
            this.gearSurveyQuestionType = gearSurveyQuestionType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearSurveyQuestionType.id !== undefined) {
            this.subscribeToSaveResponse(this.gearSurveyQuestionTypeService.update(this.gearSurveyQuestionType));
        } else {
            this.subscribeToSaveResponse(this.gearSurveyQuestionTypeService.create(this.gearSurveyQuestionType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearSurveyQuestionType>>) {
        result.subscribe(
            (res: HttpResponse<IGearSurveyQuestionType>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
