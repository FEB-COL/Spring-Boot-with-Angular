import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GeargatewaySharedModule } from 'app/shared';

import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { MaterialModule } from '../../shared/material-components.module';

import {
    GearWikiComponent,
    GearWikiDetailComponent,
    GearWikiUpdateComponent,
    GearWikiDeletePopupComponent,
    GearWikiDeleteDialogComponent,
    gearWikiRoute,
    gearWikiPopupRoute
} from './';

const ENTITY_STATES = [...gearWikiRoute, ...gearWikiPopupRoute];

@NgModule({
    imports: [GeargatewaySharedModule, RouterModule.forChild(ENTITY_STATES), CommonModule, QuillModule, MaterialModule],
    declarations: [
        GearWikiComponent,
        GearWikiDetailComponent,
        GearWikiUpdateComponent,
        GearWikiDeleteDialogComponent,
        GearWikiDeletePopupComponent
    ],
    entryComponents: [GearWikiComponent, GearWikiUpdateComponent, GearWikiDeleteDialogComponent, GearWikiDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeargatewayGearWikiModule {}
