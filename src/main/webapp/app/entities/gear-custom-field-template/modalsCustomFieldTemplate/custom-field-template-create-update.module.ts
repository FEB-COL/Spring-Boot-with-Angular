import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { CustomFieldTemplateCreateUpdateComponent } from './custom-field-template-create-update.component';
import { MatChipsModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatRadioModule,
        MatSelectModule,

        MatChipsModule
    ],
    declarations: [CustomFieldTemplateCreateUpdateComponent],
    entryComponents: [CustomFieldTemplateCreateUpdateComponent],
    exports: [CustomFieldTemplateCreateUpdateComponent]
})
export class CustomFieldTemplateCreateUpdateModule {}
