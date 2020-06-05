import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IParSystemType } from 'app/shared/model/par-system-type.model';

@Component({
    selector: 'fury-customer-create-update',
    templateUrl: './system-type-create-update.component.html',
    styleUrls: ['./system-type-create-update.component.scss']
})
export class SystemTypeCreateUpdateComponent implements OnInit {
    form: FormGroup;
    mode: 'create' | 'update' = 'create';

    /** variable definida por jhipster para la cracion */
    isSaving: boolean;

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<SystemTypeCreateUpdateComponent>,
        private fb: FormBuilder // constructor definido por jhipster
    ) {}

    ngOnInit() {
        this.isSaving = false; // inicio de variable false por jhipster.
        if (this.defaults) {
            this.mode = 'update';
        } else {
            this.defaults = {} as IParSystemType;
        }

        this.form = this.fb.group({
            name: this.defaults.name || '',
            description: this.defaults.description || ''
        });
    }
    // consulta la variable mode cargada por el boton
    save() {
        if (this.mode === 'create') {
            this.createCustomer();
        } else if (this.mode === 'update') {
            this.updateCustomer();
        }
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
