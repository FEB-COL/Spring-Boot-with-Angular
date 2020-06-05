import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GearCustomFieldTemplateComponent } from './gear-custom-field-template.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'gear-custom-field-template',
        component: GearCustomFieldTemplateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearCustomFieldTemplate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class gearCustomFieldTemplateRoute {}
