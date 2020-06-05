import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IGearValueChainMacroprocess } from 'app/shared/model/gear-value-chain-macroprocess.model';
import { GearValueChainMacroprocessService } from './gear-value-chain-macroprocess.service';
import { IGearValueChainCategory } from 'app/shared/model/gear-value-chain-category.model';
import { GearValueChainCategoryService } from 'app/entities/gear-value-chain-category';

@Component({
    selector: 'jhi-gear-value-chain-macroprocess-update',
    templateUrl: './gear-value-chain-macroprocess-update.component.html'
})
export class GearValueChainMacroprocessUpdateComponent implements OnInit {
    gearValueChainMacroprocess: IGearValueChainMacroprocess;
    isSaving: boolean;

    gearvaluechaincategories: IGearValueChainCategory[];
    creationDateDp: any;
    lastUpdateDp: any;
    gearcategoryTemporal: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private gearValueChainMacroprocessService: GearValueChainMacroprocessService,
        private gearValueChainCategoryService: GearValueChainCategoryService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearValueChainMacroprocess }) => {
            this.gearValueChainMacroprocess = gearValueChainMacroprocess;
        });
        this.gearValueChainCategoryService.query().subscribe(
            (res: HttpResponse<IGearValueChainCategory[]>) => {
                this.gearvaluechaincategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        //traer nombre y id
        console.log('Consulta de ID y NAME', this.gearcategoryTemporal);
        this.gearValueChainMacroprocess.gearvaluechaincategoryId = this.gearcategoryTemporal['id'];
        console.log('Consulta de ID NUMERO 1', this.gearValueChainMacroprocess.gearvaluechaincategoryId);
        this.gearValueChainMacroprocess.gearvaluechaincategoryName = this.gearcategoryTemporal['name'];
        console.log('Consulta de NAME NUMERO 2', this.gearValueChainMacroprocess.gearvaluechaincategoryName);
        //fin de id y nombre
        if (this.gearValueChainMacroprocess.id !== undefined) {
            this.subscribeToSaveResponse(this.gearValueChainMacroprocessService.update(this.gearValueChainMacroprocess));
        } else {
            this.subscribeToSaveResponse(this.gearValueChainMacroprocessService.create(this.gearValueChainMacroprocess));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearValueChainMacroprocess>>) {
        result.subscribe(
            (res: HttpResponse<IGearValueChainMacroprocess>) => this.onSaveSuccess(),
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

    trackGearValueChainCategoryById(index: number, item: IGearValueChainCategory) {
        return item.id;
    }
}
