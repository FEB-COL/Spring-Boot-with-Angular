import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IGearDomain } from 'app/shared/model/gear-domain.model';
import { JhiAlertService } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';
import { GearOrganizationalUnitService } from 'app/entities/gear-organizational-unit';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IGearOrganizationalUnit } from 'app/shared/model/gear-organizational-unit.model';

@Component({
    selector: 'fury-customer-create-update',
    templateUrl: './customer-create-update.component.html',
    styleUrls: ['./customer-create-update.component.scss']
})
export class CustomerCreateUpdateComponent implements OnInit {
    gearOrganizationals: IGearOrganizationalUnit[]; // variable para el valor de la relacion
    gearUnits: any; // donde se alamcena el valor
    defaultSelect: string; // variable que toma el valor que tiene antes de modificar.
    initDefaultSelect: string; // variabl para iniccializar el label
    isSaving: boolean;

    form: FormGroup;
    mode: 'create' | 'update' = 'create';

    // ============= LocalStorage Unidad organizacional =========================
    idUnitLocalStorage: any = localStorage.getItem('key1');
    // ==========================================================================

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<CustomerCreateUpdateComponent>,
        private fb: FormBuilder,
        private unitService: GearOrganizationalUnitService,
        private jhiAlertService: JhiAlertService,
        private route: ActivatedRoute
    ) {
        // variable para el label
        this.initDefaultSelect = 'Seleccione Unidad Organizacional';
    }

    ngOnInit() {
        this.isSaving = false; // inicio de variable false por jhipster.
        if (this.defaults) {
            this.mode = 'update';
        } else {
            this.defaults = {} as IGearDomain;
        }

        this.defaultSelect = this.defaults.gearOrganizationalUnitName; // se asigna variable que toma para la modificacion
        this.form = this.fb.group({
            name: this.defaults.name || '',
            gearOrganizationalUnitId: this.defaults.gearOrganizationalUnitId || '',
            gearOrganizationalUnitName: this.defaults.gearOrganizationalUnitName || ''
        });

        // ===== Staer Carga valores de dominios en el actualizar =========================
        this.unitService.query().subscribe(
            (res: HttpResponse<IGearOrganizationalUnit[]>) => {
                this.gearOrganizationals = res.body;
                //cargamos los valores
                this.form = this.fb.group({
                    name: this.defaults.name || '',
                    gearOrganizationalUnitId: this.defaults.gearOrganizationalUnitId || '',
                    gearOrganizationalUnitName: this.defaults.gearOrganizationalUnitName || ''
                });
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        // ===== End Carga valores de dominios en el actualizar =========================
    }

    // consulta la variable mode cargada por el boton
    save() {
        if (this.mode === 'create') {
            this.createCustomer();
        } else if (this.mode === 'update') {
            this.updateCustomer();
        }
    }

    // Crear dominio
    createCustomer() {
        // ============== Guardado con Unidad Organizacional ======================
        this.form.value.gearOrganizationalUnitId = this.idUnitLocalStorage;
        // ============== Guardado con Unidad Organizacional ======================

        const customer = this.form.value;
        this.dialogRef.close(customer);
    }

    updateCustomer() {
        // ============ Start Condicion el actualizar del select  ============================
        if (this.gearUnits) {
            this.form.value.gearOrganizationalUnitId = this.idUnitLocalStorage;
        } else {
            this.form.value.gearOrganizationalUnitName = this.defaults.gearOrganizationalUnitName;
            this.form.value.gearOrganizationalUnitId = this.defaults.gearOrganizationalUnitId;
        }
        // ============ End Condicion el actualizar del select  ============================

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

    //esta es para el llamado de Error al traer los dominios
    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
