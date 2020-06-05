import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../core/breadcrumbs/breadcrumbs.module';
import { FuryCardModule } from '../../shared/card/card.module';
import { MaterialModule } from '../../shared/material-components.module';
import { IconsRoutingModule } from './icons-routing.module';
import { IconsComponent } from './icons.component';

@NgModule({
    imports: [CommonModule, IconsRoutingModule, ReactiveFormsModule, MaterialModule, BreadcrumbsModule, FuryCardModule],
    declarations: [IconsComponent]
})
export class IconsModule {}
