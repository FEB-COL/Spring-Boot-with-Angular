import { NgModule } from '@angular/core';

import { gearDiagramaRoute } from './diagrama-estrategia.route';

import { GearSmartStrategyAEService } from 'app/entities/gear-smart-strategy-ae';
import { GearGoalsStrategyAEService } from 'app/entities/gear-goals-strategy-ae';
import { VisModule } from 'ngx-vis';
import { DiagramaEstrategiaComponent } from './diagrama-estrategia.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'app/shared/material-components.module';
import { ListModule } from 'app/shared/list/list.module';
import { GearDecisionCreateUpdateModule } from 'app/entities/gear-decision/modalsDecision/gear-decision-create-update.module';
import { BreadcrumbsModule } from 'app/core/breadcrumbs/breadcrumbs.module';
@NgModule({
    imports: [
        // configuracion para el nuevo thema
        CommonModule,
        FormsModule,
        MaterialModule,

        ListModule,
        GearDecisionCreateUpdateModule, // Modulo del modal
        BreadcrumbsModule,
        // Fina de la configuracion del thema

        gearDiagramaRoute,
        VisModule
    ],
    declarations: [DiagramaEstrategiaComponent],
    providers: [GearSmartStrategyAEService, GearGoalsStrategyAEService],
    exports: [DiagramaEstrategiaComponent]
})
export class GearDiagramaModule {}
