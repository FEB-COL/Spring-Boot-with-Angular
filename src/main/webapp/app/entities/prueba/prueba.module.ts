import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GeargatewaySharedModule } from 'app/shared';
import { PruebaComponent, pruebaRoute } from './';

// Implementacion del Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatCardModule,
    MatChipsModule,
    MatCommonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatLineModule,
    MatListModule,
    MatMenuModule,
    MatOptionModule,
    MatPaginatorModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatBottomSheetModule,
    MatGridListModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatPseudoCheckboxModule,
    MatSlideToggleModule,
    MatSnackBarModule
} from '@angular/material';
import 'hammerjs';

const ENTITY_STATES = [...pruebaRoute];

@NgModule({
    imports: [
        GeargatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        BrowserAnimationsModule,
        // Implemetacion de Angular-Material
        MatButtonModule,
        MatCheckboxModule,
        MatTabsModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatCardModule,
        MatChipsModule,
        MatCommonModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatLineModule,
        MatListModule,
        MatMenuModule,
        MatOptionModule,
        MatPaginatorModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSortModule,
        MatStepperModule,
        MatTableModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        MatBottomSheetModule,
        MatGridListModule,
        MatNativeDateModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatPseudoCheckboxModule,
        MatSlideToggleModule,
        MatSnackBarModule
    ],
    declarations: [PruebaComponent],
    entryComponents: [PruebaComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeargatewayPruebaModule {}
