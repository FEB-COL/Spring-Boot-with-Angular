import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearFiles } from 'app/shared/model/gear-files.model';

@Component({
    selector: 'jhi-gear-files-detail',
    templateUrl: './gear-files-detail.component.html'
})
export class GearFilesDetailComponent implements OnInit {
    gearFiles: IGearFiles;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearFiles }) => {
            this.gearFiles = gearFiles;
        });
    }

    previousState() {
        window.history.back();
    }
}
