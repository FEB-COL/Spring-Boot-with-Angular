import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IGearSurveyQuestion } from 'app/shared/model/gear-survey-question.model';
import { GearSurveyQuestionService } from './gear-survey-question.service';
import { IGearSurvey } from 'app/shared/model/gear-survey.model';
import { GearSurveyService } from 'app/entities/gear-survey';
import { IGearSurveyQuestionType } from 'app/shared/model/gear-survey-question-type.model';
import { GearSurveyQuestionTypeService } from 'app/entities/gear-survey-question-type';

@Component({
    selector: 'jhi-gear-survey-question-update',
    templateUrl: './gear-survey-question-update.component.html'
})
export class GearSurveyQuestionUpdateComponent implements OnInit {
    gearSurveyQuestion: IGearSurveyQuestion;
    isSaving: boolean;

    gearsurveys: IGearSurvey[];

    gearsurveyquestiontypes: IGearSurveyQuestionType[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private gearSurveyQuestionService: GearSurveyQuestionService,
        private gearSurveyService: GearSurveyService,
        private gearSurveyQuestionTypeService: GearSurveyQuestionTypeService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearSurveyQuestion }) => {
            this.gearSurveyQuestion = gearSurveyQuestion;
        });
        this.gearSurveyService.query().subscribe(
            (res: HttpResponse<IGearSurvey[]>) => {
                this.gearsurveys = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.gearSurveyQuestionTypeService.query().subscribe(
            (res: HttpResponse<IGearSurveyQuestionType[]>) => {
                this.gearsurveyquestiontypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearSurveyQuestion.id !== undefined) {
            this.subscribeToSaveResponse(this.gearSurveyQuestionService.update(this.gearSurveyQuestion));
        } else {
            this.subscribeToSaveResponse(this.gearSurveyQuestionService.create(this.gearSurveyQuestion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearSurveyQuestion>>) {
        result.subscribe((res: HttpResponse<IGearSurveyQuestion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackGearSurveyById(index: number, item: IGearSurvey) {
        return item.id;
    }

    trackGearSurveyQuestionTypeById(index: number, item: IGearSurveyQuestionType) {
        return item.id;
    }
}
