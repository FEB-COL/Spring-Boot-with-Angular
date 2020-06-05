import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GearProcessInfoSystem } from 'app/shared/model/gear-process-info-system.model';
import { GearProcessInfoSystemService } from './gear-process-info-system.service';
import { GearProcessInfoSystemComponent } from './gear-process-info-system.component';
import { GearProcessInfoSystemDetailComponent } from './gear-process-info-system-detail.component';
import { GearProcessInfoSystemUpdateComponent } from './gear-process-info-system-update.component';
import { GearProcessInfoSystemDeletePopupComponent } from './gear-process-info-system-delete-dialog.component';
import { IGearProcessInfoSystem } from 'app/shared/model/gear-process-info-system.model';

@Injectable({ providedIn: 'root' })
export class GearProcessInfoSystemResolve implements Resolve<IGearProcessInfoSystem> {
    constructor(private service: GearProcessInfoSystemService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GearProcessInfoSystem> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<GearProcessInfoSystem>) => response.ok),
                map((gearProcessInfoSystem: HttpResponse<GearProcessInfoSystem>) => gearProcessInfoSystem.body)
            );
        }
        return of(new GearProcessInfoSystem());
    }
}

export const gearProcessInfoSystemRoute: Routes = [
    {
        path: 'gear-process-info-system',
        component: GearProcessInfoSystemComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearProcessInfoSystem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-process-info-system/:id/view',
        component: GearProcessInfoSystemDetailComponent,
        resolve: {
            gearProcessInfoSystem: GearProcessInfoSystemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearProcessInfoSystem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-process-info-system/new',
        component: GearProcessInfoSystemUpdateComponent,
        resolve: {
            gearProcessInfoSystem: GearProcessInfoSystemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearProcessInfoSystem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-process-info-system/:id/edit',
        component: GearProcessInfoSystemUpdateComponent,
        resolve: {
            gearProcessInfoSystem: GearProcessInfoSystemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearProcessInfoSystem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gearProcessInfoSystemPopupRoute: Routes = [
    {
        path: 'gear-process-info-system/:id/delete',
        component: GearProcessInfoSystemDeletePopupComponent,
        resolve: {
            gearProcessInfoSystem: GearProcessInfoSystemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearProcessInfoSystem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
