import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IGearSurveySolve } from 'app/shared/model/gear-survey-solve.model';
import { GearSurveySolveService } from './gear-survey-solve.service';
import { IGearSurvey } from 'app/shared/model/gear-survey.model';
import { GearSurveyService } from 'app/entities/gear-survey';
import { IGearSurveyQuestion } from 'app/shared/model/gear-survey-question.model';
import { GearSurveyQuestionService } from 'app/entities/gear-survey-question';
import { IGearSurveyAnswer } from 'app/shared/model/gear-survey-answer.model';
import { GearSurveyAnswerService } from 'app/entities/gear-survey-answer';

@Component({
    selector: 'jhi-gear-survey-solve-update',
    templateUrl: './gear-survey-solve-update.component.html'
})
export class GearSurveySolveUpdateComponent implements OnInit {
    gearSurveySolve: IGearSurveySolve;
    isSaving: boolean;

    gearsurveys: IGearSurvey[];

    gearsurveyquestions: IGearSurveyQuestion[];

    gearsurveyanswers: IGearSurveyAnswer[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private gearSurveySolveService: GearSurveySolveService,
        private gearSurveyService: GearSurveyService,
        private gearSurveyQuestionService: GearSurveyQuestionService,
        private gearSurveyAnswerService: GearSurveyAnswerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearSurveySolve }) => {
            this.gearSurveySolve = gearSurveySolve;
        });
        this.gearSurveyService.query().subscribe(
            (res: HttpResponse<IGearSurvey[]>) => {
                this.gearsurveys = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.gearSurveyQuestionService.query().subscribe(
            (res: HttpResponse<IGearSurveyQuestion[]>) => {
                this.gearsurveyquestions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.gearSurveyAnswerService.query().subscribe(
            (res: HttpResponse<IGearSurveyAnswer[]>) => {
                this.gearsurveyanswers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearSurveySolve.id !== undefined) {
            this.subscribeToSaveResponse(this.gearSurveySolveService.update(this.gearSurveySolve));
        } else {
            this.subscribeToSaveResponse(this.gearSurveySolveService.create(this.gearSurveySolve));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearSurveySolve>>) {
        result.subscribe((res: HttpResponse<IGearSurveySolve>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackGearSurveyQuestionById(index: number, item: IGearSurveyQuestion) {
        return item.id;
    }

    trackGearSurveyAnswerById(index: number, item: IGearSurveyAnswer) {
        return item.id;
    }
}
