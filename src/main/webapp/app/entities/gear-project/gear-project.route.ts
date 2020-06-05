// import { Injectable } from '@angular/core';
// import { HttpResponse } from '@angular/common/http';
// import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
// import { UserRouteAccessService } from 'app/core';
// import { Observable, of } from 'rxjs';
// import { filter, map } from 'rxjs/operators';
// import { GearProject } from 'app/shared/model/gear-project.model';
// import { GearProjectService } from './gear-project.service';
// import { GearProjectComponent } from './gear-project.component';
// import { GearProjectDetailComponent } from './gear-project-detail.component';
// import { GearProjectUpdateComponent } from './gear-project-update.component';
// import { GearProjectDeletePopupComponent } from './gear-project-delete-dialog.component';
// import { IGearProject } from 'app/shared/model/gear-project.model';
//
// @Injectable({ providedIn: 'root' })
// export class GearProjectResolve implements Resolve<IGearProject> {
//     constructor(private service: GearProjectService) {}
//
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GearProject> {
//         const id = route.params['id'] ? route.params['id'] : null;
//         if (id) {
//             return this.service.find(id).pipe(
//                 filter((response: HttpResponse<GearProject>) => response.ok),
//                 map((gearProject: HttpResponse<GearProject>) => gearProject.body)
//             );
//         }
//         return of(new GearProject());
//     }
// }
//
// export const gearProjectRoute: Routes = [
//     {
//         path: 'gear-project',
//         component: GearProjectComponent,
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearProject.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-project/:id/view',
//         component: GearProjectDetailComponent,
//         resolve: {
//             gearProject: GearProjectResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearProject.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-project/new',
//         component: GearProjectUpdateComponent,
//         resolve: {
//             gearProject: GearProjectResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearProject.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     },
//     {
//         path: 'gear-project/:id/edit',
//         component: GearProjectUpdateComponent,
//         resolve: {
//             gearProject: GearProjectResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearProject.home.title'
//         },
//         canActivate: [UserRouteAccessService]
//     }
// ];
//
// export const gearProjectPopupRoute: Routes = [
//     {
//         path: 'gear-project/:id/delete',
//         component: GearProjectDeletePopupComponent,
//         resolve: {
//             gearProject: GearProjectResolve
//         },
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'geargatewayApp.gearProject.home.title'
//         },
//         canActivate: [UserRouteAccessService],
//         outlet: 'popup'
//     }
// ];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GearProjectComponent } from './gear-project.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'gear-project',
        component: GearProjectComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearProject.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class gearProjectRoute {}
