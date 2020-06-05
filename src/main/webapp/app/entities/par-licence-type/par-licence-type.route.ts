// import { Injectable } from '@angular/core';
// import { HttpResponse } from '@angular/common/http';
// import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
// import { UserRouteAccessService } from 'app/core';
// import { Observable, of } from 'rxjs';
// import { filter, map } from 'rxjs/operators';
// import { ParLicenceType } from 'app/shared/model/par-licence-type.model';
// import { ParLicenceTypeService } from './par-licence-type.service';
// import { ParLicenceTypeComponent } from './par-licence-type.component';
// import { ParLicenceTypeDetailComponent } from './par-licence-type-detail.component';
// import { ParLicenceTypeUpdateComponent } from './par-licence-type-update.component';
// import { ParLicenceTypeDeletePopupComponent } from './par-licence-type-delete-dialog.component';
// import { IParLicenceType } from 'app/shared/model/par-licence-type.model';
//
// @Injectable({ providedIn: 'root' })
// export class ParLicenceTypeResolve implements Resolve<IParLicenceType> {
//     constructor(private service: ParLicenceTypeService) {}
//
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ParLicenceType> {
//         const id = route.params['id'] ? route.params['id'] : null;
//         if (id) {
//             return this.service.find(id).pipe(
//                 filter((response: HttpResponse<ParLicenceType>) => response.ok),
//                 map((parLicenceType: HttpResponse<ParLicenceType>) => parLicenceType.body)
//             );
//         }
//         return of(new ParLicenceType());
//     }
// }
//
// export const parLicenceTypeRoute: Routes = [
//     {
//         path: 'par-licence-type',
//         component: ParLicenceTypeComponent,
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.parLicenceType.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'par-licence-type/:id/view',
//         component: ParLicenceTypeDetailComponent,
//         resolve: {
//             parLicenceType: ParLicenceTypeResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.parLicenceType.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'par-licence-type/new',
//         component: ParLicenceTypeUpdateComponent,
//         resolve: {
//             parLicenceType: ParLicenceTypeResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.parLicenceType.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'par-licence-type/:id/edit',
//         component: ParLicenceTypeUpdateComponent,
//         resolve: {
//             parLicenceType: ParLicenceTypeResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.parLicenceType.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     }
// ];
//
// export const parLicenceTypePopupRoute: Routes = [
//     {
//         path: 'par-licence-type/:id/delete',
//         component: ParLicenceTypeDeletePopupComponent,
//         resolve: {
//             parLicenceType: ParLicenceTypeResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.parLicenceType.home.title'
//         },
//         canActivate: [UserRouteAccessService],
//         outlet: 'popup'
//     }
// ];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParLicenceTypeComponent } from './par-licence-type.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'par-licence-type',
        component: ParLicenceTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.parLicenceType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class parLicenceTypeRoute {}
