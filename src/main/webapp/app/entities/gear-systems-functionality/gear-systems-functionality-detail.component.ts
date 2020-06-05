import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearSystemsFunctionality } from 'app/shared/model/gear-systems-functionality.model';
import { IGearInformationSystems } from 'app/shared/model/gear-information-systems.model';

@Component({
    selector: 'jhi-gear-systems-functionality-detail',
    templateUrl: './gear-systems-functionality-detail.component.html'
})
export class GearSystemsFunctionalityDetailComponent implements OnInit {
    gearSystemsFunctionality: IGearSystemsFunctionality;
    gearInformationSystems: IGearInformationSystems;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearSystemsFunctionality }) => {
            this.gearSystemsFunctionality = gearSystemsFunctionality;
        });

        console.log('PRUEBA DE NOMBRE', this.gearSystemsFunctionality.gearInformationSystemName);

        /*
        this.activatedRoute.data.subscribe(({ gearInformationSystems }) => {
            this.gearInformationSystems = gearInformationSystems;
        });
        console.log("Log1 variable NAME",this.gearInformationSystems);  // console se usa this para referenciar.
*/
    }

    previousState() {
        window.history.back();
    }
}
