import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GearDiagAnswer } from 'app/shared/model/gear-diag-answer.model';
import { GearDiagAnswerService } from './gear-diag-answer.service';
import { GearDiagAnswerComponent } from './gear-diag-answer.component';
import { GearDiagAnswerDetailComponent } from './gear-diag-answer-detail.component';
import { GearDiagAnswerUpdateComponent } from './gear-diag-answer-update.component';
import { GearDiagAnswerDeletePopupComponent } from './gear-diag-answer-delete-dialog.component';
import { IGearDiagAnswer } from 'app/shared/model/gear-diag-answer.model';

@Injectable({ providedIn: 'root' })
export class GearDiagAnswerResolve implements Resolve<IGearDiagAnswer> {
    constructor(private service: GearDiagAnswerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GearDiagAnswer> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<GearDiagAnswer>) => response.ok),
                map((gearDiagAnswer: HttpResponse<GearDiagAnswer>) => gearDiagAnswer.body)
            );
        }
        return of(new GearDiagAnswer());
    }
}

export const gearDiagAnswerRoute: Routes = [
    {
        path: 'gear-diag-answer',
        component: GearDiagAnswerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearDiagAnswer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-diag-answer/:id/view',
        component: GearDiagAnswerDetailComponent,
        resolve: {
            gearDiagAnswer: GearDiagAnswerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearDiagAnswer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-diag-answer/new',
        component: GearDiagAnswerUpdateComponent,
        resolve: {
            gearDiagAnswer: GearDiagAnswerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearDiagAnswer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-diag-answer/:id/edit',
        component: GearDiagAnswerUpdateComponent,
        resolve: {
            gearDiagAnswer: GearDiagAnswerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearDiagAnswer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gearDiagAnswerPopupRoute: Routes = [
    {
        path: 'gear-diag-answer/:id/delete',
        component: GearDiagAnswerDeletePopupComponent,
        resolve: {
            gearDiagAnswer: GearDiagAnswerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearDiagAnswer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
