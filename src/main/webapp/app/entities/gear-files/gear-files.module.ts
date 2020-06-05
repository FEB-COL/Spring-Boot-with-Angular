import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GeargatewaySharedModule } from 'app/shared';
import {
    GearFilesComponent,
    GearFilesDetailComponent,
    GearFilesUpdateComponent,
    GearFilesDeletePopupComponent,
    GearFilesDeleteDialogComponent,
    gearFilesRoute,
    gearFilesPopupRoute
} from './';

const ENTITY_STATES = [...gearFilesRoute, ...gearFilesPopupRoute];

@NgModule({
    imports: [GeargatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GearFilesComponent,
        GearFilesDetailComponent,
        GearFilesUpdateComponent,
        GearFilesDeleteDialogComponent,
        GearFilesDeletePopupComponent
    ],
    entryComponents: [GearFilesComponent, GearFilesUpdateComponent, GearFilesDeleteDialogComponent, GearFilesDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeargatewayGearFilesModule {}
