import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GearCustomFieldTemplateComponent, gearCustomFieldTemplateRoute } from './';
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
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from 'app/core/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'app/shared/list/list.module';
import { MaterialModule } from 'app/shared/material-components.module';
import { CustomFieldTemplateCreateUpdateModule } from './modalsCustomFieldTemplate/custom-field-template-create-update.module';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

@NgModule({
    imports: [
        // configuracion para el nuevo thema
        CommonModule,
        FormsModule,
        MaterialModule,

        // Componente de Ruteo
        gearCustomFieldTemplateRoute,

        ListModule,
        CustomFieldTemplateCreateUpdateModule,
        BreadcrumbsModule,
        //Fina de la configuracion del thema

        //  =================================  Start Implementar Alertas ===============================
        [SweetAlert2Module.forRoot()],
        // [SweetAlert2Module.forRoot({
        //     buttonsStyling: false,
        //     customClass: 'modal-content',
        //     confirmButtonClass: 'btn btn-primary',
        //     cancelButtonClass: 'btn'
        // })
        // ],
        //=> In submodules only:
        [SweetAlert2Module]
        //  =================================  End Implementar Alertas ==============================
    ],
    declarations: [GearCustomFieldTemplateComponent],
    exports: [RouterModule]
})
export class GeargatewayGearCustomFieldTemplateModule {}
