import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IGearDecision } from 'app/shared/model/gear-decision.model';
import { GearDecisionService } from './gear-decision.service';
import { IGearDomain } from 'app/shared/model/gear-domain.model';
import { GearDomainService } from 'app/entities/gear-domain';

@Component({
    selector: 'jhi-gear-decision-update',
    templateUrl: './gear-decision-update.component.html'
})
export class GearDecisionUpdateComponent implements OnInit {
    gearDecision: IGearDecision;
    isSaving: boolean;

    geardomains: IGearDomain[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private gearDecisionService: GearDecisionService,
        private gearDomainService: GearDomainService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearDecision }) => {
            this.gearDecision = gearDecision;
        });
        this.gearDomainService.query().subscribe(
            (res: HttpResponse<IGearDomain[]>) => {
                this.geardomains = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearDecision.id !== undefined) {
            this.subscribeToSaveResponse(this.gearDecisionService.update(this.gearDecision));
        } else {
            this.subscribeToSaveResponse(this.gearDecisionService.create(this.gearDecision));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearDecision>>) {
        result.subscribe((res: HttpResponse<IGearDecision>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackGearDomainById(index: number, item: IGearDomain) {
        return item.id;
    }
}
