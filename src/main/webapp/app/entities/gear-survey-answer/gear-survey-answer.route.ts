import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GearSurveyAnswer } from 'app/shared/model/gear-survey-answer.model';
import { GearSurveyAnswerService } from './gear-survey-answer.service';
import { GearSurveyAnswerComponent } from './gear-survey-answer.component';
import { GearSurveyAnswerDetailComponent } from './gear-survey-answer-detail.component';
import { GearSurveyAnswerUpdateComponent } from './gear-survey-answer-update.component';
import { GearSurveyAnswerDeletePopupComponent } from './gear-survey-answer-delete-dialog.component';
import { IGearSurveyAnswer } from 'app/shared/model/gear-survey-answer.model';

@Injectable({ providedIn: 'root' })
export class GearSurveyAnswerResolve implements Resolve<IGearSurveyAnswer> {
    constructor(private service: GearSurveyAnswerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GearSurveyAnswer> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<GearSurveyAnswer>) => response.ok),
                map((gearSurveyAnswer: HttpResponse<GearSurveyAnswer>) => gearSurveyAnswer.body)
            );
        }
        return of(new GearSurveyAnswer());
    }
}

export const gearSurveyAnswerRoute: Routes = [
    {
        path: 'gear-survey-answer',
        component: GearSurveyAnswerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSurveyAnswer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-survey-answer/:id/view',
        component: GearSurveyAnswerDetailComponent,
        resolve: {
            gearSurveyAnswer: GearSurveyAnswerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSurveyAnswer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-survey-answer/new',
        component: GearSurveyAnswerUpdateComponent,
        resolve: {
            gearSurveyAnswer: GearSurveyAnswerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSurveyAnswer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-survey-answer/:id/edit',
        component: GearSurveyAnswerUpdateComponent,
        resolve: {
            gearSurveyAnswer: GearSurveyAnswerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSurveyAnswer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gearSurveyAnswerPopupRoute: Routes = [
    {
        path: 'gear-survey-answer/:id/delete',
        component: GearSurveyAnswerDeletePopupComponent,
        resolve: {
            gearSurveyAnswer: GearSurveyAnswerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSurveyAnswer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
