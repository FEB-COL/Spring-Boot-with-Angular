import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SortablejsModule } from 'angular-sortablejs';
import { MaterialModule } from '../../shared/material-components.module';
import { ScrollbarModule } from '../../shared/scrollbar/scrollbar.module';
import { DragAndDropRoutingModule } from './drag-and-drop-routing.module';
import { DragAndDropComponent } from './drag-and-drop.component';

@NgModule({
    imports: [CommonModule, DragAndDropRoutingModule, MaterialModule, ReactiveFormsModule, SortablejsModule, ScrollbarModule],
    declarations: [DragAndDropComponent]
})
export class DragAndDropModule {}
