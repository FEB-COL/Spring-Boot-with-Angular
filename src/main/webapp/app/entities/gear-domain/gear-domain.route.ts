import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GearDomainComponent } from './gear-domain.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'gear-domain',
        component: GearDomainComponent,
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class gearDomainRoute {}
