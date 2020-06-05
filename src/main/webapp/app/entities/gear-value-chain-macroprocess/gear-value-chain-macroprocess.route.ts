// import { Injectable } from '@angular/core';
// import { HttpResponse } from '@angular/common/http';
// import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
// import { UserRouteAccessService } from 'app/core';
// import { Observable, of } from 'rxjs';
// import { filter, map } from 'rxjs/operators';
// import { GearValueChainMacroprocess } from 'app/shared/model/gear-value-chain-macroprocess.model';
// import { GearValueChainMacroprocessService } from './gear-value-chain-macroprocess.service';
// import { GearValueChainMacroprocessComponent } from './gear-value-chain-macroprocess.component';
// import { GearValueChainMacroprocessDetailComponent } from './gear-value-chain-macroprocess-detail.component';
// import { GearValueChainMacroprocessUpdateComponent } from './gear-value-chain-macroprocess-update.component';
// import { GearValueChainMacroprocessDeletePopupComponent } from './gear-value-chain-macroprocess-delete-dialog.component';
// import { IGearValueChainMacroprocess } from 'app/shared/model/gear-value-chain-macroprocess.model';
//
// @Injectable({ providedIn: 'root' })
// export class GearValueChainMacroprocessResolve implements Resolve<IGearValueChainMacroprocess> {
//     constructor(private service: GearValueChainMacroprocessService) {}
//
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GearValueChainMacroprocess> {
//         const id = route.params['id'] ? route.params['id'] : null;
//         if (id) {
//             return this.service.find(id).pipe(
//                 filter((response: HttpResponse<GearValueChainMacroprocess>) => response.ok),
//                 map((gearValueChainMacroprocess: HttpResponse<GearValueChainMacroprocess>) => gearValueChainMacroprocess.body)
//             );
//         }
//         return of(new GearValueChainMacroprocess());
//     }
// }
//
// export const gearValueChainMacroprocessRoute: Routes = [
//     {
//         path: 'gear-value-chain-macroprocess',
//         component: GearValueChainMacroprocessComponent,
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearValueChainMacroprocess.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-value-chain-macroprocess/:id/view',
//         component: GearValueChainMacroprocessDetailComponent,
//         resolve: {
//             gearValueChainMacroprocess: GearValueChainMacroprocessResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearValueChainMacroprocess.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-value-chain-macroprocess/new',
//         component: GearValueChainMacroprocessUpdateComponent,
//         resolve: {
//             gearValueChainMacroprocess: GearValueChainMacroprocessResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearValueChainMacroprocess.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-value-chain-macroprocess/:id/edit',
//         component: GearValueChainMacroprocessUpdateComponent,
//         resolve: {
//             gearValueChainMacroprocess: GearValueChainMacroprocessResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearValueChainMacroprocess.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     }
// ];
//
// export const gearValueChainMacroprocessPopupRoute: Routes = [
//     {
//         path: 'gear-value-chain-macroprocess/:id/delete',
//         component: GearValueChainMacroprocessDeletePopupComponent,
//         resolve: {
//             gearValueChainMacroprocess: GearValueChainMacroprocessResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearValueChainMacroprocess.home.title'
//         },
//         canActivate: [UserRouteAccessService],
//         outlet: 'popup'
//     }
// ];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GearValueChainMacroprocessComponent } from './gear-value-chain-macroprocess.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'gear-value-chain-macroprocess',
        component: GearValueChainMacroprocessComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearValueChainMacroprocess.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class gearValueChainMacroprocessRoute {}
