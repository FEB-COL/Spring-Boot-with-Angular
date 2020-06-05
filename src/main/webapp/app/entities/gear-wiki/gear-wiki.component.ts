import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearWiki } from 'app/shared/model/gear-wiki.model';
import { Principal } from 'app/core';
import { GearWikiService } from './gear-wiki.service';

@Component({
    selector: 'jhi-gear-wiki',
    templateUrl: './gear-wiki.component.html',
    styleUrls: ['./gear-wiki.component.scss']
})
export class GearWikiComponent implements OnInit, OnDestroy {
    gearWikis: IGearWiki[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private gearWikiService: GearWikiService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.gearWikiService.query().subscribe(
            (res: HttpResponse<IGearWiki[]>) => {
                this.gearWikis = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGearWikis();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGearWiki) {
        return item.id;
    }

    registerChangeInGearWikis() {
        this.eventSubscriber = this.eventManager.subscribe('gearWikiListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
