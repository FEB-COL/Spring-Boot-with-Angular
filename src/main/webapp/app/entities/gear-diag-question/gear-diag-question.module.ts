import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GearDiagQuestionComponent, gearDiagQuestionRoute } from './';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'app/shared/material-components.module';
import { ListModule } from 'app/shared/list/list.module';
import { DiagQuestionsCreateUpdateModule } from 'app/entities/gear-diag-question/modalsDiagQuestions/diag-questions-create-update.module';
import { BreadcrumbsModule } from 'app/core/breadcrumbs/breadcrumbs.module';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

@NgModule({
    imports: [
        // ================================= configuracion para el nuevo thema ========================
        CommonModule,
        FormsModule,
        MaterialModule,

        // Componente de Ruteo
        gearDiagQuestionRoute,

        ListModule,
        DiagQuestionsCreateUpdateModule, // Modulo de la entidad
        BreadcrumbsModule,
        // ================================= Fina de la configuracion del thema ========================

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
    declarations: [GearDiagQuestionComponent]
})
export class GeargatewayGearDiagQuestionModule {}
