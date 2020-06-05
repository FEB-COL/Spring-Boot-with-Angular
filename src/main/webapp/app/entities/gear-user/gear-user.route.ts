import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GearUser } from 'app/shared/model/gear-user.model';
import { GearUserService } from './gear-user.service';
import { GearUserComponent } from './gear-user.component';
import { GearUserDetailComponent } from './gear-user-detail.component';
import { GearUserUpdateComponent } from './gear-user-update.component';
import { GearUserDeletePopupComponent } from './gear-user-delete-dialog.component';
import { IGearUser } from 'app/shared/model/gear-user.model';

@Injectable({ providedIn: 'root' })
export class GearUserResolve implements Resolve<IGearUser> {
    constructor(private service: GearUserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GearUser> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<GearUser>) => response.ok),
                map((gearUser: HttpResponse<GearUser>) => gearUser.body)
            );
        }
        return of(new GearUser());
    }
}

export const gearUserRoute: Routes = [
    {
        path: 'gear-user',
        component: GearUserComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-user/:id/view',
        component: GearUserDetailComponent,
        resolve: {
            gearUser: GearUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-user/new',
        component: GearUserUpdateComponent,
        resolve: {
            gearUser: GearUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-user/:id/edit',
        component: GearUserUpdateComponent,
        resolve: {
            gearUser: GearUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gearUserPopupRoute: Routes = [
    {
        path: 'gear-user/:id/delete',
        component: GearUserDeletePopupComponent,
        resolve: {
            gearUser: GearUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
