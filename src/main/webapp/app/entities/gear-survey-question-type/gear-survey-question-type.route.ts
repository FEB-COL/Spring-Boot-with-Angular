import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GearSurveyQuestionType } from 'app/shared/model/gear-survey-question-type.model';
import { GearSurveyQuestionTypeService } from './gear-survey-question-type.service';
import { GearSurveyQuestionTypeComponent } from './gear-survey-question-type.component';
import { GearSurveyQuestionTypeDetailComponent } from './gear-survey-question-type-detail.component';
import { GearSurveyQuestionTypeUpdateComponent } from './gear-survey-question-type-update.component';
import { GearSurveyQuestionTypeDeletePopupComponent } from './gear-survey-question-type-delete-dialog.component';
import { IGearSurveyQuestionType } from 'app/shared/model/gear-survey-question-type.model';

@Injectable({ providedIn: 'root' })
export class GearSurveyQuestionTypeResolve implements Resolve<IGearSurveyQuestionType> {
    constructor(private service: GearSurveyQuestionTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GearSurveyQuestionType> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<GearSurveyQuestionType>) => response.ok),
                map((gearSurveyQuestionType: HttpResponse<GearSurveyQuestionType>) => gearSurveyQuestionType.body)
            );
        }
        return of(new GearSurveyQuestionType());
    }
}

export const gearSurveyQuestionTypeRoute: Routes = [
    {
        path: 'gear-survey-question-type',
        component: GearSurveyQuestionTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSurveyQuestionType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-survey-question-type/:id/view',
        component: GearSurveyQuestionTypeDetailComponent,
        resolve: {
            gearSurveyQuestionType: GearSurveyQuestionTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSurveyQuestionType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-survey-question-type/new',
        component: GearSurveyQuestionTypeUpdateComponent,
        resolve: {
            gearSurveyQuestionType: GearSurveyQuestionTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSurveyQuestionType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-survey-question-type/:id/edit',
        component: GearSurveyQuestionTypeUpdateComponent,
        resolve: {
            gearSurveyQuestionType: GearSurveyQuestionTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSurveyQuestionType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gearSurveyQuestionTypePopupRoute: Routes = [
    {
        path: 'gear-survey-question-type/:id/delete',
        component: GearSurveyQuestionTypeDeletePopupComponent,
        resolve: {
            gearSurveyQuestionType: GearSurveyQuestionTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSurveyQuestionType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
