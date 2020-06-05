import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearSurveyQuestionType } from 'app/shared/model/gear-survey-question-type.model';
import { Principal } from 'app/core';
import { GearSurveyQuestionTypeService } from './gear-survey-question-type.service';

@Component({
    selector: 'jhi-gear-survey-question-type',
    templateUrl: './gear-survey-question-type.component.html'
})
export class GearSurveyQuestionTypeComponent implements OnInit, OnDestroy {
    gearSurveyQuestionTypes: IGearSurveyQuestionType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private gearSurveyQuestionTypeService: GearSurveyQuestionTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.gearSurveyQuestionTypeService.query().subscribe(
            (res: HttpResponse<IGearSurveyQuestionType[]>) => {
                this.gearSurveyQuestionTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGearSurveyQuestionTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGearSurveyQuestionType) {
        return item.id;
    }

    registerChangeInGearSurveyQuestionTypes() {
        this.eventSubscriber = this.eventManager.subscribe('gearSurveyQuestionTypeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
