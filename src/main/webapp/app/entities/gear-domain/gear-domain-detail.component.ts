import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearDomain } from 'app/shared/model/gear-domain.model';

@Component({
    selector: 'jhi-gear-domain-detail',
    templateUrl: './gear-domain-detail.component.html'
})
export class GearDomainDetailComponent implements OnInit {
    gearDomain: IGearDomain;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearDomain }) => {
            this.gearDomain = gearDomain;
        });
    }

    previousState() {
        window.history.back();
    }
}
