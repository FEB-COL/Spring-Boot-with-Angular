import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearDiagnosisType } from 'app/shared/model/gear-diagnosis-type.model';
import { Principal } from 'app/core';
import { GearDiagnosisTypeService } from './gear-diagnosis-type.service';

@Component({
    selector: 'jhi-gear-diagnosis-type',
    templateUrl: './gear-diagnosis-type.component.html'
})
export class GearDiagnosisTypeComponent implements OnInit, OnDestroy {
    gearDiagnosisTypes: IGearDiagnosisType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private gearDiagnosisTypeService: GearDiagnosisTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.gearDiagnosisTypeService.query().subscribe(
            (res: HttpResponse<IGearDiagnosisType[]>) => {
                this.gearDiagnosisTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGearDiagnosisTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGearDiagnosisType) {
        return item.id;
    }

    registerChangeInGearDiagnosisTypes() {
        this.eventSubscriber = this.eventManager.subscribe('gearDiagnosisTypeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
