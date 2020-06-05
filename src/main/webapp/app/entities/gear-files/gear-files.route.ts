import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GearFiles } from 'app/shared/model/gear-files.model';
import { GearFilesService } from './gear-files.service';
import { GearFilesComponent } from './gear-files.component';
import { GearFilesDetailComponent } from './gear-files-detail.component';
import { GearFilesUpdateComponent } from './gear-files-update.component';
import { GearFilesDeletePopupComponent } from './gear-files-delete-dialog.component';
import { IGearFiles } from 'app/shared/model/gear-files.model';

@Injectable({ providedIn: 'root' })
export class GearFilesResolve implements Resolve<IGearFiles> {
    constructor(private service: GearFilesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GearFiles> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<GearFiles>) => response.ok),
                map((gearFiles: HttpResponse<GearFiles>) => gearFiles.body)
            );
        }
        return of(new GearFiles());
    }
}

export const gearFilesRoute: Routes = [
    {
        path: 'gear-files',
        component: GearFilesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearFiles.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-files/:id/view',
        component: GearFilesDetailComponent,
        resolve: {
            gearFiles: GearFilesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearFiles.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-files/new',
        component: GearFilesUpdateComponent,
        resolve: {
            gearFiles: GearFilesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearFiles.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-files/:id/edit',
        component: GearFilesUpdateComponent,
        resolve: {
            gearFiles: GearFilesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearFiles.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gearFilesPopupRoute: Routes = [
    {
        path: 'gear-files/:id/delete',
        component: GearFilesDeletePopupComponent,
        resolve: {
            gearFiles: GearFilesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearFiles.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
