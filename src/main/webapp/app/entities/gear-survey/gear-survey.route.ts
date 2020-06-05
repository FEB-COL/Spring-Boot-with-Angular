import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GearSurvey } from 'app/shared/model/gear-survey.model';
import { GearSurveyService } from './gear-survey.service';
import { GearSurveyComponent } from './gear-survey.component';
import { GearSurveyDetailComponent } from './gear-survey-detail.component';
import { GearSurveyUpdateComponent } from './gear-survey-update.component';
import { GearSurveyDeletePopupComponent } from './gear-survey-delete-dialog.component';
import { IGearSurvey } from 'app/shared/model/gear-survey.model';

@Injectable({ providedIn: 'root' })
export class GearSurveyResolve implements Resolve<IGearSurvey> {
    constructor(private service: GearSurveyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GearSurvey> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<GearSurvey>) => response.ok),
                map((gearSurvey: HttpResponse<GearSurvey>) => gearSurvey.body)
            );
        }
        return of(new GearSurvey());
    }
}

export const gearSurveyRoute: Routes = [
    {
        path: 'gear-survey',
        component: GearSurveyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSurvey.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-survey/:id/view',
        component: GearSurveyDetailComponent,
        resolve: {
            gearSurvey: GearSurveyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSurvey.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-survey/new',
        component: GearSurveyUpdateComponent,
        resolve: {
            gearSurvey: GearSurveyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSurvey.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-survey/:id/edit',
        component: GearSurveyUpdateComponent,
        resolve: {
            gearSurvey: GearSurveyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSurvey.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gearSurveyPopupRoute: Routes = [
    {
        path: 'gear-survey/:id/delete',
        component: GearSurveyDeletePopupComponent,
        resolve: {
            gearSurvey: GearSurveyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSurvey.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
