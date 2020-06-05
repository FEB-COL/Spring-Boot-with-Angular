import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GearSurveySolve } from 'app/shared/model/gear-survey-solve.model';
import { GearSurveySolveService } from './gear-survey-solve.service';
import { GearSurveySolveComponent } from './gear-survey-solve.component';
import { GearSurveySolveDetailComponent } from './gear-survey-solve-detail.component';
import { GearSurveySolveUpdateComponent } from './gear-survey-solve-update.component';
import { GearSurveySolveDeletePopupComponent } from './gear-survey-solve-delete-dialog.component';
import { IGearSurveySolve } from 'app/shared/model/gear-survey-solve.model';

@Injectable({ providedIn: 'root' })
export class GearSurveySolveResolve implements Resolve<IGearSurveySolve> {
    constructor(private service: GearSurveySolveService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GearSurveySolve> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<GearSurveySolve>) => response.ok),
                map((gearSurveySolve: HttpResponse<GearSurveySolve>) => gearSurveySolve.body)
            );
        }
        return of(new GearSurveySolve());
    }
}

export const gearSurveySolveRoute: Routes = [
    {
        path: 'gear-survey-solve',
        component: GearSurveySolveComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSurveySolve.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-survey-solve/:id/view',
        component: GearSurveySolveDetailComponent,
        resolve: {
            gearSurveySolve: GearSurveySolveResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSurveySolve.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-survey-solve/new',
        component: GearSurveySolveUpdateComponent,
        resolve: {
            gearSurveySolve: GearSurveySolveResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSurveySolve.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-survey-solve/:id/edit',
        component: GearSurveySolveUpdateComponent,
        resolve: {
            gearSurveySolve: GearSurveySolveResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSurveySolve.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gearSurveySolvePopupRoute: Routes = [
    {
        path: 'gear-survey-solve/:id/delete',
        component: GearSurveySolveDeletePopupComponent,
        resolve: {
            gearSurveySolve: GearSurveySolveResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSurveySolve.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
