import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearProcessInfoSystem } from 'app/shared/model/gear-process-info-system.model';
import { Principal } from 'app/core';
import { GearProcessInfoSystemService } from './gear-process-info-system.service';

@Component({
    selector: 'jhi-gear-process-info-system',
    templateUrl: './gear-process-info-system.component.html'
})
export class GearProcessInfoSystemComponent implements OnInit, OnDestroy {
    gearProcessInfoSystems: IGearProcessInfoSystem[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private gearProcessInfoSystemService: GearProcessInfoSystemService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.gearProcessInfoSystemService.query().subscribe(
            (res: HttpResponse<IGearProcessInfoSystem[]>) => {
                this.gearProcessInfoSystems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGearProcessInfoSystems();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGearProcessInfoSystem) {
        return item.id;
    }

    registerChangeInGearProcessInfoSystems() {
        this.eventSubscriber = this.eventManager.subscribe('gearProcessInfoSystemListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
