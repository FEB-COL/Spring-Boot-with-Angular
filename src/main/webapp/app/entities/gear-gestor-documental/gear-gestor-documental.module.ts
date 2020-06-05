import { NgModule } from '@angular/core';
import { GearGestorDocumentalComponent } from './gear-gestor-documental.component';
import { gearGestorDocumentalRoute } from './gear-gestor-documental.route';
/** Implementacion del nuevo tema */
import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from './../../core/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../shared/list/list.module';
import { MaterialModule } from '../../shared/material-components.module';
import { CustomerCreateUpdateModule } from './modalsDomains/customer-create-update.module';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
    imports: [
        // configuracion para el nuevo thema
        CommonModule,
        FormsModule,
        MaterialModule,

        // Componente de Ruteo
        gearGestorDocumentalRoute,

        ListModule,
        CustomerCreateUpdateModule,
        BreadcrumbsModule,
        // Fina de la configuracion del thema

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

        ReactiveFormsModule,
        BrowserAnimationsModule,
        ServiceWorkerModule
        //  =================================  End Implementar Alertas ==============================
    ],
    declarations: [GearGestorDocumentalComponent]
})
export class GeargatewayGestorDocumentalModule {}
