import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearValueChainProcess } from 'app/shared/model/gear-value-chain-process.model';

@Component({
    selector: 'jhi-gear-value-chain-process-detail',
    templateUrl: './gear-value-chain-process-detail.component.html'
})
export class GearValueChainProcessDetailComponent implements OnInit {
    gearValueChainProcess: IGearValueChainProcess;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearValueChainProcess }) => {
            this.gearValueChainProcess = gearValueChainProcess;
        });
    }

    previousState() {
        window.history.back();
    }
}
