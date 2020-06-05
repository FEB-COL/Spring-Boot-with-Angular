import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IGearFiles } from 'app/shared/model/gear-files.model';
import { GearFilesService } from './gear-files.service';
import { IGearDomain } from 'app/shared/model/gear-domain.model';
import { GearDomainService } from 'app/entities/gear-domain';

@Component({
    selector: 'jhi-gear-files-update',
    templateUrl: './gear-files-update.component.html'
})
export class GearFilesUpdateComponent implements OnInit {
    gearFiles: IGearFiles;
    isSaving: boolean;

    geardomains: IGearDomain[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private gearFilesService: GearFilesService,
        private gearDomainService: GearDomainService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearFiles }) => {
            this.gearFiles = gearFiles;
        });
        this.gearDomainService.query().subscribe(
            (res: HttpResponse<IGearDomain[]>) => {
                this.geardomains = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearFiles.id !== undefined) {
            this.subscribeToSaveResponse(this.gearFilesService.update(this.gearFiles));
        } else {
            this.subscribeToSaveResponse(this.gearFilesService.create(this.gearFiles));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearFiles>>) {
        result.subscribe((res: HttpResponse<IGearFiles>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackGearDomainById(index: number, item: IGearDomain) {
        return item.id;
    }
}
