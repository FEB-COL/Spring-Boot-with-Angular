import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GearDocumentTypeComponent } from './gear-document-type.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'gear-document-type',
        component: GearDocumentTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'geargatewayApp.gearDocumentType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class gearDocumentTypeRoute {}
