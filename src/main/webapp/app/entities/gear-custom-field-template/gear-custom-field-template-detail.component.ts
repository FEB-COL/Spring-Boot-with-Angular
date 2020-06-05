import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearCustomFieldTemplate } from 'app/shared/model/gear-custom-field-template.model';

@Component({
    selector: 'jhi-gear-custom-field-template-detail',
    templateUrl: './gear-custom-field-template-detail.component.html'
})
export class GearCustomFieldTemplateDetailComponent implements OnInit {
    gearCustomFieldTemplate: IGearCustomFieldTemplate;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearCustomFieldTemplate }) => {
            this.gearCustomFieldTemplate = gearCustomFieldTemplate;
        });
    }

    previousState() {
        window.history.back();
    }
}
