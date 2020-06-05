import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearUser } from 'app/shared/model/gear-user.model';

@Component({
    selector: 'jhi-gear-user-detail',
    templateUrl: './gear-user-detail.component.html'
})
export class GearUserDetailComponent implements OnInit {
    gearUser: IGearUser;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearUser }) => {
            this.gearUser = gearUser;
        });
    }

    previousState() {
        window.history.back();
    }
}
