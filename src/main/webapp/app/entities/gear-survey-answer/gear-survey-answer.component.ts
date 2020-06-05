import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearSurveyAnswer } from 'app/shared/model/gear-survey-answer.model';
import { Principal } from 'app/core';
import { GearSurveyAnswerService } from './gear-survey-answer.service';

@Component({
    selector: 'jhi-gear-survey-answer',
    templateUrl: './gear-survey-answer.component.html'
})
export class GearSurveyAnswerComponent implements OnInit, OnDestroy {
    gearSurveyAnswers: IGearSurveyAnswer[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private gearSurveyAnswerService: GearSurveyAnswerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.gearSurveyAnswerService.query().subscribe(
            (res: HttpResponse<IGearSurveyAnswer[]>) => {
                this.gearSurveyAnswers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGearSurveyAnswers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGearSurveyAnswer) {
        return item.id;
    }

    registerChangeInGearSurveyAnswers() {
        this.eventSubscriber = this.eventManager.subscribe('gearSurveyAnswerListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
