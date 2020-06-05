import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AlfrescoSite } from 'app/shared/model/alfresco-site.model';
import { AlfrescoSiteService } from './alfresco-site.service';
import { AlfrescoSiteComponent } from './alfresco-site.component';
import { AlfrescoSiteDetailComponent } from './alfresco-site-detail.component';
import { AlfrescoSiteUpdateComponent } from './alfresco-site-update.component';
import { AlfrescoSiteDeletePopupComponent } from './alfresco-site-delete-dialog.component';
import { IAlfrescoSite } from 'app/shared/model/alfresco-site.model';

@Injectable({ providedIn: 'root' })
export class AlfrescoSiteResolve implements Resolve<IAlfrescoSite> {
    constructor(private service: AlfrescoSiteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AlfrescoSite> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AlfrescoSite>) => response.ok),
                map((alfrescoSite: HttpResponse<AlfrescoSite>) => alfrescoSite.body)
            );
        }
        return of(new AlfrescoSite());
    }
}

export const alfrescoSiteRoute: Routes = [
    {
        path: 'alfresco-site',
        component: AlfrescoSiteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.alfrescoSite.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'alfresco-site/:id/view',
        component: AlfrescoSiteDetailComponent,
        resolve: {
            alfrescoSite: AlfrescoSiteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.alfrescoSite.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'alfresco-site/new',
        component: AlfrescoSiteUpdateComponent,
        resolve: {
            alfrescoSite: AlfrescoSiteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.alfrescoSite.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'alfresco-site/:id/edit',
        component: AlfrescoSiteUpdateComponent,
        resolve: {
            alfrescoSite: AlfrescoSiteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.alfrescoSite.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const alfrescoSitePopupRoute: Routes = [
    {
        path: 'alfresco-site/:id/delete',
        component: AlfrescoSiteDeletePopupComponent,
        resolve: {
            alfrescoSite: AlfrescoSiteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.alfrescoSite.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
