import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IGearCriteria } from 'app/shared/model/gear-criteria.model';
import { GearCriteriaService } from './gear-criteria.service';
import { IGearDecision } from 'app/shared/model/gear-decision.model';
import { GearDecisionService } from 'app/entities/gear-decision';

@Component({
    selector: 'jhi-gear-criteria-update',
    templateUrl: './gear-criteria-update.component.html'
})
export class GearCriteriaUpdateComponent implements OnInit {
    gearCriteria: IGearCriteria;
    isSaving: boolean;

    geardecisions: IGearDecision[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private gearCriteriaService: GearCriteriaService,
        private gearDecisionService: GearDecisionService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearCriteria }) => {
            this.gearCriteria = gearCriteria;
        });
        this.gearDecisionService.query().subscribe(
            (res: HttpResponse<IGearDecision[]>) => {
                this.geardecisions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearCriteria.id !== undefined) {
            this.subscribeToSaveResponse(this.gearCriteriaService.update(this.gearCriteria));
        } else {
            this.subscribeToSaveResponse(this.gearCriteriaService.create(this.gearCriteria));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearCriteria>>) {
        result.subscribe((res: HttpResponse<IGearCriteria>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackGearDecisionById(index: number, item: IGearDecision) {
        return item.id;
    }
}
