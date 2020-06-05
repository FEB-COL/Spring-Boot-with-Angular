import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GearOptionComponent } from './gear-option.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'gear-option',
        component: GearOptionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearOption.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class gearOptionRoute {}
