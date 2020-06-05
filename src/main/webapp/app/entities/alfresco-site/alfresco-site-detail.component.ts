import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAlfrescoSite } from 'app/shared/model/alfresco-site.model';

@Component({
    selector: 'jhi-alfresco-site-detail',
    templateUrl: './alfresco-site-detail.component.html'
})
export class AlfrescoSiteDetailComponent implements OnInit {
    alfrescoSite: IAlfrescoSite;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ alfrescoSite }) => {
            this.alfrescoSite = alfrescoSite;
        });
    }

    previousState() {
        window.history.back();
    }
}
