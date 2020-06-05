import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { SystemTypeCreateUpdateComponent } from './system-type-create-update.component';

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
        MatSelectModule
    ],
    declarations: [SystemTypeCreateUpdateComponent],
    entryComponents: [SystemTypeCreateUpdateComponent],
    exports: [SystemTypeCreateUpdateComponent]
})
export class SystemTypeCreateUpdateModule {}
