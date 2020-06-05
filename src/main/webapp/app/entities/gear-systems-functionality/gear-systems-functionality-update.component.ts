import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IGearSystemsFunctionality } from 'app/shared/model/gear-systems-functionality.model';
import { GearSystemsFunctionalityService } from './gear-systems-functionality.service';
import { IGearInformationSystems } from 'app/shared/model/gear-information-systems.model';
import { GearInformationSystemsService } from 'app/entities/gear-information-systems';
//import { GearInformationSystemsService } from 'app/entities/gear-information-systems.service';

@Component({
    selector: 'jhi-gear-systems-functionality-update',
    templateUrl: './gear-systems-functionality-update.component.html'
})
export class GearSystemsFunctionalityUpdateComponent implements OnInit {
    gearSystemsFunctionality: IGearSystemsFunctionality;
    isSaving: boolean;

    gearinformationsystems: IGearInformationSystems[];
    creationDateDp: any;
    modifyDateDp: any;
    gearsystemtemporal: any;
    constructor(
        private jhiAlertService: JhiAlertService,
        private gearSystemsFunctionalityService: GearSystemsFunctionalityService,
        private gearInformationSystemsService: GearInformationSystemsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearSystemsFunctionality }) => {
            this.gearSystemsFunctionality = gearSystemsFunctionality;
        });

        this.gearInformationSystemsService.query().subscribe(
            (res: HttpResponse<IGearInformationSystems[]>) => {
                this.gearinformationsystems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    trackIdSystem(index: number, item: IGearInformationSystems) {
        return item.id;
    }

    save() {
        this.isSaving = true;
        console.log('Consulta de ID y NAME', this.gearsystemtemporal);
        this.gearSystemsFunctionality.gearinformationsystemsId = this.gearsystemtemporal['id'];
        console.log('Consulta de ID NUMERO 1', this.gearSystemsFunctionality.gearinformationsystemsId);
        this.gearSystemsFunctionality.gearInformationSystemName = this.gearsystemtemporal['name'];
        console.log('Consulta de NAME NUMERO 2', this.gearSystemsFunctionality.gearInformationSystemName);
        if (this.gearSystemsFunctionality.id !== undefined) {
            this.subscribeToSaveResponse(this.gearSystemsFunctionalityService.update(this.gearSystemsFunctionality));
        } else {
            this.subscribeToSaveResponse(this.gearSystemsFunctionalityService.create(this.gearSystemsFunctionality));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearSystemsFunctionality>>) {
        result.subscribe(
            (res: HttpResponse<IGearSystemsFunctionality>) => this.onSaveSuccess(),
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
}
