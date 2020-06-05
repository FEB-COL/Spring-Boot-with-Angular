// import { Injectable } from '@angular/core';
// import { HttpResponse } from '@angular/common/http';
// import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
// import { UserRouteAccessService } from 'app/core';
// import { Observable, of } from 'rxjs';
// import { filter, map } from 'rxjs/operators';
// import { GearLibrary } from 'app/shared/model/gear-library.model';
// import { GearLibraryService } from './gear-library.service';
// import { GearLibraryComponent } from './gear-library.component';
// import { GearLibraryDetailComponent } from './gear-library-detail.component';
// import { GearLibraryUpdateComponent } from './gear-library-update.component';
// import { GearLibraryDeletePopupComponent } from './gear-library-delete-dialog.component';
// import { IGearLibrary } from 'app/shared/model/gear-library.model';
//
// @Injectable({ providedIn: 'root' })
// export class GearLibraryResolve implements Resolve<IGearLibrary> {
//     constructor(private service: GearLibraryService) {}
//
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GearLibrary> {
//         const id = route.params['id'] ? route.params['id'] : null;
//         if (id) {
//             return this.service.find(id).pipe(
//                 filter((response: HttpResponse<GearLibrary>) => response.ok),
//                 map((gearLibrary: HttpResponse<GearLibrary>) => gearLibrary.body)
//             );
//         }
//         return of(new GearLibrary());
//     }
// }
//
// export const gearLibraryRoute: Routes = [
//     {
//         path: 'gear-library',
//         component: GearLibraryComponent,
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearLibrary.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-library/:id/view',
//         component: GearLibraryDetailComponent,
//         resolve: {
//             gearLibrary: GearLibraryResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearLibrary.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-library/new',
//         component: GearLibraryUpdateComponent,
//         resolve: {
//             gearLibrary: GearLibraryResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearLibrary.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-library/:id/edit',
//         component: GearLibraryUpdateComponent,
//         resolve: {
//             gearLibrary: GearLibraryResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearLibrary.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     }
// ];
//
// export const gearLibraryPopupRoute: Routes = [
//     {
//         path: 'gear-library/:id/delete',
//         component: GearLibraryDeletePopupComponent,
//         resolve: {
//             gearLibrary: GearLibraryResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearLibrary.home.title'
//         },
//         canActivate: [UserRouteAccessService],
//         outlet: 'popup'
//     }
// ];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GearLibraryComponent } from './gear-library.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'gear-library',
        component: GearLibraryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearDomain.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class gearLibraryRoute {}
