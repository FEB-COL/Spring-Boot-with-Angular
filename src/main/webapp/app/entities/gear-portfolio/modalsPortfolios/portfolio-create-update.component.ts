import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IGearPortfolio } from 'app/shared/model/gear-portfolio.model';

@Component({
    selector: 'fury-customer-create-update',
    templateUrl: './portfolio-create-update.component.html',
    styleUrls: ['./portfolio-create-update.component.scss']
})
export class PortfolioCreateUpdateComponent implements OnInit {
    form: FormGroup;
    mode: 'create' | 'update' = 'create';

    // Son variables definidas por jhipster para la cracion
    isSaving: boolean;

    // ============= LocalStorage Unidad organizacional =========================
    idUnitLocalStorage: any = localStorage.getItem('key1');
    // ==========================================================================

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<PortfolioCreateUpdateComponent>,
        private fb: FormBuilder // private gearDomainService: GearDomainService // constructor definido por jhipster
    ) {}

    ngOnInit() {
        this.isSaving = false; // inicio de variable false por jhipster.
        if (this.defaults) {
            this.mode = 'update';
        } else {
            this.defaults = {} as IGearPortfolio;
        }

        // =============  Campos del formulario para guardar ===========
        this.form = this.fb.group({
            name: this.defaults.name || '',
            description: this.defaults.description || '',
            gearOrganizationalUnitId: this.defaults.gearOrganizationalUnitId || '',
            gearOrganizationalUnitName: this.defaults.gearOrganizationalUnitName || ''
            // startDate: this.defaults.startDate || '',
            // createdBy: this.defaults.createdBy || '',
            // creationDate: this.defaults.creationDate || '',
            // lastModifiedBy: this.defaults.lastModifiedBy || '',
            // lastModifiedDate: this.defaults.lastModifiedDate || ''
        });
    }

    // ========== consulta la variable mode cargada por el boton =============
    save() {
        if (this.mode === 'create') {
            this.createCustomer();
        } else if (this.mode === 'update') {
            this.updateCustomer();
        }
    }

    // Crear
    createCustomer() {
        // ========================= Guardar en la Unidad ======================
        this.form.value.gearOrganizationalUnitId = this.idUnitLocalStorage;
        // =====================================================================

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
