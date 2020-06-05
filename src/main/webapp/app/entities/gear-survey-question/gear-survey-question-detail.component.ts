import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearSurveyQuestion } from 'app/shared/model/gear-survey-question.model';

@Component({
    selector: 'jhi-gear-survey-question-detail',
    templateUrl: './gear-survey-question-detail.component.html'
})
export class GearSurveyQuestionDetailComponent implements OnInit {
    gearSurveyQuestion: IGearSurveyQuestion;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearSurveyQuestion }) => {
            this.gearSurveyQuestion = gearSurveyQuestion;
        });
    }

    previousState() {
        window.history.back();
    }
}
