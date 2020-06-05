import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearSurveyQuestion } from 'app/shared/model/gear-survey-question.model';
import { Principal } from 'app/core';
import { GearSurveyQuestionService } from './gear-survey-question.service';

@Component({
    selector: 'jhi-gear-survey-question',
    templateUrl: './gear-survey-question.component.html'
})
export class GearSurveyQuestionComponent implements OnInit, OnDestroy {
    gearSurveyQuestions: IGearSurveyQuestion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private gearSurveyQuestionService: GearSurveyQuestionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.gearSurveyQuestionService.query().subscribe(
            (res: HttpResponse<IGearSurveyQuestion[]>) => {
                this.gearSurveyQuestions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGearSurveyQuestions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGearSurveyQuestion) {
        return item.id;
    }

    registerChangeInGearSurveyQuestions() {
        this.eventSubscriber = this.eventManager.subscribe('gearSurveyQuestionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
