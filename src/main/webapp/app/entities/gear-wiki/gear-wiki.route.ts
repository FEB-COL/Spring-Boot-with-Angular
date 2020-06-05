import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GearWiki } from 'app/shared/model/gear-wiki.model';
import { GearWikiService } from './gear-wiki.service';
import { GearWikiComponent } from './gear-wiki.component';
import { GearWikiDetailComponent } from './gear-wiki-detail.component';
import { GearWikiUpdateComponent } from './gear-wiki-update.component';
import { GearWikiDeletePopupComponent } from './gear-wiki-delete-dialog.component';
import { IGearWiki } from 'app/shared/model/gear-wiki.model';

@Injectable({ providedIn: 'root' })
export class GearWikiResolve implements Resolve<IGearWiki> {
    constructor(private service: GearWikiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GearWiki> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<GearWiki>) => response.ok),
                map((gearWiki: HttpResponse<GearWiki>) => gearWiki.body)
            );
        }
        return of(new GearWiki());
    }
}

export const gearWikiRoute: Routes = [
    {
        path: 'gear-wiki',
        component: GearWikiComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearWiki.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-wiki/:id/view',
        component: GearWikiDetailComponent,
        resolve: {
            gearWiki: GearWikiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearWiki.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-wiki/new',
        component: GearWikiUpdateComponent,
        resolve: {
            gearWiki: GearWikiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearWiki.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gear-wiki/:id/edit',
        component: GearWikiUpdateComponent,
        resolve: {
            gearWiki: GearWikiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearWiki.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gearWikiPopupRoute: Routes = [
    {
        path: 'gear-wiki/:id/delete',
        component: GearWikiDeletePopupComponent,
        resolve: {
            gearWiki: GearWikiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearWiki.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
