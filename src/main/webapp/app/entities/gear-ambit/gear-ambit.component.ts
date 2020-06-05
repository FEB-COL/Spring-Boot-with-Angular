import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearAmbit } from 'app/shared/model/gear-ambit.model';
import { Principal } from 'app/core';
import { GearAmbitService } from './gear-ambit.service';

@Component({
    selector: 'jhi-gear-ambit',
    templateUrl: './gear-ambit.component.html'
})
export class GearAmbitComponent implements OnInit, OnDestroy {
    gearAmbits: IGearAmbit[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private gearAmbitService: GearAmbitService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.gearAmbitService.query().subscribe(
            (res: HttpResponse<IGearAmbit[]>) => {
                this.gearAmbits = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGearAmbits();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGearAmbit) {
        return item.id;
    }

    registerChangeInGearAmbits() {
        this.eventSubscriber = this.eventManager.subscribe('gearAmbitListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
