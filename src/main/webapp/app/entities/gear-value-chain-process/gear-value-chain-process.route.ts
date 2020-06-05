// import { Injectable } from '@angular/core';
// import { HttpResponse } from '@angular/common/http';
// import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
// import { UserRouteAccessService } from 'app/core';
// import { Observable, of } from 'rxjs';
// import { filter, map } from 'rxjs/operators';
// import { GearValueChainProcess } from 'app/shared/model/gear-value-chain-process.model';
// import { GearValueChainProcessService } from './gear-value-chain-process.service';
// import { GearValueChainProcessComponent } from './gear-value-chain-process.component';
// import { GearValueChainProcessDetailComponent } from './gear-value-chain-process-detail.component';
// import { GearValueChainProcessUpdateComponent } from './gear-value-chain-process-update.component';
// import { GearValueChainProcessDeletePopupComponent } from './gear-value-chain-process-delete-dialog.component';
// import { IGearValueChainProcess } from 'app/shared/model/gear-value-chain-process.model';
//
// @Injectable({ providedIn: 'root' })
// export class GearValueChainProcessResolve implements Resolve<IGearValueChainProcess> {
//     constructor(private service: GearValueChainProcessService) {}
//
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GearValueChainProcess> {
//         const id = route.params['id'] ? route.params['id'] : null;
//         if (id) {
//             return this.service.find(id).pipe(
//                 filter((response: HttpResponse<GearValueChainProcess>) => response.ok),
//                 map((gearValueChainProcess: HttpResponse<GearValueChainProcess>) => gearValueChainProcess.body)
//             );
//         }
//         return of(new GearValueChainProcess());
//     }
// }
//
// export const gearValueChainProcessRoute: Routes = [
//     {
//         path: 'gear-value-chain-process',
//         component: GearValueChainProcessComponent,
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearValueChainProcess.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-value-chain-process/:id/view',
//         component: GearValueChainProcessDetailComponent,
//         resolve: {
//             gearValueChainProcess: GearValueChainProcessResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearValueChainProcess.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-value-chain-process/new',
//         component: GearValueChainProcessUpdateComponent,
//         resolve: {
//             gearValueChainProcess: GearValueChainProcessResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearValueChainProcess.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-value-chain-process/:id/edit',
//         component: GearValueChainProcessUpdateComponent,
//         resolve: {
//             gearValueChainProcess: GearValueChainProcessResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearValueChainProcess.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     }
// ];
//
// export const gearValueChainProcessPopupRoute: Routes = [
//     {
//         path: 'gear-value-chain-process/:id/delete',
//         component: GearValueChainProcessDeletePopupComponent,
//         resolve: {
//             gearValueChainProcess: GearValueChainProcessResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearValueChainProcess.home.title'
//         },
//         canActivate: [UserRouteAccessService],
//         outlet: 'popup'
//     }
// ];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GearValueChainProcessComponent } from './gear-value-chain-process.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'gear-value-chain-process',
        component: GearValueChainProcessComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearValueChainProcess.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class gearValueChainProcessRoute {}
