import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearProject } from 'app/shared/model/gear-project.model';

@Component({
    selector: 'jhi-gear-project-detail',
    templateUrl: './gear-project-detail.component.html'
})
export class GearProjectDetailComponent implements OnInit {
    gearProject: IGearProject;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearProject }) => {
            this.gearProject = gearProject;
        });
    }

    previousState() {
        window.history.back();
    }
}
