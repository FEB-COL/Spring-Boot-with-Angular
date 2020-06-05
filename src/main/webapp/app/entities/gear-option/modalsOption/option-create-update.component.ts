import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';
import { IGearDecision } from 'app/shared/model/gear-decision.model';
import { IGearOption } from 'app/shared/model/gear-option.model';
import { GearDecisionService } from 'app/entities/gear-decision';

@Component({
    selector: 'fury-customer-create-update',
    templateUrl: './option-create-update.component.html',
    styleUrls: ['./option-create-update.component.scss']
})
export class OptionCreateUpdateComponent implements OnInit {
    // ======================= Start  Variables Iniciales ======================
    gearDecisions: IGearDecision[]; // variable para el valor de la relacion
    geardecision: any; // donde se alamcena el valor
    defaultSelect: string; // variable que toma el valor que tiene antes de modificar.
    initDefaultSelect: string; // variabl para iniccializar el label
    isSaving: boolean;

    form: FormGroup;
    mode: 'create' | 'update' = 'create';

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<OptionCreateUpdateComponent>,
        private fb: FormBuilder, // private gearDomainService: GearDomainService // constructor definido por jhipster
        private decisionService: GearDecisionService,
        private jhiAlertService: JhiAlertService,
        private route: ActivatedRoute
    ) {
        // variable para el label
        this.initDefaultSelect = 'Seleccione Decisión';
    }

    ngOnInit() {
        this.isSaving = false; // inicio de variable false por jhipster.
        if (this.defaults) {
            this.mode = 'update';
        } else {
            this.defaults = {} as IGearOption;
        }

        this.defaultSelect = this.defaults.geardecisionName; // se asigna variable que toma para la modificacion
        // =============  Campos del formulario para guardar ===========
        this.form = this.fb.group({
            name: this.defaults.name || '',
            description: this.defaults.description || '',
            geardecisionId: this.defaults.geardecisionId || '',
            geardecisionName: this.defaults.geardecisionName || ''
        });

        // ===== Start Carga valores de dominios en el actualizar =========================
        this.decisionService.query().subscribe(
            (res: HttpResponse<IGearDecision[]>) => {
                this.gearDecisions = res.body;
                //cargamos los valores
                this.form = this.fb.group({
                    name: this.defaults.name || '',
                    description: this.defaults.description || '',
                    geardecisionId: this.defaults.geardecisionId || '',
                    geardecisionName: this.defaults.geardecisionName || ''
                });
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        // ===== End Carga valores de dominios en el actualizar =========================

        // ============ Start Condicion para validar  el label del select ============================
        if (this.mode === 'create') {
            this.defaultSelect = this.route.snapshot.queryParams['nameDecision'];
        } else {
            this.defaultSelect = this.defaults.geardecisionName; // se asigna variable que toma para la modificacion
        }
        // ============ End Condicion para validar  el label del select ============================
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
        this.form.value.geardecisionName = this.route.snapshot.queryParams['nameDecision'];
        this.form.value.geardecisionId = this.route.snapshot.queryParams['idDecision'];

        const customer = this.form.value;
        this.dialogRef.close(customer);
    }

    updateCustomer() {
        // ============ Start Condicion el actualizar del select  ============================
        if (this.geardecision) {
            this.form.value.geardecisionName = this.route.snapshot.queryParams['nameDecision'];
            this.form.value.geardecisionId = this.route.snapshot.queryParams['idDecision'];
        } else {
            this.form.value.geardecisionName = this.defaults.geardecisionName;
            this.form.value.geardecisionId = this.defaults.geardecisionId;
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
