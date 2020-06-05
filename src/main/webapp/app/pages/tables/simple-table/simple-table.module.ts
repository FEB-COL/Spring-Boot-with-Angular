import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../core/breadcrumbs/breadcrumbs.module';
import { MaterialModule } from '../../../shared/material-components.module';
import { SimpleTableRoutingModule } from './simple-table-routing.module';
import { SimpleTableComponent } from './simple-table.component';

@NgModule({
    imports: [CommonModule, FormsModule, SimpleTableRoutingModule, MaterialModule, BreadcrumbsModule],
    declarations: [SimpleTableComponent]
})
export class SimpleTableModule {}
