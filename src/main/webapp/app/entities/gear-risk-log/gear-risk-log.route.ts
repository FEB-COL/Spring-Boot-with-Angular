import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GearRiskLog } from 'app/shared/model/gear-risk-log.model';
import { GearRiskLogService } from './gear-risk-log.service';
import { GearRiskLogComponent } from './gear-risk-log.component';
import { GearRiskLogDetailComponent } from './gear-risk-log-detail.component';
import { GearRiskLogUpdateComponent } from './gear-risk-log-update.component';
import { GearRiskLogDeletePopupComponent } from './gear-risk-log-delete-dialog.component';
import { IGearRiskLog } from 'app/shared/model/gear-risk-log.model';

@Injectable({ providedIn: 'root' })
export class GearRiskLogResolve implements Resolve<IGearRiskLog> {
    constructor(private service: GearRiskLogService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GearRiskLog> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<GearRiskLog>) => response.ok),
                map((gearRiskLog: HttpResponse<GearRiskLog>) => gearRiskLog.body)
            );
        }
        return of(new GearRiskLog());
    }
}

export const gearRiskLogRoute: Routes = [
    {
        path: 'gear-risk-log',
        component: GearRiskLogComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearRiskLog.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-risk-log/:id/view',
        component: GearRiskLogDetailComponent,
        resolve: {
            gearRiskLog: GearRiskLogResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearRiskLog.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-risk-log/new',
        component: GearRiskLogUpdateComponent,
        resolve: {
            gearRiskLog: GearRiskLogResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearRiskLog.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-risk-log/:id/edit',
        component: GearRiskLogUpdateComponent,
        resolve: {
            gearRiskLog: GearRiskLogResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearRiskLog.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gearRiskLogPopupRoute: Routes = [
    {
        path: 'gear-risk-log/:id/delete',
        component: GearRiskLogDeletePopupComponent,
        resolve: {
            gearRiskLog: GearRiskLogResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearRiskLog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
