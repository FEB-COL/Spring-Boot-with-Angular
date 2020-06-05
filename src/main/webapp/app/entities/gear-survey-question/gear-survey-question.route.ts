import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GearSurveyQuestion } from 'app/shared/model/gear-survey-question.model';
import { GearSurveyQuestionService } from './gear-survey-question.service';
import { GearSurveyQuestionComponent } from './gear-survey-question.component';
import { GearSurveyQuestionDetailComponent } from './gear-survey-question-detail.component';
import { GearSurveyQuestionUpdateComponent } from './gear-survey-question-update.component';
import { GearSurveyQuestionDeletePopupComponent } from './gear-survey-question-delete-dialog.component';
import { IGearSurveyQuestion } from 'app/shared/model/gear-survey-question.model';

@Injectable({ providedIn: 'root' })
export class GearSurveyQuestionResolve implements Resolve<IGearSurveyQuestion> {
    constructor(private service: GearSurveyQuestionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GearSurveyQuestion> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<GearSurveyQuestion>) => response.ok),
                map((gearSurveyQuestion: HttpResponse<GearSurveyQuestion>) => gearSurveyQuestion.body)
            );
        }
        return of(new GearSurveyQuestion());
    }
}

export const gearSurveyQuestionRoute: Routes = [
    {
        path: 'gear-survey-question',
        component: GearSurveyQuestionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSurveyQuestion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-survey-question/:id/view',
        component: GearSurveyQuestionDetailComponent,
        resolve: {
            gearSurveyQuestion: GearSurveyQuestionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSurveyQuestion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-survey-question/new',
        component: GearSurveyQuestionUpdateComponent,
        resolve: {
            gearSurveyQuestion: GearSurveyQuestionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSurveyQuestion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-survey-question/:id/edit',
        component: GearSurveyQuestionUpdateComponent,
        resolve: {
            gearSurveyQuestion: GearSurveyQuestionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSurveyQuestion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gearSurveyQuestionPopupRoute: Routes = [
    {
        path: 'gear-survey-question/:id/delete',
        component: GearSurveyQuestionDeletePopupComponent,
        resolve: {
            gearSurveyQuestion: GearSurveyQuestionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSurveyQuestion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
