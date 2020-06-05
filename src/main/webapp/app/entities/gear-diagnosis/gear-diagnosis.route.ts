import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GearDiagnosisComponent } from './gear-diagnosis.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'gear-diagnosis',
        component: GearDiagnosisComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearDiagnosis.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GearDiagnosisRoute {}
