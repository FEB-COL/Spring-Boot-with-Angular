// import { Injectable } from '@angular/core';
// import { HttpResponse } from '@angular/common/http';
// import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
// import { UserRouteAccessService } from 'app/core';
// import { Observable, of } from 'rxjs';
// import { filter, map } from 'rxjs/operators';
// import { GearValueChainCategory } from 'app/shared/model/gear-value-chain-category.model';
// import { GearValueChainCategoryService } from './gear-value-chain-category.service';
// import { GearValueChainCategoryComponent } from './gear-value-chain-category.component';
// import { GearValueChainCategoryDetailComponent } from './gear-value-chain-category-detail.component';
// import { GearValueChainCategoryUpdateComponent } from './gear-value-chain-category-update.component';
// import { GearValueChainCategoryDeletePopupComponent } from './gear-value-chain-category-delete-dialog.component';
// import { IGearValueChainCategory } from 'app/shared/model/gear-value-chain-category.model';
//
// @Injectable({ providedIn: 'root' })
// export class GearValueChainCategoryResolve implements Resolve<IGearValueChainCategory> {
//     constructor(private service: GearValueChainCategoryService) {}
//
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GearValueChainCategory> {
//         const id = route.params['id'] ? route.params['id'] : null;
//         if (id) {
//             return this.service.find(id).pipe(
//                 filter((response: HttpResponse<GearValueChainCategory>) => response.ok),
//                 map((gearValueChainCategory: HttpResponse<GearValueChainCategory>) => gearValueChainCategory.body)
//             );
//         }
//         return of(new GearValueChainCategory());
//     }
// }
//
// export const gearValueChainCategoryRoute: Routes = [
//     {
//         path: 'gear-value-chain-category',
//         component: GearValueChainCategoryComponent,
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearValueChainCategory.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-value-chain-category/:id/view',
//         component: GearValueChainCategoryDetailComponent,
//         resolve: {
//             gearValueChainCategory: GearValueChainCategoryResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearValueChainCategory.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-value-chain-category/new',
//         component: GearValueChainCategoryUpdateComponent,
//         resolve: {
//             gearValueChainCategory: GearValueChainCategoryResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearValueChainCategory.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-value-chain-category/:id/edit',
//         component: GearValueChainCategoryUpdateComponent,
//         resolve: {
//             gearValueChainCategory: GearValueChainCategoryResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearValueChainCategory.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     }
// ];
//
// export const gearValueChainCategoryPopupRoute: Routes = [
//     {
//         path: 'gear-value-chain-category/:id/delete',
//         component: GearValueChainCategoryDeletePopupComponent,
//         resolve: {
//             gearValueChainCategory: GearValueChainCategoryResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearValueChainCategory.home.title'
//         },
//         canActivate: [UserRouteAccessService],
//         outlet: 'popup'
//     }
// ];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GearValueChainCategoryComponent } from './gear-value-chain-category.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'gear-value-chain-category',
        component: GearValueChainCategoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearValueChainCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class gearValueChainCategoryRoute {}
