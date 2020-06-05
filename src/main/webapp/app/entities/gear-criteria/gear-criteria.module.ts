import { NgModule } from '@angular/core';

import { GearCriteriaComponent, gearCriteriaRoute } from './';

import 'hammerjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'app/shared/material-components.module';
import { ListModule } from 'app/shared/list/list.module';
import { BreadcrumbsModule } from 'app/core/breadcrumbs/breadcrumbs.module';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { CriteriaCreateUpdateModule } from './modalsCriteria/criteria-create-update.module';

// Implementacion de slider
import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
    imports: [
        // ================================= configuracion para el nuevo thema ========================
        CommonModule,
        FormsModule,
        MaterialModule,

        // Componente de Ruteo
        gearCriteriaRoute,

        ListModule,
        CriteriaCreateUpdateModule, // Modulo del modal
        BreadcrumbsModule,
        // ================================= Fina de la configuracion del thema ========================

        Ng5SliderModule,

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
    declarations: [GearCriteriaComponent]
})
export class GeargatewayGearCriteriaModule {}
