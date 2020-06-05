// import { Injectable } from '@angular/core';
// import { HttpResponse } from '@angular/common/http';
// import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
// import { UserRouteAccessService } from 'app/core';
// import { Observable, of } from 'rxjs';
// import { filter, map } from 'rxjs/operators';
// import { GearGoalsStrategyAE } from 'app/shared/model/gear-goals-strategy-ae.model';
// import { GearGoalsStrategyAEService } from './gear-goals-strategy-ae.service';
// import { GearGoalsStrategyAEComponent } from './gear-goals-strategy-ae.component';
// import { GearGoalsStrategyAEDetailComponent } from './gear-goals-strategy-ae-detail.component';
// import { GearGoalsStrategyAEUpdateComponent } from './gear-goals-strategy-ae-update.component';
// import { GearGoalsStrategyAEDeletePopupComponent } from './gear-goals-strategy-ae-delete-dialog.component';
// import { IGearGoalsStrategyAE } from 'app/shared/model/gear-goals-strategy-ae.model';
//
// @Injectable({ providedIn: 'root' })
// export class GearGoalsStrategyAEResolve implements Resolve<IGearGoalsStrategyAE> {
//     constructor(private service: GearGoalsStrategyAEService) {}
//
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GearGoalsStrategyAE> {
//         const id = route.params['id'] ? route.params['id'] : null;
//         if (id) {
//             return this.service.find(id).pipe(
//                 filter((response: HttpResponse<GearGoalsStrategyAE>) => response.ok),
//                 map((gearGoalsStrategyAE: HttpResponse<GearGoalsStrategyAE>) => gearGoalsStrategyAE.body)
//             );
//         }
//         return of(new GearGoalsStrategyAE());
//     }
// }
//
// export const gearGoalsStrategyAERoute: Routes = [
//     {
//         path: 'gear-goals-strategy-ae',
//         component: GearGoalsStrategyAEComponent,
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearGoalsStrategyAE.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-goals-strategy-ae/:id/view',
//         component: GearGoalsStrategyAEDetailComponent,
//         resolve: {
//             gearGoalsStrategyAE: GearGoalsStrategyAEResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearGoalsStrategyAE.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-goals-strategy-ae/new',
//         component: GearGoalsStrategyAEUpdateComponent,
//         resolve: {
//             gearGoalsStrategyAE: GearGoalsStrategyAEResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearGoalsStrategyAE.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-goals-strategy-ae/:id/edit',
//         component: GearGoalsStrategyAEUpdateComponent,
//         resolve: {
//             gearGoalsStrategyAE: GearGoalsStrategyAEResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearGoalsStrategyAE.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     }
// ];
//
// export const gearGoalsStrategyAEPopupRoute: Routes = [
//     {
//         path: 'gear-goals-strategy-ae/:id/delete',
//         component: GearGoalsStrategyAEDeletePopupComponent,
//         resolve: {
//             gearGoalsStrategyAE: GearGoalsStrategyAEResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearGoalsStrategyAE.home.title'
//         },
//         canActivate: [UserRouteAccessService],
//         outlet: 'popup'
//     }
// ];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GearGoalsStrategyAEComponent } from './gear-goals-strategy-ae.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'gear-goals-strategy-ae',
        component: GearGoalsStrategyAEComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearGoalsStrategyAE.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class gearGoalsStrategyAERoute {}
