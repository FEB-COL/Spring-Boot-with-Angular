// import { Injectable } from '@angular/core';
// import { HttpResponse } from '@angular/common/http';
// import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
// import { UserRouteAccessService } from 'app/core';
// import { Observable, of } from 'rxjs';
// import { filter, map } from 'rxjs/operators';
// import { GearInformationSystems } from 'app/shared/model/gear-information-systems.model';
// import { GearInformationSystemsService } from './gear-information-systems.service';
// import { GearInformationSystemsComponent } from './gear-information-systems.component';
// import { GearInformationSystemsDetailComponent } from './gear-information-systems-detail.component';
// import { GearInformationSystemsUpdateComponent } from './gear-information-systems-update.component';
// import { GearInformationSystemsDeletePopupComponent } from './gear-information-systems-delete-dialog.component';
// import { IGearInformationSystems } from 'app/shared/model/gear-information-systems.model';
//
// @Injectable({ providedIn: 'root' })
// export class GearInformationSystemsResolve implements Resolve<IGearInformationSystems> {
//     constructor(private service: GearInformationSystemsService) {}
//
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GearInformationSystems> {
//         const id = route.params['id'] ? route.params['id'] : null;
//         if (id) {
//             return this.service.find(id).pipe(
//                 filter((response: HttpResponse<GearInformationSystems>) => response.ok),
//                 map((gearInformationSystems: HttpResponse<GearInformationSystems>) => gearInformationSystems.body)
//             );
//         }
//         return of(new GearInformationSystems());
//     }
// }
//
// export const gearInformationSystemsRoute: Routes = [
//     {
//         path: 'gear-information-systems',
//         component: GearInformationSystemsComponent,
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearInformationSystems.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-information-systems/:id/view',
//         component: GearInformationSystemsDetailComponent,
//         resolve: {
//             gearInformationSystems: GearInformationSystemsResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearInformationSystems.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-information-systems/new',
//         component: GearInformationSystemsUpdateComponent,
//         resolve: {
//             gearInformationSystems: GearInformationSystemsResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearInformationSystems.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-information-systems/:id/edit',
//         component: GearInformationSystemsUpdateComponent,
//         resolve: {
//             gearInformationSystems: GearInformationSystemsResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearInformationSystems.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     }
// ];
//
// export const gearInformationSystemsPopupRoute: Routes = [
//     {
//         path: 'gear-information-systems/:id/delete',
//         component: GearInformationSystemsDeletePopupComponent,
//         resolve: {
//             gearInformationSystems: GearInformationSystemsResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearInformationSystems.home.title'
//         },
//         canActivate: [UserRouteAccessService],
//         outlet: 'popup'
//     }
// ];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GearInformationSystemsComponent } from './gear-information-systems.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'gear-information-systems',
        component: GearInformationSystemsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearInformationSystems.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class gearInformationSystemsRoute {}
