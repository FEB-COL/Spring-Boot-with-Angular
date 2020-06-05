import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GearOrganizationalUnitComponent } from './gear-organizational-unit.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'gear-organizational-unit',
        component: GearOrganizationalUnitComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearOrganizationalUnit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class gearOrganizationalUnitRoute {}
