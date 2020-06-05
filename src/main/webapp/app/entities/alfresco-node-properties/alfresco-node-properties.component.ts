import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAlfrescoNodeProperties } from 'app/shared/model/alfresco-node-properties.model';
import { Principal } from 'app/core';
import { AlfrescoNodePropertiesService } from './alfresco-node-properties.service';

@Component({
    selector: 'jhi-alfresco-node-properties',
    templateUrl: './alfresco-node-properties.component.html'
})
export class AlfrescoNodePropertiesComponent implements OnInit, OnDestroy {
    alfrescoNodeProperties: IAlfrescoNodeProperties[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private alfrescoNodePropertiesService: AlfrescoNodePropertiesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.alfrescoNodePropertiesService.query().subscribe(
            (res: HttpResponse<IAlfrescoNodeProperties[]>) => {
                this.alfrescoNodeProperties = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAlfrescoNodeProperties();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAlfrescoNodeProperties) {
        return item.id;
    }

    registerChangeInAlfrescoNodeProperties() {
        this.eventSubscriber = this.eventManager.subscribe('alfrescoNodePropertiesListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
