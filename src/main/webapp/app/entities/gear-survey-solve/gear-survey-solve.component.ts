import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearSurveySolve } from 'app/shared/model/gear-survey-solve.model';
import { Principal } from 'app/core';
import { GearSurveySolveService } from './gear-survey-solve.service';

@Component({
    selector: 'jhi-gear-survey-solve',
    templateUrl: './gear-survey-solve.component.html'
})
export class GearSurveySolveComponent implements OnInit, OnDestroy {
    gearSurveySolves: IGearSurveySolve[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private gearSurveySolveService: GearSurveySolveService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.gearSurveySolveService.query().subscribe(
            (res: HttpResponse<IGearSurveySolve[]>) => {
                this.gearSurveySolves = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGearSurveySolves();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGearSurveySolve) {
        return item.id;
    }

    registerChangeInGearSurveySolves() {
        this.eventSubscriber = this.eventManager.subscribe('gearSurveySolveListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
