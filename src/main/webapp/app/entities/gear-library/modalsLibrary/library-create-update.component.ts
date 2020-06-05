import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IGearDomain } from 'app/shared/model/gear-domain.model';

@Component({
    selector: 'fury-library-create-update',
    templateUrl: './library-create-update.component.html',
    styleUrls: ['./library-create-update.component.scss']
})
export class LibraryCreateUpdateComponent implements OnInit {
    form: FormGroup;
    mode: 'create' | 'update' = 'create';

    // Son variables definidas por jhipster para la cracion de Dominios.
    isSaving: boolean;

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<LibraryCreateUpdateComponent>,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.isSaving = false; // inicio de variable false por jhipster.
        if (this.defaults) {
            this.mode = 'update';
        } else {
            this.defaults = {} as IGearDomain;
        }

        this.form = this.fb.group({
            name: this.defaults.name || ''
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

    private onSaveSuccess() {
        this.isSaving = false;
        // this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    // Crear
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
