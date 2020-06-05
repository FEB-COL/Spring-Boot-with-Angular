import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAlfrescoNodeProperties } from 'app/shared/model/alfresco-node-properties.model';

@Component({
    selector: 'jhi-alfresco-node-properties-detail',
    templateUrl: './alfresco-node-properties-detail.component.html'
})
export class AlfrescoNodePropertiesDetailComponent implements OnInit {
    alfrescoNodeProperties: IAlfrescoNodeProperties;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ alfrescoNodeProperties }) => {
            this.alfrescoNodeProperties = alfrescoNodeProperties;
        });
    }

    previousState() {
        window.history.back();
    }
}
