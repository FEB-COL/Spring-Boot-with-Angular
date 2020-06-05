import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
// import { Customer } from './customer.model';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IGearValueChainMacroprocess } from 'app/shared/model/gear-value-chain-macroprocess.model';
import { GearValueChainMacroprocessService } from 'app/entities/gear-value-chain-macroprocess';
import { IGearValueChainProcess } from 'app/shared/model/gear-value-chain-process.model';
import { Moment } from 'moment';
import { IGearProcessInfoSystem } from 'app/shared/model/gear-process-info-system.model';
import { GearDomainService } from 'app/entities/gear-domain';
import { JhiAlertService } from 'ng-jhipster';
import { IGearDomain } from 'app/shared/model/gear-domain.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'fury-customer-create-update',
    templateUrl: './process-create-update.component.html',
    styleUrls: ['./process-create-update.component.scss']
})
export class ProcessCreateUpdateComponent implements OnInit {
    // ======================= Start  Variables Iniciales ======================
    gearChainMacroprocess: IGearValueChainMacroprocess[]; // variable para el valor de la relacion
    gearMacroprocess: any; // donde se alamcena el valor
    defaultSelect: string; // variable que toma el valor que tiene antes de modificar.
    initDefaultSelect: string; // variabl para iniccializar el label
    isSaving: boolean;

    form: FormGroup;
    mode: 'create' | 'update' = 'create';

    // para adjustar documentos
    file: File = null;

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<ProcessCreateUpdateComponent>,
        private fb: FormBuilder, // private gearDomainService: GearDomainService // constructor definido por jhipster
        private gearValueChainMacroprocessService: GearValueChainMacroprocessService,
        private jhiAlertService: JhiAlertService,
        private route: ActivatedRoute
    ) {
        // variable para el label
        this.initDefaultSelect = 'Seleccione Macroproceso';
    }

    ngOnInit() {
        this.isSaving = false; // inicio de variable false por jhipster.
        if (this.defaults) {
            this.mode = 'update';
        } else {
            this.defaults = {} as IGearValueChainProcess;
        }

        this.defaultSelect = this.defaults.gearvaluechainmacroprocessName; // se asigna variable que toma para la modificacion
        this.form = this.fb.group({
            name: this.defaults.name || '',
            decription: this.defaults.decription || '',
            attach: this.defaults.attach || '',
            // draft: this.defaults.draft || '',
            inputs: this.defaults.inputs || '',
            outputs: this.defaults.outputs || '',
            gearvaluechainmacroprocessId: this.defaults.gearvaluechainmacroprocessId || '',
            gearvaluechainmacroprocessName: this.defaults.gearvaluechainmacroprocessName || ''
        });
        //////////////////////////////////////////////////////////////////////////////////////////
        //esta parte se llama todo los valores guardados de los Dominios
        //////////////////////////////////////////////////////////////////////////////////////////
        this.gearValueChainMacroprocessService.query().subscribe(
            (res: HttpResponse<IGearDomain[]>) => {
                this.gearChainMacroprocess = res.body;
                //cargamos los valores
                this.form = this.fb.group({
                    name: this.defaults.name || '',
                    decription: this.defaults.decription || '',
                    attach: this.defaults.attach || '',
                    // draft: this.defaults.draft || '',
                    inputs: this.defaults.inputs || '',
                    outputs: this.defaults.outputs || '',
                    gearvaluechainmacroprocessId: this.defaults.gearvaluechainmacroprocessId || '',
                    gearvaluechainmacroprocessName: this.defaults.gearvaluechainmacroprocessName || ''
                });
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        //////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////

        // ============ Start Condicion para validar  el label del select ============================
        if (this.mode === 'create') {
            this.defaultSelect = this.route.snapshot.queryParams['nameMacro'];
        } else {
            this.defaultSelect = this.defaults.gearvaluechainmacroprocessName; // se asigna variable que toma para la modificacion
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
        this.form.value.gearvaluechainmacroprocessName = this.route.snapshot.queryParams['nameMacro'];
        this.form.value.gearvaluechainmacroprocessId = this.route.snapshot.queryParams['idMacro'];

        const customer = this.form.value;
        this.dialogRef.close(customer);
    }

    updateCustomer() {
        // ============ Start Condicion el actualizar del select  ============================
        if (this.gearMacroprocess) {
            this.form.value.gearvaluechainmacroprocessName = this.route.snapshot.queryParams['nameMacro'];
            this.form.value.gearvaluechainmacroprocessId = this.route.snapshot.queryParams['idMacro'];
        } else {
            this.form.value.gearvaluechainmacroprocessName = this.defaults.gearvaluechainmacroprocessName;
            this.form.value.gearvaluechainmacroprocessId = this.defaults.gearvaluechainmacroprocessId;
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
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    onFileSelected(event) {
        console.log('archivo seleccionado OJO FEB', event);
        //cargamos todo en fileUP el contenido de la selecion del archivo que se seleciona OJO
        console.log('datos del archivo-------->', event.target.files[0]);
        this.file = <File>event.target.files[0];
    }
}
