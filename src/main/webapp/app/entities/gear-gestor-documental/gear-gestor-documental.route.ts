import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GearGestorDocumentalComponent } from './gear-gestor-documental.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'gear-domain',
        component: GearGestorDocumentalComponent,
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
export class gearGestorDocumentalRoute {}
