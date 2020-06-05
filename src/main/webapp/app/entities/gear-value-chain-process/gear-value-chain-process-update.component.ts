import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IGearValueChainProcess } from 'app/shared/model/gear-value-chain-process.model';
import { GearValueChainProcessService } from './gear-value-chain-process.service';
import { IGearValueChainMacroprocess } from 'app/shared/model/gear-value-chain-macroprocess.model';
import { GearValueChainMacroprocessService } from 'app/entities/gear-value-chain-macroprocess';

@Component({
    selector: 'jhi-gear-value-chain-process-update',
    templateUrl: './gear-value-chain-process-update.component.html'
})
export class GearValueChainProcessUpdateComponent implements OnInit {
    gearValueChainProcess: IGearValueChainProcess;
    isSaving: boolean;

    gearvaluechainmacroprocesses: IGearValueChainMacroprocess[];
    creationDateDp: any;
    lastUpdateDp: any;
    gearprocessTemporal: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private gearValueChainProcessService: GearValueChainProcessService,
        private gearValueChainMacroprocessService: GearValueChainMacroprocessService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearValueChainProcess }) => {
            this.gearValueChainProcess = gearValueChainProcess;
        });
        this.gearValueChainMacroprocessService.query().subscribe(
            (res: HttpResponse<IGearValueChainMacroprocess[]>) => {
                this.gearvaluechainmacroprocesses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        //traer nombre y id
        this.isSaving = true;
        console.log('Consulta de ID y NAME', this.gearprocessTemporal);
        this.gearValueChainProcess.gearvaluechainmacroprocessId = this.gearprocessTemporal['id'];
        console.log('Consulta de ID NUMERO 1', this.gearValueChainProcess.gearvaluechainmacroprocessId);
        this.gearValueChainProcess.gearvaluechainmacroprocessName = this.gearprocessTemporal['name'];
        console.log('Consulta de NAME NUMERO 2', this.gearValueChainProcess.gearvaluechainmacroprocessId);
        //fin de id y nombre

        //
        this.isSaving = true;
        if (this.gearValueChainProcess.id !== undefined) {
            this.subscribeToSaveResponse(this.gearValueChainProcessService.update(this.gearValueChainProcess));
        } else {
            this.subscribeToSaveResponse(this.gearValueChainProcessService.create(this.gearValueChainProcess));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearValueChainProcess>>) {
        result.subscribe(
            (res: HttpResponse<IGearValueChainProcess>) => this.onSaveSuccess(),
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

    trackGearValueChainMacroprocessById(index: number, item: IGearValueChainMacroprocess) {
        return item.id;
    }
}
