import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { formatDate } from '@angular/common';
import { IGearValueChainCategory } from 'app/shared/model/gear-value-chain-category.model';

@Component({
    selector: 'fury-customer-create-update',
    templateUrl: './category-create-update.component.html',
    styleUrls: ['./category-create-update.component.scss']
})
export class CategoryCreateUpdateComponent implements OnInit {
    form: FormGroup;
    mode: 'create' | 'update' = 'create';

    // Son variables definidas por jhipster para la cracion de Dominios.
    isSaving: boolean;
    colores: any;

    // ============= LocalStorage Unidad organizacional =========================
    idUnitLocalStorage: any = localStorage.getItem('key1');
    // ==========================================================================

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<CategoryCreateUpdateComponent>,
        private fb: FormBuilder
    ) {
        this.colores = [
            { color: 'Rojo', id: '#f90505' },
            { color: 'Azul', id: '#0545f9' },
            { color: 'Verde', id: '#05f945' },
            { color: 'Naranja', id: '#f98c05' }
        ];
    }

    ngOnInit() {
        this.isSaving = false; // inicio de variable false por jhipster.
        if (this.defaults) {
            this.mode = 'update';
        } else {
            this.defaults = {} as IGearValueChainCategory;
        }

        this.form = this.fb.group({
            name: this.defaults.name || '',
            decription: this.defaults.decription || '',
            color: this.defaults.color || '',
            gearOrganizationalUnitId: this.defaults.gearOrganizationalUnitId || '',
            gearOrganizationalUnitName: this.defaults.gearOrganizationalUnitName || ''
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

    // Crear
    createCustomer() {
        // =============== Guardado con Unidad Organizacional ===================
        this.form.value.gearOrganizationalUnitId = this.idUnitLocalStorage;
        // =============== Guardado con Unidad Organizacional ===================

        const customer = this.form.value;
        console.log('Valor', customer);
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
