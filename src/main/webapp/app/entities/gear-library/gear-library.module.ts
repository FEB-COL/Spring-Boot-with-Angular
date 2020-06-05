import { NgModule } from '@angular/core';
import { GearLibraryComponent, gearLibraryRoute } from './';

/** Implementacion del nuevo tema */
import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from './../../core/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../shared/list/list.module';
import { MaterialModule } from '../../shared/material-components.module';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LibraryAuthorityDirective } from './LIbraryauthority.directive';

@NgModule({
    imports: [
        // =======  configuracion para el nuevo thema ==========
        CommonModule,
        FormsModule,
        MaterialModule,

        // Componente de Ruteo
        gearLibraryRoute,

        ListModule,
        BreadcrumbsModule,
        // ====== Fin de la configuracion del thema ===========

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
        [SweetAlert2Module],
        //  =================================  End Implementar Alertas ==============================

        ReactiveFormsModule,
        BrowserAnimationsModule,
        ServiceWorkerModule
    ],
    declarations: [
        GearLibraryComponent,

        // ========== Permisos ============
        LibraryAuthorityDirective // para validar mostrar componentes deacuerdo al perfil
        // ========== Permisos ============
    ]
})
export class GeargatewayGearLibraryModule {}
