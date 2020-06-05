import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GearPortfolioComponent } from './gear-portfolio.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'gear-portfolio',
        component: GearPortfolioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearPortfolio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class gearPortfolioRoute {}
