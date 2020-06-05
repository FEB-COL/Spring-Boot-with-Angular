import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearSurvey } from 'app/shared/model/gear-survey.model';

@Component({
    selector: 'jhi-gear-survey-detail',
    templateUrl: './gear-survey-detail.component.html'
})
export class GearSurveyDetailComponent implements OnInit {
    gearSurvey: IGearSurvey;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearSurvey }) => {
            this.gearSurvey = gearSurvey;
        });
    }

    previousState() {
        window.history.back();
    }
}
