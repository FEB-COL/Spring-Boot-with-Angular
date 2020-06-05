import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IGearDocumentType } from 'app/shared/model/gear-document-type.model';
import { GearDocumentTypeService } from './gear-document-type.service';
import { IGearDomain } from 'app/shared/model/gear-domain.model';
import { GearDomainService } from 'app/entities/gear-domain';

@Component({
    selector: 'jhi-gear-document-type-update',
    templateUrl: './gear-document-type-update.component.html'
})
export class GearDocumentTypeUpdateComponent implements OnInit {
    gearDocumentType: IGearDocumentType;
    isSaving: boolean;

    geardomains: IGearDomain[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private gearDocumentTypeService: GearDocumentTypeService,
        private gearDomainService: GearDomainService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearDocumentType }) => {
            this.gearDocumentType = gearDocumentType;
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
        if (this.gearDocumentType.id !== undefined) {
            this.subscribeToSaveResponse(this.gearDocumentTypeService.update(this.gearDocumentType));
        } else {
            this.subscribeToSaveResponse(this.gearDocumentTypeService.create(this.gearDocumentType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearDocumentType>>) {
        result.subscribe((res: HttpResponse<IGearDocumentType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
