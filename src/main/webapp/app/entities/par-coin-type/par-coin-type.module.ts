import { NgModule } from '@angular/core';
import { ParCoinTypeComponent, parCoinTypeRoute } from './';

import 'hammerjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from 'app/core/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'app/shared/list/list.module';
import { MaterialModule } from 'app/shared/material-components.module';
import { CoinTypeCreateUpdateModule } from './modalsCoinTypes/coin-type-create-update.module';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

@NgModule({
    imports: [
        // configuracion para el nuevo thema
        CommonModule,
        FormsModule,
        MaterialModule,

        // Componente de Ruteo
        parCoinTypeRoute,

        ListModule,
        CoinTypeCreateUpdateModule,
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
    declarations: [ParCoinTypeComponent]
})
export class GeargatewayParCoinTypeModule {}
