import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAlfrescoSite } from 'app/shared/model/alfresco-site.model';
import { Principal } from 'app/core';
import { AlfrescoSiteService } from './alfresco-site.service';

@Component({
    selector: 'jhi-alfresco-site',
    templateUrl: './alfresco-site.component.html'
})
export class AlfrescoSiteComponent implements OnInit, OnDestroy {
    alfrescoSites: IAlfrescoSite[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private alfrescoSiteService: AlfrescoSiteService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.alfrescoSiteService.query().subscribe(
            (res: HttpResponse<IAlfrescoSite[]>) => {
                this.alfrescoSites = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAlfrescoSites();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAlfrescoSite) {
        return item.id;
    }

    registerChangeInAlfrescoSites() {
        this.eventSubscriber = this.eventManager.subscribe('alfrescoSiteListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
