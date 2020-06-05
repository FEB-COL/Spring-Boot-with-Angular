import { NgModule } from '@angular/core';
import { GearDomainComponent, gearDomainRoute } from './';

/** Implementacion del nuevo tema */
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from './../../core/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../shared/list/list.module';
import { MaterialModule } from '../../shared/material-components.module';
import { CustomerCreateUpdateModule } from './modalsDomains/customer-create-update.module';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

@NgModule({
    imports: [
        // configuracion para el nuevo thema
        CommonModule,
        FormsModule,
        MaterialModule,

        // Componente de Ruteo
        gearDomainRoute,

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
        [SweetAlert2Module]
        //  =================================  End Implementar Alertas ==============================
    ],
    declarations: [GearDomainComponent]
})
export class GeargatewayGearDomainModule {}
