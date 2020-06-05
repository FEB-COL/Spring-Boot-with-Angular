import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearValueChainMacroprocess } from 'app/shared/model/gear-value-chain-macroprocess.model';

@Component({
    selector: 'jhi-gear-value-chain-macroprocess-detail',
    templateUrl: './gear-value-chain-macroprocess-detail.component.html'
})
export class GearValueChainMacroprocessDetailComponent implements OnInit {
    gearValueChainMacroprocess: IGearValueChainMacroprocess;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearValueChainMacroprocess }) => {
            this.gearValueChainMacroprocess = gearValueChainMacroprocess;
        });
    }

    previousState() {
        window.history.back();
    }
}
