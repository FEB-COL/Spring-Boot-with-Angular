import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearRiskLog } from 'app/shared/model/gear-risk-log.model';
import { Principal } from 'app/core';
import { GearRiskLogService } from './gear-risk-log.service';

@Component({
    selector: 'jhi-gear-risk-log',
    templateUrl: './gear-risk-log.component.html'
})
export class GearRiskLogComponent implements OnInit, OnDestroy {
    gearRiskLogs: IGearRiskLog[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private gearRiskLogService: GearRiskLogService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.gearRiskLogService.query().subscribe(
            (res: HttpResponse<IGearRiskLog[]>) => {
                this.gearRiskLogs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGearRiskLogs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGearRiskLog) {
        return item.id;
    }

    registerChangeInGearRiskLogs() {
        this.eventSubscriber = this.eventManager.subscribe('gearRiskLogListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
