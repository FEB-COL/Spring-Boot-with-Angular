import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GearDecisionComponent } from './gear-decision.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'gear-decision',
        component: GearDecisionComponent,
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class gearDecisionRoute {}
