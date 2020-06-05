import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { PortfolioCreateUpdateComponent } from './portfolio-create-update.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

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

        //  =================================  Start Implementar Alertas ===============================
        [SweetAlert2Module.forRoot()],
        [
            SweetAlert2Module.forRoot({
                buttonsStyling: false,
                customClass: 'modal-content',
                confirmButtonClass: 'btn btn-primary',
                cancelButtonClass: 'btn'
            })
        ],
        //=> In submodules only:
        [SweetAlert2Module]
        //  =================================  End Implementar Alertas ===============================
    ],
    declarations: [PortfolioCreateUpdateComponent],
    entryComponents: [PortfolioCreateUpdateComponent],
    exports: [PortfolioCreateUpdateComponent]
})
export class PortfolioCreateUpdateModule {}
