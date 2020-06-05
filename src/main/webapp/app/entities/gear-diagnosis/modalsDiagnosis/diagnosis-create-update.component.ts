import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IGearDiagnosisType } from 'app/shared/model/gear-diagnosis-type.model';
import { IGearDiagnosis } from 'app/shared/model/gear-diagnosis.model';
import { GearDiagnosisTypeService } from 'app/entities/gear-diagnosis-type';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'fury-customer-create-update',
    templateUrl: './diagnosis-create-update.component.html',
    styleUrls: ['./diagnosis-create-update.component.scss']
})
export class DiagnosisCreateUpdateComponent implements OnInit {
    // ======================= Start  Variables Iniciales ======================
    geardiagnosticsTypes: IGearDiagnosisType[]; // variable para el valor de la relacion
    geardiagnosisType: any; // donde se alamcena el valor
    defaultSelect: string; // variable que toma el valor que tiene antes de modificar.
    initDefaultSelect: string; // variabl para iniccializar el label
    isSaving: boolean;

    form: FormGroup;
    mode: 'create' | 'update' = 'create';

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<DiagnosisCreateUpdateComponent>,
        private fb: FormBuilder,
        private diagnosisTypeService: GearDiagnosisTypeService,
        private jhiAlertService: JhiAlertService
    ) {
        // variable para el label
        this.initDefaultSelect = 'Seleccione Tipo Diagnostico';
    }

    ngOnInit() {
        this.isSaving = false; // inicio de variable false por jhipster.
        if (this.defaults) {
            this.mode = 'update';
        } else {
            this.defaults = {} as IGearDiagnosis;
        }

        this.defaultSelect = this.defaults.gearDiagnosisTypeName; // se asigna variable que toma para la modificacion

        this.form = this.fb.group({
            name: this.defaults.name || '',
            description: this.defaults.description || '',
            // creationDate: this.defaults.creationDate || '',
            // levelMaturity: this.defaults.levelMaturity || '',
            gearDiagnosisTypeId: this.defaults.gearDiagnosisTypeId || '',
            gearDiagnosisTypeName: this.defaults.gearDiagnosisTypeName || ''
        });

        //////////////////////////////////////////////////////////////////////////////////////////
        // esta parte se llama los valores guardados de los sistemas de Informacion

        this.diagnosisTypeService.query().subscribe(
            (res: HttpResponse<IGearDiagnosisType[]>) => {
                this.geardiagnosticsTypes = res.body;
                // cargamos los valores del formulario
                this.form = this.fb.group({
                    name: this.defaults.name || '',
                    description: this.defaults.description || '',
                    // creationDate: this.defaults.creationDate || '',
                    // levelMaturity: this.defaults.levelMaturity || '',
                    gearDiagnosisTypeId: this.defaults.gearDiagnosisTypeId || '',
                    gearDiagnosisTypeName: this.defaults.gearDiagnosisTypeName || ''
                });
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        //////////////////////////////////////////////////////////////////////////////////////////

        // ============ Start Condicion para validar  el label del select ============================
        if (this.mode === 'create') {
            this.defaultSelect = this.initDefaultSelect;
        } else {
            this.defaultSelect = this.defaults.gearDiagnosisTypeName; // se asigna variable que toma para la modificacion
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
        this.form.value.gearDiagnosisTypeName = this.geardiagnosisType.name;
        this.form.value.gearDiagnosisTypeId = this.geardiagnosisType.id;

        const customer = this.form.value;
        this.dialogRef.close(customer);
    }

    updateCustomer() {
        // ============ Start Condicion el actualizar del select  ============================
        if (this.geardiagnosisType) {
            this.form.value.gearDiagnosisTypeName = this.geardiagnosisType.name;
            this.form.value.gearDiagnosisTypeId = this.geardiagnosisType.id;
        } else {
            this.form.value.gearDiagnosisTypeName = this.defaults.gearDiagnosisTypeName;
            this.form.value.gearDiagnosisTypeId = this.defaults.gearDiagnosisTypeId;
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

    // Esta es para el llamado de Error al traer los dominios
    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
