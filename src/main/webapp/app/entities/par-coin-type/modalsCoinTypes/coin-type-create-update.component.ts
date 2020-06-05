import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IParCoinType } from 'app/shared/model/par-coin-type.model';

@Component({
    selector: 'fury-customer-create-update',
    templateUrl: './coin-type-create-update.component.html',
    styleUrls: ['./coin-type-create-update.component.scss']
})
export class CoinTypeCreateUpdateComponent implements OnInit {
    form: FormGroup;
    mode: 'create' | 'update' = 'create';

    // Son variables definidas por jhipster para la cracion .
    isSaving: boolean;

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<CoinTypeCreateUpdateComponent>,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.isSaving = false; // inicio de variable false por jhipster.
        if (this.defaults) {
            this.mode = 'update';
        } else {
            this.defaults = {} as IParCoinType;
        }

        // =============  Campos del formulario para guiardar ===========
        this.form = this.fb.group({
            name: this.defaults.name || '',
            description: this.defaults.description || ''
        });
    }
    /** ========== consulta la variable mode cargada por el boton ============= */
    save() {
        if (this.mode === 'create') {
            this.createCustomer();
        } else if (this.mode === 'update') {
            this.updateCustomer();
        }
    }

    /** Crear */
    createCustomer() {
        const customer = this.form.value;
        this.dialogRef.close(customer);
    }

    /** Actualizar */
    updateCustomer() {
        const customer = this.form.value;
        customer.id = this.defaults.id;

        this.dialogRef.close(customer);
    }

    /** Modo Creación*/
    isCreateMode() {
        return this.mode === 'create';
    }

    /** Modo Actualización*/
    isUpdateMode() {
        return this.mode === 'update';
    }
}
