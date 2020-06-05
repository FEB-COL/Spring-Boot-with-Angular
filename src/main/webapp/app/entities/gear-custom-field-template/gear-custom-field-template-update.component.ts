import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IGearCustomFieldTemplate } from 'app/shared/model/gear-custom-field-template.model';
import { GearCustomFieldTemplateService } from './gear-custom-field-template.service';
import { IGearDocumentType } from 'app/shared/model/gear-document-type.model';
import { GearDocumentTypeService } from 'app/entities/gear-document-type';

@Component({
    selector: 'jhi-gear-custom-field-template-update',
    templateUrl: './gear-custom-field-template-update.component.html'
})
export class GearCustomFieldTemplateUpdateComponent implements OnInit {
    gearCustomFieldTemplate: IGearCustomFieldTemplate;
    isSaving: boolean;

    geardocumenttypes: IGearDocumentType[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private gearCustomFieldTemplateService: GearCustomFieldTemplateService,
        private gearDocumentTypeService: GearDocumentTypeService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearCustomFieldTemplate }) => {
            this.gearCustomFieldTemplate = gearCustomFieldTemplate;
        });
        this.gearDocumentTypeService.query().subscribe(
            (res: HttpResponse<IGearDocumentType[]>) => {
                this.geardocumenttypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearCustomFieldTemplate.id !== undefined) {
            this.subscribeToSaveResponse(this.gearCustomFieldTemplateService.update(this.gearCustomFieldTemplate));
        } else {
            this.subscribeToSaveResponse(this.gearCustomFieldTemplateService.create(this.gearCustomFieldTemplate));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearCustomFieldTemplate>>) {
        result.subscribe(
            (res: HttpResponse<IGearCustomFieldTemplate>) => this.onSaveSuccess(),
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

    trackGearDocumentTypeById(index: number, item: IGearDocumentType) {
        return item.id;
    }
}
