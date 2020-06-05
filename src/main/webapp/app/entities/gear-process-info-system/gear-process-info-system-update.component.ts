import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IGearProcessInfoSystem } from 'app/shared/model/gear-process-info-system.model';
import { GearProcessInfoSystemService } from './gear-process-info-system.service';
import { IGearInformationSystems } from 'app/shared/model/gear-information-systems.model';
import { GearInformationSystemsService } from 'app/entities/gear-information-systems';
import { IGearValueChainProcess } from 'app/shared/model/gear-value-chain-process.model';
import { GearValueChainProcessService } from 'app/entities/gear-value-chain-process';

@Component({
    selector: 'jhi-gear-process-info-system-update',
    templateUrl: './gear-process-info-system-update.component.html'
})
export class GearProcessInfoSystemUpdateComponent implements OnInit {
    gearProcessInfoSystem: IGearProcessInfoSystem;
    isSaving: boolean;

    gearinformationsystems: IGearInformationSystems[];

    gearvaluechainprocesses: IGearValueChainProcess[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private gearProcessInfoSystemService: GearProcessInfoSystemService,
        private gearInformationSystemsService: GearInformationSystemsService,
        private gearValueChainProcessService: GearValueChainProcessService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearProcessInfoSystem }) => {
            this.gearProcessInfoSystem = gearProcessInfoSystem;
        });
        this.gearInformationSystemsService.query().subscribe(
            (res: HttpResponse<IGearInformationSystems[]>) => {
                this.gearinformationsystems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.gearValueChainProcessService.query().subscribe(
            (res: HttpResponse<IGearValueChainProcess[]>) => {
                this.gearvaluechainprocesses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearProcessInfoSystem.id !== undefined) {
            this.subscribeToSaveResponse(this.gearProcessInfoSystemService.update(this.gearProcessInfoSystem));
        } else {
            this.subscribeToSaveResponse(this.gearProcessInfoSystemService.create(this.gearProcessInfoSystem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearProcessInfoSystem>>) {
        result.subscribe(
            (res: HttpResponse<IGearProcessInfoSystem>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackGearInformationSystemsById(index: number, item: IGearInformationSystems) {
        return item.id;
    }

    trackGearValueChainProcessById(index: number, item: IGearValueChainProcess) {
        return item.id;
    }
}
