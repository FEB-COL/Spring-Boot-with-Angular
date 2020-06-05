import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
// import { Customer } from './customer.model';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IGearDomain } from 'app/shared/model/gear-domain.model';
import { GearDomainService } from 'app/entities/gear-domain';
import { IGearGoalsStrategyAE } from 'app/shared/model/gear-goals-strategy-ae.model';

@Component({
    selector: 'fury-customer-create-update',
    templateUrl: './goals-strategy-create-update.component.html',
    styleUrls: ['./goals-strategy-create-update.component.scss']
})
export class GoalsStrategyCreateUpdateComponent implements OnInit {
    form: FormGroup;
    mode: 'create' | 'update' = 'create';

    // Son variables definidas por jhipster para la cracion de Dominios.
    isSaving: boolean;

    // ============= LocalStorage Unidad organizacional =========================
    idUnitLocalStorage: any = localStorage.getItem('key1');
    // ==========================================================================

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<GoalsStrategyCreateUpdateComponent>,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.isSaving = false; // inicio de variable false por jhipster.
        if (this.defaults) {
            this.mode = 'update';
        } else {
            this.defaults = {} as IGearGoalsStrategyAE;
        }

        this.form = this.fb.group({
            name: this.defaults.name || '',
            drescription: this.defaults.drescription || '',
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
        this.form.value.gearOrganizationalUnitId = this.idUnitLocalStorage;

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
