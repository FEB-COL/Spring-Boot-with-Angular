import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearDiagQuestion } from 'app/shared/model/gear-diag-question.model';

@Component({
    selector: 'jhi-gear-diag-question-detail',
    templateUrl: './gear-diag-question-detail.component.html'
})
export class GearDiagQuestionDetailComponent implements OnInit {
    gearDiagQuestion: IGearDiagQuestion;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearDiagQuestion }) => {
            this.gearDiagQuestion = gearDiagQuestion;
        });
    }

    previousState() {
        window.history.back();
    }
}
