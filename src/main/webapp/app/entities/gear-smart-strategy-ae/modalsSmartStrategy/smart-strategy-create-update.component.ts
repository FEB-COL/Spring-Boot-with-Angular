import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IGearGoalsStrategyAE } from 'app/shared/model/gear-goals-strategy-ae.model';
import { GearGoalsStrategyAEService } from 'app/entities/gear-goals-strategy-ae';
import { IGearSmartStrategyAE } from 'app/shared/model/gear-smart-strategy-ae.model';
import { JhiAlertService } from 'ng-jhipster';
import { IGearDomain } from 'app/shared/model/gear-domain.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'fury-customer-create-update',
    templateUrl: './smart-strategy-create-update.component.html',
    styleUrls: ['./smart-strategy-create-update.component.scss']
})
export class SmartStrategyCreateUpdateComponent implements OnInit {
    // ======================= Start  Variables Iniciales ======================
    gearGoalsStrategies: IGearGoalsStrategyAE[]; // variable para el valor de la relacion
    gearGoalsStrategy: any; // donde se alamcena el valor
    defaultSelect: string; // variable que toma el valor que tiene antes de modificar
    initDefaultSelect: string; // variabl para iniccializar el label
    isSaving: boolean;

    form: FormGroup;
    mode: 'create' | 'update' = 'create';

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<SmartStrategyCreateUpdateComponent>,
        private fb: FormBuilder, // private gearDomainService: GearDomainService // constructor definido por jhipster
        private gearGoalsStrategyAEService: GearGoalsStrategyAEService,
        private jhiAlertService: JhiAlertService,
        private route: ActivatedRoute
    ) {
        // variable para el label
        this.initDefaultSelect = 'Seleccione Estrategia';
    }

    ngOnInit() {
        console.log('888888', this.route.snapshot.queryParams);

        this.isSaving = false; // inicio de variable false por jhipster.
        if (this.defaults) {
            this.mode = 'update';
        } else {
            this.defaults = {} as IGearSmartStrategyAE;
        }

        this.defaultSelect = this.defaults.geargoalsstrategyaeName; // se asigna variable que toma para la modificacion
        this.form = this.fb.group({
            name: this.defaults.name || '',
            drescription: this.defaults.drescription || '',
            geargoalsstrategyaeId: this.defaults.geargoalsstrategyaeId || '',
            geargoalsstrategyaeName: this.defaults.geargoalsstrategyaeName || ''
        });

        /**  Consulta de Estrategia y para el Actualizar */
        this.gearGoalsStrategyAEService.query().subscribe(
            (res: HttpResponse<IGearDomain[]>) => {
                this.gearGoalsStrategies = res.body;
                // cargamos los valores
                this.form = this.fb.group({
                    name: this.defaults.name || '',
                    drescription: this.defaults.drescription || '',
                    geargoalsstrategyaeId: this.defaults.geargoalsstrategyaeId || '',
                    geargoalsstrategyaeName: this.defaults.geargoalsstrategyaeName || ''
                });
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        // ============ Start Condicion para validar  el label del select ============================
        if (this.mode === 'create') {
            this.defaultSelect = this.route.snapshot.queryParams['nameGoals'];
        } else {
            this.defaultSelect = this.defaults.geargoalsstrategyaeName; // se asigna variable que toma para la modificacion
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
        this.form.value.geargoalsstrategyaeName = this.route.snapshot.queryParams['nameGoals'];
        this.form.value.geargoalsstrategyaeId = this.route.snapshot.queryParams['idGoals'];

        const customer = this.form.value;
        this.dialogRef.close(customer);
    }

    updateCustomer() {
        // ============ Start Condicion el actualizar del select  ============================
        if (this.gearGoalsStrategy) {
            this.form.value.geargoalsstrategyaeName = this.gearGoalsStrategy.name;
            this.form.value.geargoalsstrategyaeId = this.gearGoalsStrategy.id;
        } else {
            this.form.value.geargoalsstrategyaeName = this.defaults.geargoalsstrategyaeName;
            this.form.value.geargoalsstrategyaeId = this.defaults.geargoalsstrategyaeId;
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

    // ======= Esta es para el llamado de Error al traer los dominios ===
    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
