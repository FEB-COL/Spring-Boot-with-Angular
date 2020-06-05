import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { MaterialModule } from '../../shared/material-components.module';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';

@NgModule({
    imports: [CommonModule, EditorRoutingModule, MaterialModule, QuillModule],
    declarations: [EditorComponent]
})
export class EditorModule {}
