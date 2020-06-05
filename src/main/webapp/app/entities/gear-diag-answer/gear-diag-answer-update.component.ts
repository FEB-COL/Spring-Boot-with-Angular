import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IGearDiagAnswer } from 'app/shared/model/gear-diag-answer.model';
import { GearDiagAnswerService } from './gear-diag-answer.service';
import { IGearDiagQuestion } from 'app/shared/model/gear-diag-question.model';
import { GearDiagQuestionService } from 'app/entities/gear-diag-question';

@Component({
    selector: 'jhi-gear-diag-answer-update',
    templateUrl: './gear-diag-answer-update.component.html'
})
export class GearDiagAnswerUpdateComponent implements OnInit {
    gearDiagAnswer: IGearDiagAnswer;
    isSaving: boolean;

    geardiagquestions: IGearDiagQuestion[];
    creationDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private gearDiagAnswerService: GearDiagAnswerService,
        private gearDiagQuestionService: GearDiagQuestionService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearDiagAnswer }) => {
            this.gearDiagAnswer = gearDiagAnswer;
        });
        this.gearDiagQuestionService.query().subscribe(
            (res: HttpResponse<IGearDiagQuestion[]>) => {
                this.geardiagquestions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearDiagAnswer.id !== undefined) {
            this.subscribeToSaveResponse(this.gearDiagAnswerService.update(this.gearDiagAnswer));
        } else {
            this.subscribeToSaveResponse(this.gearDiagAnswerService.create(this.gearDiagAnswer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearDiagAnswer>>) {
        result.subscribe((res: HttpResponse<IGearDiagAnswer>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackGearDiagQuestionById(index: number, item: IGearDiagQuestion) {
        return item.id;
    }
}
