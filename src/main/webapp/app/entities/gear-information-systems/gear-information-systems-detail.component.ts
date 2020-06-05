import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearInformationSystems } from 'app/shared/model/gear-information-systems.model';

@Component({
    selector: 'jhi-gear-information-systems-detail',
    templateUrl: './gear-information-systems-detail.component.html'
})
export class GearInformationSystemsDetailComponent implements OnInit {
    gearInformationSystems: IGearInformationSystems;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearInformationSystems }) => {
            this.gearInformationSystems = gearInformationSystems;
        });
    }

    previousState() {
        window.history.back();
    }
}
