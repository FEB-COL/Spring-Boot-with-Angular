import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { IGearSurvey } from 'app/shared/model/gear-survey.model';
import { GearSurveyService } from './gear-survey.service';

@Component({
    selector: 'jhi-gear-survey-update',
    templateUrl: './gear-survey-update.component.html'
})
export class GearSurveyUpdateComponent implements OnInit {
    gearSurvey: IGearSurvey;
    isSaving: boolean;
    startDp: any;
    endDp: any;

    constructor(private gearSurveyService: GearSurveyService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearSurvey }) => {
            this.gearSurvey = gearSurvey;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearSurvey.id !== undefined) {
            this.subscribeToSaveResponse(this.gearSurveyService.update(this.gearSurvey));
        } else {
            this.subscribeToSaveResponse(this.gearSurveyService.create(this.gearSurvey));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearSurvey>>) {
        result.subscribe((res: HttpResponse<IGearSurvey>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
