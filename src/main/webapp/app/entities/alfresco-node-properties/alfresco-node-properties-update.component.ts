import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAlfrescoNodeProperties } from 'app/shared/model/alfresco-node-properties.model';
import { AlfrescoNodePropertiesService } from './alfresco-node-properties.service';
import { IAfrescoNode } from 'app/shared/model/afresco-node.model';
import { AfrescoNodeService } from 'app/entities/afresco-node';

@Component({
    selector: 'jhi-alfresco-node-properties-update',
    templateUrl: './alfresco-node-properties-update.component.html'
})
export class AlfrescoNodePropertiesUpdateComponent implements OnInit {
    alfrescoNodeProperties: IAlfrescoNodeProperties;
    isSaving: boolean;

    afresconodes: IAfrescoNode[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private alfrescoNodePropertiesService: AlfrescoNodePropertiesService,
        private afrescoNodeService: AfrescoNodeService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ alfrescoNodeProperties }) => {
            this.alfrescoNodeProperties = alfrescoNodeProperties;
        });
        this.afrescoNodeService.query().subscribe(
            (res: HttpResponse<IAfrescoNode[]>) => {
                this.afresconodes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.alfrescoNodeProperties.id !== undefined) {
            this.subscribeToSaveResponse(this.alfrescoNodePropertiesService.update(this.alfrescoNodeProperties));
        } else {
            this.subscribeToSaveResponse(this.alfrescoNodePropertiesService.create(this.alfrescoNodeProperties));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAlfrescoNodeProperties>>) {
        result.subscribe(
            (res: HttpResponse<IAlfrescoNodeProperties>) => this.onSaveSuccess(),
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

    trackAfrescoNodeById(index: number, item: IAfrescoNode) {
        return item.id;
    }
}
