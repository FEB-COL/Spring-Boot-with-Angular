import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GearSystemsFunctionalityComponent } from './gear-systems-functionality.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'gear-systems-functionality',
        component: GearSystemsFunctionalityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearSystemsFunctionality.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class gearSystemsFunctionalityRoute {}
