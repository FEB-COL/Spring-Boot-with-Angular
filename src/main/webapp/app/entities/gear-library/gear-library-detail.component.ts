import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearLibrary } from 'app/shared/model/gear-library.model';

@Component({
    selector: 'jhi-gear-library-detail',
    templateUrl: './gear-library-detail.component.html'
})
export class GearLibraryDetailComponent implements OnInit {
    gearLibrary: IGearLibrary;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearLibrary }) => {
            this.gearLibrary = gearLibrary;
        });
    }

    previousState() {
        window.history.back();
    }
}
