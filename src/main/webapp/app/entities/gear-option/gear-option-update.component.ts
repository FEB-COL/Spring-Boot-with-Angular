import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IGearOption } from 'app/shared/model/gear-option.model';
import { GearOptionService } from './gear-option.service';
import { IGearDecision } from 'app/shared/model/gear-decision.model';
import { GearDecisionService } from 'app/entities/gear-decision';

@Component({
    selector: 'jhi-gear-option-update',
    templateUrl: './gear-option-update.component.html'
})
export class GearOptionUpdateComponent implements OnInit {
    gearOption: IGearOption;
    isSaving: boolean;

    geardecisions: IGearDecision[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private gearOptionService: GearOptionService,
        private gearDecisionService: GearDecisionService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearOption }) => {
            this.gearOption = gearOption;
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
        if (this.gearOption.id !== undefined) {
            this.subscribeToSaveResponse(this.gearOptionService.update(this.gearOption));
        } else {
            this.subscribeToSaveResponse(this.gearOptionService.create(this.gearOption));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearOption>>) {
        result.subscribe((res: HttpResponse<IGearOption>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
