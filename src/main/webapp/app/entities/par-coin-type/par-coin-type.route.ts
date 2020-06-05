import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParCoinTypeComponent } from './par-coin-type.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'par-coin-type',
        component: ParCoinTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.parCoinType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class parCoinTypeRoute {}
