import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
// import { Customer } from './customer.model';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IGearDomain } from 'app/shared/model/gear-domain.model';
import { GearDomainService } from 'app/entities/gear-domain';
import { IParLicenceType } from 'app/shared/model/par-licence-type.model';

@Component({
    selector: 'fury-customer-create-update',
    templateUrl: './licence-type-create-update.component.html',
    styleUrls: ['./licence-type-create-update.component.scss']
})
export class LicenceTypeCreateUpdateComponent implements OnInit {
    // static id = 100;

    form: FormGroup;
    mode: 'create' | 'update' = 'create';

    // Son variables definidas por jhipster para la cracion de Dominios.
    // gearDomain: IGearDomain;
    isSaving: boolean;

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<LicenceTypeCreateUpdateComponent>,
        private fb: FormBuilder // private gearDomainService: GearDomainService // constructor definido por jhipster
    ) {}

    ngOnInit() {
        this.isSaving = false; // inicio de variable false por jhipster.
        if (this.defaults) {
            this.mode = 'update';
        } else {
            this.defaults = {} as IParLicenceType;
        }
        // =============  Campos del formulario para guiardar ===========
        this.form = this.fb.group({
            name: this.defaults.name || '',
            description: this.defaults.description || ''
        });
    }
    // =========== consulta la variable mode cargada por el boton
    save() {
        if (this.mode === 'create') {
            this.createCustomer();
        } else if (this.mode === 'update') {
            this.updateCustomer();
        }
    }

    private onSaveSuccess() {
        this.isSaving = false;
        // this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    // Crear Tipo de documento
    createCustomer() {
        const customer = this.form.value;
        this.dialogRef.close(customer);
    }

    updateCustomer() {
        const customer = this.form.value;
        customer.id = this.defaults.id;

        this.dialogRef.close(customer);
    }

    isCreateMode() {
        return this.mode === 'create';
    }

    isUpdateMode() {
        return this.mode === 'update';
    }
}
