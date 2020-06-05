import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AfrescoNode } from 'app/shared/model/afresco-node.model';
import { AfrescoNodeService } from './afresco-node.service';
import { AfrescoNodeComponent } from './afresco-node.component';
import { AfrescoNodeDetailComponent } from './afresco-node-detail.component';
import { AfrescoNodeUpdateComponent } from './afresco-node-update.component';
import { AfrescoNodeDeletePopupComponent } from './afresco-node-delete-dialog.component';
import { IAfrescoNode } from 'app/shared/model/afresco-node.model';

@Injectable({ providedIn: 'root' })
export class AfrescoNodeResolve implements Resolve<IAfrescoNode> {
    constructor(private service: AfrescoNodeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AfrescoNode> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AfrescoNode>) => response.ok),
                map((afrescoNode: HttpResponse<AfrescoNode>) => afrescoNode.body)
            );
        }
        return of(new AfrescoNode());
    }
}

export const afrescoNodeRoute: Routes = [
    {
        path: 'afresco-node',
        component: AfrescoNodeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.afrescoNode.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'afresco-node/:id/view',
        component: AfrescoNodeDetailComponent,
        resolve: {
            afrescoNode: AfrescoNodeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.afrescoNode.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'afresco-node/new',
        component: AfrescoNodeUpdateComponent,
        resolve: {
            afrescoNode: AfrescoNodeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.afrescoNode.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'afresco-node/:id/edit',
        component: AfrescoNodeUpdateComponent,
        resolve: {
            afrescoNode: AfrescoNodeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.afrescoNode.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const afrescoNodePopupRoute: Routes = [
    {
        path: 'afresco-node/:id/delete',
        component: AfrescoNodeDeletePopupComponent,
        resolve: {
            afrescoNode: AfrescoNodeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.afrescoNode.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
