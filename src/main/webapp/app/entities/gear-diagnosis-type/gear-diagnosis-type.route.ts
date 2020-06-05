import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GearDiagnosisType } from 'app/shared/model/gear-diagnosis-type.model';
import { GearDiagnosisTypeService } from './gear-diagnosis-type.service';
import { GearDiagnosisTypeComponent } from './gear-diagnosis-type.component';
import { GearDiagnosisTypeDetailComponent } from './gear-diagnosis-type-detail.component';
import { GearDiagnosisTypeUpdateComponent } from './gear-diagnosis-type-update.component';
import { GearDiagnosisTypeDeletePopupComponent } from './gear-diagnosis-type-delete-dialog.component';
import { IGearDiagnosisType } from 'app/shared/model/gear-diagnosis-type.model';

@Injectable({ providedIn: 'root' })
export class GearDiagnosisTypeResolve implements Resolve<IGearDiagnosisType> {
    constructor(private service: GearDiagnosisTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GearDiagnosisType> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<GearDiagnosisType>) => response.ok),
                map((gearDiagnosisType: HttpResponse<GearDiagnosisType>) => gearDiagnosisType.body)
            );
        }
        return of(new GearDiagnosisType());
    }
}

export const gearDiagnosisTypeRoute: Routes = [
    {
        path: 'gear-diagnosis-type',
        component: GearDiagnosisTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearDiagnosisType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-diagnosis-type/:id/view',
        component: GearDiagnosisTypeDetailComponent,
        resolve: {
            gearDiagnosisType: GearDiagnosisTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearDiagnosisType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-diagnosis-type/new',
        component: GearDiagnosisTypeUpdateComponent,
        resolve: {
            gearDiagnosisType: GearDiagnosisTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearDiagnosisType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-diagnosis-type/:id/edit',
        component: GearDiagnosisTypeUpdateComponent,
        resolve: {
            gearDiagnosisType: GearDiagnosisTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearDiagnosisType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gearDiagnosisTypePopupRoute: Routes = [
    {
        path: 'gear-diagnosis-type/:id/delete',
        component: GearDiagnosisTypeDeletePopupComponent,
        resolve: {
            gearDiagnosisType: GearDiagnosisTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearDiagnosisType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
