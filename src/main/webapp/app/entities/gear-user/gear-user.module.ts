import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GeargatewaySharedModule } from 'app/shared';
import {
    GearUserComponent,
    GearUserDetailComponent,
    GearUserUpdateComponent,
    GearUserDeletePopupComponent,
    GearUserDeleteDialogComponent,
    gearUserRoute,
    gearUserPopupRoute
} from './';

const ENTITY_STATES = [...gearUserRoute, ...gearUserPopupRoute];

@NgModule({
    imports: [GeargatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GearUserComponent,
        GearUserDetailComponent,
        GearUserUpdateComponent,
        GearUserDeleteDialogComponent,
        GearUserDeletePopupComponent
    ],
    entryComponents: [GearUserComponent, GearUserUpdateComponent, GearUserDeleteDialogComponent, GearUserDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeargatewayGearUserModule {}
