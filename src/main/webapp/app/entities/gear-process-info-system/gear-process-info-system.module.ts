import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GeargatewaySharedModule } from 'app/shared';
import {
    GearProcessInfoSystemComponent,
    GearProcessInfoSystemDetailComponent,
    GearProcessInfoSystemUpdateComponent,
    GearProcessInfoSystemDeletePopupComponent,
    GearProcessInfoSystemDeleteDialogComponent,
    gearProcessInfoSystemRoute,
    gearProcessInfoSystemPopupRoute
} from './';

const ENTITY_STATES = [...gearProcessInfoSystemRoute, ...gearProcessInfoSystemPopupRoute];

@NgModule({
    imports: [GeargatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GearProcessInfoSystemComponent,
        GearProcessInfoSystemDetailComponent,
        GearProcessInfoSystemUpdateComponent,
        GearProcessInfoSystemDeleteDialogComponent,
        GearProcessInfoSystemDeletePopupComponent
    ],
    entryComponents: [
        GearProcessInfoSystemComponent,
        GearProcessInfoSystemUpdateComponent,
        GearProcessInfoSystemDeleteDialogComponent,
        GearProcessInfoSystemDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeargatewayGearProcessInfoSystemModule {}
