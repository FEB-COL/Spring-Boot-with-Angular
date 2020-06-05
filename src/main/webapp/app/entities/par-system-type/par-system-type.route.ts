import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParSystemTypeComponent } from './par-system-type.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'par-system-type',
        component: ParSystemTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.parSystemType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class parSystemTypeRoute {}
