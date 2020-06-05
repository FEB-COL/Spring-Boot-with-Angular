import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../core/breadcrumbs/breadcrumbs.module';
import { FuryCardModule } from '../../../shared/card/card.module';
import { HighlightModule } from '../../../shared/highlightjs/highlight.module';
import { MaterialModule } from '../../../shared/material-components.module';
import { FormElementsRoutingModule } from './form-elements-routing.module';
import { FormElementsComponent } from './form-elements.component';

@NgModule({
    imports: [
        CommonModule,
        FormElementsRoutingModule,
        MaterialModule,
        ReactiveFormsModule,

        // Core
        HighlightModule,
        FuryCardModule,
        BreadcrumbsModule
    ],
    declarations: [FormElementsComponent]
})
export class FormElementsModule {}
