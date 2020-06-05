import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AlfrescoNodeProperties } from 'app/shared/model/alfresco-node-properties.model';
import { AlfrescoNodePropertiesService } from './alfresco-node-properties.service';
import { AlfrescoNodePropertiesComponent } from './alfresco-node-properties.component';
import { AlfrescoNodePropertiesDetailComponent } from './alfresco-node-properties-detail.component';
import { AlfrescoNodePropertiesUpdateComponent } from './alfresco-node-properties-update.component';
import { AlfrescoNodePropertiesDeletePopupComponent } from './alfresco-node-properties-delete-dialog.component';
import { IAlfrescoNodeProperties } from 'app/shared/model/alfresco-node-properties.model';

@Injectable({ providedIn: 'root' })
export class AlfrescoNodePropertiesResolve implements Resolve<IAlfrescoNodeProperties> {
    constructor(private service: AlfrescoNodePropertiesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AlfrescoNodeProperties> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AlfrescoNodeProperties>) => response.ok),
                map((alfrescoNodeProperties: HttpResponse<AlfrescoNodeProperties>) => alfrescoNodeProperties.body)
            );
        }
        return of(new AlfrescoNodeProperties());
    }
}

export const alfrescoNodePropertiesRoute: Routes = [
    {
        path: 'alfresco-node-properties',
        component: AlfrescoNodePropertiesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.alfrescoNodeProperties.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'alfresco-node-properties/:id/view',
        component: AlfrescoNodePropertiesDetailComponent,
        resolve: {
            alfrescoNodeProperties: AlfrescoNodePropertiesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.alfrescoNodeProperties.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'alfresco-node-properties/new',
        component: AlfrescoNodePropertiesUpdateComponent,
        resolve: {
            alfrescoNodeProperties: AlfrescoNodePropertiesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.alfrescoNodeProperties.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'alfresco-node-properties/:id/edit',
        component: AlfrescoNodePropertiesUpdateComponent,
        resolve: {
            alfrescoNodeProperties: AlfrescoNodePropertiesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.alfrescoNodeProperties.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const alfrescoNodePropertiesPopupRoute: Routes = [
    {
        path: 'alfresco-node-properties/:id/delete',
        component: AlfrescoNodePropertiesDeletePopupComponent,
        resolve: {
            alfrescoNodeProperties: AlfrescoNodePropertiesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.alfrescoNodeProperties.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
