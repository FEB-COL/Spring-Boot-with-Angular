/**
 * Module.ts -> donde se declaran los modulos a utilizar
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../core/breadcrumbs/breadcrumbs.module';
import { FuryCardModule } from '../../shared/card/card.module';
import { MaterialModule } from '../../shared/material-components.module';
// import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';

@NgModule({
    imports: [
        CommonModule, // algo
        // TestRoutingModule, // Ruta
        ReactiveFormsModule,
        MaterialModule,
        BreadcrumbsModule,
        FuryCardModule
    ],
    declarations: [TestComponent],
    exports: []
})
export class TestModule {}
