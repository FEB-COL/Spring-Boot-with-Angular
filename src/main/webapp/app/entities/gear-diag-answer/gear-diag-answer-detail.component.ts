import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearDiagAnswer } from 'app/shared/model/gear-diag-answer.model';

@Component({
    selector: 'jhi-gear-diag-answer-detail',
    templateUrl: './gear-diag-answer-detail.component.html'
})
export class GearDiagAnswerDetailComponent implements OnInit {
    gearDiagAnswer: IGearDiagAnswer;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearDiagAnswer }) => {
            this.gearDiagAnswer = gearDiagAnswer;
        });
    }

    previousState() {
        window.history.back();
    }
}
