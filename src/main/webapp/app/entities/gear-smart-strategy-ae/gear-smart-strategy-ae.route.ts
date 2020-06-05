// import { Injectable } from '@angular/core';
// import { HttpResponse } from '@angular/common/http';
// import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
// import { UserRouteAccessService } from 'app/core';
// import { Observable, of } from 'rxjs';
// import { filter, map } from 'rxjs/operators';
// import { GearSmartStrategyAE } from 'app/shared/model/gear-smart-strategy-ae.model';
// import { GearSmartStrategyAEService } from './gear-smart-strategy-ae.service';
// import { GearSmartStrategyAEComponent } from './gear-smart-strategy-ae.component';
// import { GearSmartStrategyAEDetailComponent } from './gear-smart-strategy-ae-detail.component';
// import { GearSmartStrategyAEUpdateComponent } from './gear-smart-strategy-ae-update.component';
// import { GearSmartStrategyAEDeletePopupComponent } from './gear-smart-strategy-ae-delete-dialog.component';
// import { IGearSmartStrategyAE } from 'app/shared/model/gear-smart-strategy-ae.model';
//
// @Injectable({ providedIn: 'root' })
// export class GearSmartStrategyAEResolve implements Resolve<IGearSmartStrategyAE> {
//     constructor(private service: GearSmartStrategyAEService) {}
//
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GearSmartStrategyAE> {
//         const id = route.params['id'] ? route.params['id'] : null;
//         if (id) {
//             return this.service.find(id).pipe(
//                 filter((response: HttpResponse<GearSmartStrategyAE>) => response.ok),
//                 map((gearSmartStrategyAE: HttpResponse<GearSmartStrategyAE>) => gearSmartStrategyAE.body)
//             );
//         }
//         return of(new GearSmartStrategyAE());
//     }
// }
//
// export const gearSmartStrategyAERoute: Routes = [
//     {
//         path: 'gear-smart-strategy-ae',
//         component: GearSmartStrategyAEComponent,
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearSmartStrategyAE.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-smart-strategy-ae/:id/view',
//         component: GearSmartStrategyAEDetailComponent,
//         resolve: {
//             gearSmartStrategyAE: GearSmartStrategyAEResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearSmartStrategyAE.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-smart-strategy-ae/new',
//         component: GearSmartStrategyAEUpdateComponent,
//         resolve: {
//             gearSmartStrategyAE: GearSmartStrategyAEResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearSmartStrategyAE.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-smart-strategy-ae/:id/edit',
//         component: GearSmartStrategyAEUpdateComponent,
//         resolve: {
//             gearSmartStrategyAE: GearSmartStrategyAEResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearSmartStrategyAE.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     }
// ];
//
// export const gearSmartStrategyAEPopupRoute: Routes = [
//     {
//         path: 'gear-smart-strategy-ae/:id/delete',
//         component: GearSmartStrategyAEDeletePopupComponent,
//         resolve: {
//             gearSmartStrategyAE: GearSmartStrategyAEResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearSmartStrategyAE.home.title'
//         },
//         canActivate: [UserRouteAccessService],
//         outlet: 'popup'
//     }
// ];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GearSmartStrategyAEComponent } from './gear-smart-strategy-ae.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'gear-smart-strategy-ae',
        component: GearSmartStrategyAEComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSmartStrategyAE.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class gearSmartStrategyAERoute {}
