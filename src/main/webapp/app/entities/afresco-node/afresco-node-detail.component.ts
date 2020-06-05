import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAfrescoNode } from 'app/shared/model/afresco-node.model';

@Component({
    selector: 'jhi-afresco-node-detail',
    templateUrl: './afresco-node-detail.component.html'
})
export class AfrescoNodeDetailComponent implements OnInit {
    afrescoNode: IAfrescoNode;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ afrescoNode }) => {
            this.afrescoNode = afrescoNode;
        });
    }

    previousState() {
        window.history.back();
    }
}
