import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearSurveyAnswer } from 'app/shared/model/gear-survey-answer.model';

@Component({
    selector: 'jhi-gear-survey-answer-detail',
    templateUrl: './gear-survey-answer-detail.component.html'
})
export class GearSurveyAnswerDetailComponent implements OnInit {
    gearSurveyAnswer: IGearSurveyAnswer;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearSurveyAnswer }) => {
            this.gearSurveyAnswer = gearSurveyAnswer;
        });
    }

    previousState() {
        window.history.back();
    }
}
