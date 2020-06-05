import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GearAmbit } from 'app/shared/model/gear-ambit.model';
import { GearAmbitService } from './gear-ambit.service';
import { GearAmbitComponent } from './gear-ambit.component';
import { GearAmbitDetailComponent } from './gear-ambit-detail.component';
import { GearAmbitUpdateComponent } from './gear-ambit-update.component';
import { GearAmbitDeletePopupComponent } from './gear-ambit-delete-dialog.component';
import { IGearAmbit } from 'app/shared/model/gear-ambit.model';

@Injectable({ providedIn: 'root' })
export class GearAmbitResolve implements Resolve<IGearAmbit> {
    constructor(private service: GearAmbitService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GearAmbit> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<GearAmbit>) => response.ok),
                map((gearAmbit: HttpResponse<GearAmbit>) => gearAmbit.body)
            );
        }
        return of(new GearAmbit());
    }
}

export const gearAmbitRoute: Routes = [
    {
        path: 'gear-ambit',
        component: GearAmbitComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearAmbit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-ambit/:id/view',
        component: GearAmbitDetailComponent,
        resolve: {
            gearAmbit: GearAmbitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearAmbit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-ambit/new',
        component: GearAmbitUpdateComponent,
        resolve: {
            gearAmbit: GearAmbitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearAmbit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-ambit/:id/edit',
        component: GearAmbitUpdateComponent,
        resolve: {
            gearAmbit: GearAmbitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearAmbit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gearAmbitPopupRoute: Routes = [
    {
        path: 'gear-ambit/:id/delete',
        component: GearAmbitDeletePopupComponent,
        resolve: {
            gearAmbit: GearAmbitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearAmbit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
