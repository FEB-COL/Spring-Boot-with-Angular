import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearUser } from 'app/shared/model/gear-user.model';
import { Principal } from 'app/core';
import { GearUserService } from './gear-user.service';

@Component({
    selector: 'jhi-gear-user',
    templateUrl: './gear-user.component.html'
})
export class GearUserComponent implements OnInit, OnDestroy {
    gearUsers: IGearUser[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private gearUserService: GearUserService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.gearUserService.query().subscribe(
            (res: HttpResponse<IGearUser[]>) => {
                this.gearUsers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGearUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGearUser) {
        return item.id;
    }

    registerChangeInGearUsers() {
        this.eventSubscriber = this.eventManager.subscribe('gearUserListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
