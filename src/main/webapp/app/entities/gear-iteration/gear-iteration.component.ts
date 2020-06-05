import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearIteration } from 'app/shared/model/gear-iteration.model';
import { Principal } from 'app/core';
import { GearIterationService } from './gear-iteration.service';

@Component({
    selector: 'jhi-gear-iteration',
    templateUrl: './gear-iteration.component.html'
})
export class GearIterationComponent implements OnInit, OnDestroy {
    gearIterations: IGearIteration[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private gearIterationService: GearIterationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.gearIterationService.query().subscribe(
            (res: HttpResponse<IGearIteration[]>) => {
                this.gearIterations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGearIterations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGearIteration) {
        return item.id;
    }

    registerChangeInGearIterations() {
        this.eventSubscriber = this.eventManager.subscribe('gearIterationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
