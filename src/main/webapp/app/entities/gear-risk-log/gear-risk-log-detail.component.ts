import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearRiskLog } from 'app/shared/model/gear-risk-log.model';

@Component({
    selector: 'jhi-gear-risk-log-detail',
    templateUrl: './gear-risk-log-detail.component.html'
})
export class GearRiskLogDetailComponent implements OnInit {
    gearRiskLog: IGearRiskLog;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearRiskLog }) => {
            this.gearRiskLog = gearRiskLog;
        });
    }

    previousState() {
        window.history.back();
    }
}
