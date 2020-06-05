import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IGearSurveyAnswer } from 'app/shared/model/gear-survey-answer.model';
import { GearSurveyAnswerService } from './gear-survey-answer.service';
import { IGearSurveyQuestion } from 'app/shared/model/gear-survey-question.model';
import { GearSurveyQuestionService } from 'app/entities/gear-survey-question';

@Component({
    selector: 'jhi-gear-survey-answer-update',
    templateUrl: './gear-survey-answer-update.component.html'
})
export class GearSurveyAnswerUpdateComponent implements OnInit {
    gearSurveyAnswer: IGearSurveyAnswer;
    isSaving: boolean;

    gearsurveyquestions: IGearSurveyQuestion[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private gearSurveyAnswerService: GearSurveyAnswerService,
        private gearSurveyQuestionService: GearSurveyQuestionService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearSurveyAnswer }) => {
            this.gearSurveyAnswer = gearSurveyAnswer;
        });
        this.gearSurveyQuestionService.query().subscribe(
            (res: HttpResponse<IGearSurveyQuestion[]>) => {
                this.gearsurveyquestions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearSurveyAnswer.id !== undefined) {
            this.subscribeToSaveResponse(this.gearSurveyAnswerService.update(this.gearSurveyAnswer));
        } else {
            this.subscribeToSaveResponse(this.gearSurveyAnswerService.create(this.gearSurveyAnswer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearSurveyAnswer>>) {
        result.subscribe((res: HttpResponse<IGearSurveyAnswer>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackGearSurveyQuestionById(index: number, item: IGearSurveyQuestion) {
        return item.id;
    }
}
