import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGearLibrary } from 'app/shared/model/gear-library.model';
import { GearLibraryService } from './gear-library.service';

@Component({
    selector: 'jhi-gear-library-update',
    templateUrl: './gear-library-update.component.html'
})
export class GearLibraryUpdateComponent implements OnInit {
    gearLibrary: IGearLibrary;
    isSaving: boolean;

    constructor(private gearLibraryService: GearLibraryService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearLibrary }) => {
            this.gearLibrary = gearLibrary;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gearLibrary.id !== undefined) {
            this.subscribeToSaveResponse(this.gearLibraryService.update(this.gearLibrary));
        } else {
            this.subscribeToSaveResponse(this.gearLibraryService.create(this.gearLibrary));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearLibrary>>) {
        result.subscribe((res: HttpResponse<IGearLibrary>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
