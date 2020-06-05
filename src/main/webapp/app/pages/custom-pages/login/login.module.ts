import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/material-components.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { GeargatewaySharedModule } from 'app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        // LoginRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        // para fomularios
        FormsModule,
        GeargatewaySharedModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule {}
