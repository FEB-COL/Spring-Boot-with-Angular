import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearOrganizationalUnit } from 'app/shared/model/gear-organizational-unit.model';

@Component({
    selector: 'jhi-gear-organizational-unit-detail',
    templateUrl: './gear-organizational-unit-detail.component.html'
})
export class GearOrganizationalUnitDetailComponent implements OnInit {
    gearOrganizationalUnit: IGearOrganizationalUnit;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearOrganizationalUnit }) => {
            this.gearOrganizationalUnit = gearOrganizationalUnit;
        });
    }

    previousState() {
        window.history.back();
    }
}
