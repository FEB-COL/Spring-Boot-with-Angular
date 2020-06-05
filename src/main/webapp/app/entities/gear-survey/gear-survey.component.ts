import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearSurvey } from 'app/shared/model/gear-survey.model';
import { Principal } from 'app/core';
import { GearSurveyService } from './gear-survey.service';

@Component({
    selector: 'jhi-gear-survey',
    templateUrl: './gear-survey.component.html'
})
export class GearSurveyComponent implements OnInit, OnDestroy {
    gearSurveys: IGearSurvey[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private gearSurveyService: GearSurveyService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.gearSurveyService.query().subscribe(
            (res: HttpResponse<IGearSurvey[]>) => {
                this.gearSurveys = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGearSurveys();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGearSurvey) {
        return item.id;
    }

    registerChangeInGearSurveys() {
        this.eventSubscriber = this.eventManager.subscribe('gearSurveyListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
