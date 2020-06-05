import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IGearInformationSystems } from 'app/shared/model/gear-information-systems.model';
import { ParCoinTypeService } from 'app/entities/par-coin-type';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IParCoinType } from 'app/shared/model/par-coin-type.model';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'fury-customer-create-update',
    templateUrl: './information-system-create-update.component.html',
    styleUrls: ['./information-system-create-update.component.scss']
})
export class InformationSystemCreateUpdateComponent implements OnInit {
    parCoinTypes: IParCoinType[];
    coinType: any; // donde se alamcena el valor
    defaultSelect: string; // variable que toma el valor que tiene antes de modificar.
    initDefaultSelect: string; // variabl para iniccializar el label

    form: FormGroup;
    mode: 'create' | 'update' = 'create';

    // Son variables definidas por jhipster para la cracion de Dominios.
    isSaving: boolean;

    // ============= LocalStorage Unidad organizacional =========================
    idUnitLocalStorage: any = localStorage.getItem('key1');
    // ==========================================================================

    // =================Ejemeplo de Validacionde Email=================
    emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    // =================Ejemeplo de Validacionde Email=================

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<InformationSystemCreateUpdateComponent>,
        private fb: FormBuilder,
        private coinTypeService: ParCoinTypeService,
        private jhiAlertService: JhiAlertService
    ) {
        // variable para el label
        this.initDefaultSelect = 'Seleccione Tipo de Moneda';
    }

    ngOnInit() {
        this.isSaving = false; // inicio de variable false por jhipster.
        if (this.defaults) {
            this.mode = 'update';
        } else {
            this.defaults = {} as IGearInformationSystems;
        }

        this.form = this.fb.group({
            name: this.defaults.name || '',
            description: this.defaults.description || '',
            version: this.defaults.version || '',
            // acquisitionDate: this.defaults.acquisitionDate || '',
            // startDate: this.defaults.startDate || '',
            responsible: this.defaults.responsible || '',
            responsibleEmail: this.defaults.responsibleEmail || '',

            // responsibleEmail: [ this.defaults.responsibleEmail, Validators.required, Validators.email],
            // // emailDos: this.defaults.emailDos || '' || [Validators.required, Validators.email],

            provider: this.defaults.provider || '',
            initialCost: this.defaults.initialCost || '',
            mainteinanceCost: this.defaults.mainteinanceCost || '',
            gearOrganizationalUnitId: this.defaults.gearOrganizationalUnitId || '',
            gearOrganizationalUnitName: this.defaults.gearOrganizationalUnitName || '',
            parCoinTypeId: this.defaults.parCoinTypeId || '',
            parCoinTypeName: this.defaults.parCoinTypeName || ''
            // creationDate: this.defaults.creationDate || '',
            // modifyDate: this.defaults.modifyDate || ''
        });

        this.coinTypeService.query().subscribe(
            (res: HttpResponse<IParCoinType[]>) => {
                this.parCoinTypes = res.body;

                this.form = this.fb.group({
                    name: this.defaults.name || '',
                    description: this.defaults.description || '',
                    version: this.defaults.version || '',
                    // acquisitionDate: this.defaults.acquisitionDate || '',
                    // startDate: this.defaults.startDate || '',
                    responsible: this.defaults.responsible || '',
                    responsibleEmail: this.defaults.responsibleEmail || '',
                    provider: this.defaults.provider || '',
                    initialCost: this.defaults.initialCost || '',
                    mainteinanceCost: this.defaults.mainteinanceCost || '',
                    gearOrganizationalUnitId: this.defaults.gearOrganizationalUnitId || '',
                    gearOrganizationalUnitName: this.defaults.gearOrganizationalUnitName || '',
                    parCoinTypeId: this.defaults.parCoinTypeId || '',
                    parCoinTypeName: this.defaults.parCoinTypeName || ''
                    // creationDate: this.defaults.creationDate || '',
                    // modifyDate: this.defaults.modifyDate || ''
                });
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        // ============ Start Condicion para validar  el label del select ============================
        if (this.mode === 'create') {
            this.defaultSelect = this.initDefaultSelect;
        } else {
            this.defaultSelect = this.defaults.parCoinTypeName; // se asigna variable que toma para la modificacion
        }
        // ============ End Condicion para validar  el label del select ============================
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
        // ============== Guardado con Unidad Organizacional ======================
        this.form.value.gearOrganizationalUnitId = this.idUnitLocalStorage;
        // ============== Guardado con Unidad Organizacional ======================

        // this.form.value.responsibleEmail = this.emailFormControl;

        // =================== Guardar tipo de Moneda ====================
        this.form.value.parCoinTypeName = this.coinType.name;
        this.form.value.parCoinTypeId = this.coinType.id;
        // =================== Guardar tipo de Moneda ====================

        const customer = this.form.value;
        this.dialogRef.close(customer);
    }

    updateCustomer() {
        // ============ Start Condicion el actualizar select Tipo de Moneda ============================
        if (this.coinType) {
            this.form.value.parCoinTypeName = this.coinType.name;
            this.form.value.parCoinTypeId = this.coinType.id;
        } else {
            this.form.value.parCoinTypeName = this.defaults.parCoinTypeName;
            this.form.value.parCoinTypeId = this.defaults.parCoinTypeId;
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

    // esta es para el llamado de Error al traer los dominios
    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
