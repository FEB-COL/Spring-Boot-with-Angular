import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGearWiki } from 'app/shared/model/gear-wiki.model';

@Component({
    selector: 'jhi-gear-wiki-detail',
    templateUrl: './gear-wiki-detail.component.html'
})
export class GearWikiDetailComponent implements OnInit {
    gearWiki: IGearWiki;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gearWiki }) => {
            this.gearWiki = gearWiki;
        });
    }

    previousState() {
        window.history.back();
    }
}
