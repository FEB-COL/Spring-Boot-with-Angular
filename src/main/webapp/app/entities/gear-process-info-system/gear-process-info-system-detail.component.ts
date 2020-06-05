import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearProcessInfoSystem } from 'app/shared/model/gear-process-info-system.model';

@Component({
    selector: 'jhi-gear-process-info-system-detail',
    templateUrl: './gear-process-info-system-detail.component.html'
})
export class GearProcessInfoSystemDetailComponent implements OnInit {
    gearProcessInfoSystem: IGearProcessInfoSystem;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearProcessInfoSystem }) => {
            this.gearProcessInfoSystem = gearProcessInfoSystem;
        });
    }

    previousState() {
        window.history.back();
    }
}
