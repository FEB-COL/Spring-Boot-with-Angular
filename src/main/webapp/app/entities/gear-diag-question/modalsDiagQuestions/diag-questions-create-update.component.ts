import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IGearDiagnosis } from 'app/shared/model/gear-diagnosis.model';
import { JhiAlertService } from 'ng-jhipster';
import { IGearDiagQuestion } from 'app/shared/model/gear-diag-question.model';
import { GearDiagnosisService } from 'app/entities/gear-diagnosis';
import { IGearAmbit } from 'app/shared/model/gear-ambit.model';
import { GearAmbitService } from 'app/entities/gear-ambit';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'fury-customer-create-update',
    templateUrl: './diag-questions-create-update.component.html',
    styleUrls: ['./diag-questions-create-update.component.scss']
})
export class DiagQuestionsCreateUpdateComponent implements OnInit {
    // ======================= Start  Variables Iniciales ======================
    geardiagnostics: IGearDiagnosis[]; // variable para el valor de la relacion
    geardiagnosis: any; // donde se alamcena el valor
    gearallambits: IGearAmbit[];
    gearambits: any;
    defaultSelect: string; // variable que toma el valor que tiene antes de modificar.
    defaultSelectTwo: string; // variable que toma el valor que tiene antes de modificar.
    initDefaultSelect: string; // variabl para iniccializar el label
    initDefaultSelectTwo: string; // variabl para iniccializar el label
    isSaving: boolean;

    form: FormGroup;
    mode: 'create' | 'update' = 'create';

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<DiagQuestionsCreateUpdateComponent>,
        private fb: FormBuilder, // private gearDomainService: GearDomainService // constructor definido por jhipster
        private diagnosisService: GearDiagnosisService,
        private ambitService: GearAmbitService,
        private jhiAlertService: JhiAlertService,
        private route: ActivatedRoute
    ) {
        // variable para el label
        this.initDefaultSelect = 'Seleccione Diagnóstico';
        this.initDefaultSelectTwo = 'Seleccione Ámbito';
    }

    ngOnInit() {
        console.log('tttttttttt', this.route.snapshot.queryParams);

        this.isSaving = false; // inicio de variable false por jhipster.
        if (this.defaults) {
            this.mode = 'update';
        } else {
            this.defaults = {} as IGearDiagQuestion;
        }

        this.defaultSelect = this.defaults.gearDiagnosisName; // se asigna variable que toma para la modificacion
        this.defaultSelectTwo = this.defaults.gearAmbitName; // se asigna variable que toma para la modificacion

        this.form = this.fb.group({
            name: this.defaults.name || '',
            description: this.defaults.description || '',
            // creationDate: this.defaults.creationDate || '',
            gearDiagnosisId: this.defaults.gearDiagnosisId || '',
            gearDiagnosisName: this.defaults.gearDiagnosisName || '',
            gearAmbitId: this.defaults.gearAmbitId || '',
            gearAmbitName: this.defaults.gearAmbitName || ''
        });

        //////////////////////////////////////////////////////////////////////////////////////////
        //esta parte se llama todo los valores guardados de los Dominios
        //////////////////////////////////////////////////////////////////////////////////////////
        this.diagnosisService.query().subscribe(
            (res: HttpResponse<IGearDiagnosis[]>) => {
                this.geardiagnostics = res.body;
                //cargamos los valores
                // this.form = this.fb.group({
                //     name: this.defaults.name || '',
                //     description: this.defaults.description || '',
                //     // creationDate: this.defaults.creationDate || '',
                //     gearDiagnosisId: this.defaults.gearDiagnosisId || '',
                //     gearDiagnosisName: this.defaults.gearDiagnosisName || '',
                //     gearAmbitId: this.defaults.gearAmbitId || '',
                //     gearAmbitName: this.defaults.gearAmbitName || ''
                // });
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.ambitService.query().subscribe(
            (res: HttpResponse<IGearAmbit[]>) => {
                this.gearallambits = res.body;
                //cargamos los valores
                // this.form = this.fb.group({
                //     name: this.defaults.name || '',
                //     description: this.defaults.description || '',
                //     // creationDate: this.defaults.creationDate || '',
                //     gearDiagnosisId: this.defaults.gearDiagnosisId || '',
                //     gearDiagnosisName: this.defaults.gearDiagnosisName || '',
                //     gearAmbitId: this.defaults.gearAmbitId || '',
                //     gearAmbitName: this.defaults.gearAmbitName || ''
                // });
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        //////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////

        // ============ Start Condicion para validar  el label del select ============================
        if (this.mode === 'create') {
            this.defaultSelect = this.route.snapshot.queryParams['nameDiagnosis'];
            this.defaultSelectTwo = this.initDefaultSelectTwo;
        } else {
            this.defaultSelect = this.defaults.gearDiagnosisName; // se asigna variable que toma para la modificacion
            this.defaultSelectTwo = this.defaults.gearAmbitName; // se asigna variable que toma para la modificacion
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

    // Crear Tipo de documento
    createCustomer() {
        this.form.value.gearDiagnosisId = this.route.snapshot.queryParams['idDiagnostico'];
        this.form.value.gearDiagnosisName = this.route.snapshot.queryParams['nameDiagnosis'];

        this.form.value.gearAmbitId = this.gearambits.id;
        this.form.value.gearAmbitName = this.gearambits.name;

        const customer = this.form.value;
        this.dialogRef.close(customer);
    }

    updateCustomer() {
        // ============ Start Condicion el actualizar del select  ============================
        if (this.geardiagnosis) {
            this.form.value.gearDiagnosisId = this.route.snapshot.queryParams['idDiagnostico'];
            this.form.value.gearDiagnosisName = this.route.snapshot.queryParams['nameDiagnosis'];

            this.form.value.gearAmbitId = this.gearambits.id;
            this.form.value.gearAmbitName = this.gearambits.name;
        } else {
            this.form.value.gearDiagnosisId = this.defaults.gearDiagnosisId;
            this.form.value.gearDiagnosisName = this.defaults.gearDiagnosisName;

            this.form.value.gearAmbitId = this.defaults.gearAmbitId;
            this.form.value.gearAmbitName = this.defaults.gearAmbitName;
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
