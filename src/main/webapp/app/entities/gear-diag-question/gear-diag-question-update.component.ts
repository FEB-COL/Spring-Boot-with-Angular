import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IGearDiagQuestion } from 'app/shared/model/gear-diag-question.model';
import { GearDiagQuestionService } from './gear-diag-question.service';
import { IGearDiagnosis } from 'app/shared/model/gear-diagnosis.model';
import { GearDiagnosisService } from 'app/entities/gear-diagnosis';
import { IGearAmbit } from 'app/shared/model/gear-ambit.model';
import { GearAmbitService } from 'app/entities/gear-ambit';

@Component({
    selector: 'jhi-gear-diag-question-update',
    templateUrl: './gear-diag-question-update.component.html'
})
export class GearDiagQuestionUpdateComponent implements OnInit {
    gearDiagQuestion: IGearDiagQuestion;
    isSaving: boolean;

    geardiagnoses: IGearDiagnosis[];

    gearambits: IGearAmbit[];
    creationDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private gearDiagQuestionService: GearDiagQuestionService,
        private gearDiagnosisService: GearDiagnosisService,
        private gearAmbitService: GearAmbitService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearDiagQuestion }) => {
            this.gearDiagQuestion = gearDiagQuestion;
        });
        this.gearDiagnosisService.query().subscribe(
            (res: HttpResponse<IGearDiagnosis[]>) => {
                this.geardiagnoses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.gearAmbitService.query().subscribe(
            (res: HttpResponse<IGearAmbit[]>) => {
                this.gearambits = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearDiagQuestion.id !== undefined) {
            this.subscribeToSaveResponse(this.gearDiagQuestionService.update(this.gearDiagQuestion));
        } else {
            this.subscribeToSaveResponse(this.gearDiagQuestionService.create(this.gearDiagQuestion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearDiagQuestion>>) {
        result.subscribe((res: HttpResponse<IGearDiagQuestion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackGearDiagnosisById(index: number, item: IGearDiagnosis) {
        return item.id;
    }

    trackGearAmbitById(index: number, item: IGearAmbit) {
        return item.id;
    }
}
