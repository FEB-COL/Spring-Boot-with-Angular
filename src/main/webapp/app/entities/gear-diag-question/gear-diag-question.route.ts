import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GearDiagQuestionComponent } from './gear-diag-question.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'gear-diag-question',
        component: GearDiagQuestionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearDiagQuestion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class gearDiagQuestionRoute {}
