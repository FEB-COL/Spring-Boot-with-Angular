import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../app/shared/material-components.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FuryCardModule } from '../../../app/shared/card/card.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HighlightModule } from '../../../app/shared/highlightjs/highlight.module';

/** Implemenatacion de descarga ecxel*/
import { ExcelService } from './../../services/excel.service';

/** Implementar Angula Material */
import 'hammerjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from 'app/core/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'app/shared/list/list.module';

import { GeargatewaySharedModule } from 'app/shared';
import {
    GearSurveyComponent,
    GearSurveyDetailComponent,
    GearSurveyUpdateComponent,
    GearSurveyDeletePopupComponent,
    GearSurveyDeleteDialogComponent,
    gearSurveyRoute,
    gearSurveyPopupRoute
} from './';
import { GearSurveySaveComponent } from './gear-survey-save.component';

import { GearSurveyListComponent } from './gear-survey-list.component';
import { GearSurveySolveComponent } from './gear-survey-solve.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AuthorityDirective } from './authority.directive';

const ENTITY_STATES = [...gearSurveyRoute, ...gearSurveyPopupRoute];

@NgModule({
    imports: [
        GeargatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),

        HighlightModule,
        FuryCardModule,

        // configuracion para el nuevo thema
        CommonModule,
        FormsModule,
        ListModule,
        BreadcrumbsModule,
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ServiceWorkerModule,
        MatFormFieldModule,

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
    ],
    declarations: [
        GearSurveyListComponent,
        GearSurveySaveComponent,
        GearSurveySolveComponent,

        GearSurveyComponent,
        GearSurveyDetailComponent,
        GearSurveyUpdateComponent,
        GearSurveyDeleteDialogComponent,
        GearSurveyDeletePopupComponent,
        // MatFormFieldModule,
        // MaterialModule,
        // FuryCardModule,
        // ReactiveFormsModule,
        // HighlightModule

        // ========== Permisos ============
        AuthorityDirective // para validar mostrar componentes deacuerdo al perfil
        // ========== Permisos ============
    ],
    entryComponents: [GearSurveyComponent, GearSurveyUpdateComponent, GearSurveyDeleteDialogComponent, GearSurveyDeletePopupComponent],

    providers: [
        //  ======= Implementacion Excel ===========
        ExcelService
    ]
    // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeargatewayGearSurveyModule {}
