import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GearGestionUsuariosComponent } from './gear-gestion-usuarios.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'gear-gestion-usuarios',
        component: GearGestionUsuariosComponent,
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
export class gearGestionUsuariosRoute {}
