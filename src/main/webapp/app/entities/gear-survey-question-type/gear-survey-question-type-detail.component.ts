import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearSurveyQuestionType } from 'app/shared/model/gear-survey-question-type.model';

@Component({
    selector: 'jhi-gear-survey-question-type-detail',
    templateUrl: './gear-survey-question-type-detail.component.html'
})
export class GearSurveyQuestionTypeDetailComponent implements OnInit {
    gearSurveyQuestionType: IGearSurveyQuestionType;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearSurveyQuestionType }) => {
            this.gearSurveyQuestionType = gearSurveyQuestionType;
        });
    }

    previousState() {
        window.history.back();
    }
}
