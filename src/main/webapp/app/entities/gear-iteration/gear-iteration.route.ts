import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GearIteration } from 'app/shared/model/gear-iteration.model';
import { GearIterationService } from './gear-iteration.service';
import { GearIterationComponent } from './gear-iteration.component';
import { GearIterationDetailComponent } from './gear-iteration-detail.component';
import { GearIterationUpdateComponent } from './gear-iteration-update.component';
import { GearIterationDeletePopupComponent } from './gear-iteration-delete-dialog.component';
import { IGearIteration } from 'app/shared/model/gear-iteration.model';

@Injectable({ providedIn: 'root' })
export class GearIterationResolve implements Resolve<IGearIteration> {
    constructor(private service: GearIterationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GearIteration> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<GearIteration>) => response.ok),
                map((gearIteration: HttpResponse<GearIteration>) => gearIteration.body)
            );
        }
        return of(new GearIteration());
    }
}

export const gearIterationRoute: Routes = [
    {
        path: 'gear-iteration',
        component: GearIterationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearIteration.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-iteration/:id/view',
        component: GearIterationDetailComponent,
        resolve: {
            gearIteration: GearIterationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearIteration.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-iteration/new',
        component: GearIterationUpdateComponent,
        resolve: {
            gearIteration: GearIterationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearIteration.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-iteration/:id/edit',
        component: GearIterationUpdateComponent,
        resolve: {
            gearIteration: GearIterationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearIteration.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gearIterationPopupRoute: Routes = [
    {
        path: 'gear-iteration/:id/delete',
        component: GearIterationDeletePopupComponent,
        resolve: {
            gearIteration: GearIterationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearIteration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
