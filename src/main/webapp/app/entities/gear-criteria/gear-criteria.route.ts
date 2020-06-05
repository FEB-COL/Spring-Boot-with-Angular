// import { Injectable } from '@angular/core';
// import { HttpResponse } from '@angular/common/http';
// import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
// import { UserRouteAccessService } from 'app/core';
// import { Observable, of } from 'rxjs';
// import { filter, map } from 'rxjs/operators';
// import { GearCriteria } from 'app/shared/model/gear-criteria.model';
// import { GearCriteriaService } from './gear-criteria.service';
// import { GearCriteriaComponent } from './gear-criteria.component';
// import { GearCriteriaDetailComponent } from './gear-criteria-detail.component';
// import { GearCriteriaUpdateComponent } from './gear-criteria-update.component';
// import { GearCriteriaDeletePopupComponent } from './gear-criteria-delete-dialog.component';
// import { IGearCriteria } from 'app/shared/model/gear-criteria.model';
//
// @Injectable({ providedIn: 'root' })
// export class GearCriteriaResolve implements Resolve<IGearCriteria> {
//     constructor(private service: GearCriteriaService) {}
//
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GearCriteria> {
//         const id = route.params['id'] ? route.params['id'] : null;
//         if (id) {
//             return this.service.find(id).pipe(
//                 filter((response: HttpResponse<GearCriteria>) => response.ok),
//                 map((gearCriteria: HttpResponse<GearCriteria>) => gearCriteria.body)
//             );
//         }
//         return of(new GearCriteria());
//     }
// }
//
// export const gearCriteriaRoute: Routes = [
//     {
//         path: '' +
//             '',
//         component: GearCriteriaComponent,
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearCriteria.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-criteria/:id/view',
//         component: GearCriteriaDetailComponent,
//         resolve: {
//             gearCriteria: GearCriteriaResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearCriteria.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-criteria/new',
//         component: GearCriteriaUpdateComponent,
//         resolve: {
//             gearCriteria: GearCriteriaResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearCriteria.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-criteria/:id/edit',
//         component: GearCriteriaUpdateComponent,
//         resolve: {
//             gearCriteria: GearCriteriaResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearCriteria.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     }
// ];
//
// export const gearCriteriaPopupRoute: Routes = [
//     {
//         path: 'gear-criteria/:id/delete',
//         component: GearCriteriaDeletePopupComponent,
//         resolve: {
//             gearCriteria: GearCriteriaResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearCriteria.home.title'
//         },
//         canActivate: [UserRouteAccessService],
//         outlet: 'popup'
//     }
// ];
//

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GearCriteriaComponent } from './gear-criteria.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'gear-criteria',
        component: GearCriteriaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearCriteria.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class gearCriteriaRoute {}
