import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GearProjectRiskComponent } from './gear-project-risk.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'gear-project-risk',
        component: GearProjectRiskComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearProjectRisk.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class gearProjectRiskRoute {}
