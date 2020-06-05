import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IGearInformationSystems } from 'app/shared/model/gear-information-systems.model';
import { GearInformationSystemsService } from 'app/entities/gear-information-systems';
import { IGearSystemsFunctionality } from 'app/shared/model/gear-systems-functionality.model';
import { JhiAlertService } from 'ng-jhipster';
import { IGearDomain } from 'app/shared/model/gear-domain.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'fury-customer-create-update',
    templateUrl: './system-funcionality-create-update.component.html',
    styleUrls: ['./system-funcionality-create-update.component.scss']
})
export class SystemFuncionalityCreateUpdateComponent implements OnInit {
    // ======================= Start  Variables Iniciales ======================
    gearInformationSystems: IGearInformationSystems[]; // variable para el valor de la relacion
    gearInformation: any; // donde se alamcena el valor
    defaultSelect: string; // variable que toma el valor que tiene antes de modificar.
    initDefaultSelect: string; // variabl para iniccializar el label
    isSaving: boolean;

    form: FormGroup;
    mode: 'create' | 'update' = 'create';

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<SystemFuncionalityCreateUpdateComponent>,
        private fb: FormBuilder, // private gearDomainService: GearDomainService // constructor definido por jhipster
        private gearInformationSystemsService: GearInformationSystemsService,
        private jhiAlertService: JhiAlertService,
        private route: ActivatedRoute
    ) {
        // variable para el label
        this.initDefaultSelect = 'Seleccione Sistema Información';
    }

    ngOnInit() {
        this.isSaving = false; // inicio de variable false por jhipster.
        if (this.defaults) {
            this.mode = 'update';
        } else {
            this.defaults = {} as IGearSystemsFunctionality;
        }

        // =============  Campos del formulario para guiardar ===========
        this.defaultSelect = this.defaults.gearInformationSystemName; // se asigna variable que toma para la modificacion
        this.form = this.fb.group({
            name: this.defaults.name || '',
            description: this.defaults.description || '',
            // creationDate: this.defaults.creationDate || '',
            // modifyDate: this.defaults.modifyDate || '',
            gearinformationsystemsId: this.defaults.gearinformationsystemsId || '',
            gearInformationSystemName: this.defaults.gearInformationSystemName || ''
        });

        /** esta parte se llama los valores guardados de los Funcionalidades Consultado los Sistemas de Informacion */
        this.gearInformationSystemsService.query().subscribe(
            (res: HttpResponse<IGearDomain[]>) => {
                this.gearInformationSystems = res.body;
                // cargamos los valores
                this.form = this.fb.group({
                    name: this.defaults.name || '',
                    description: this.defaults.description || '',
                    // creationDate: this.defaults.creationDate || '',
                    // modifyDate: this.defaults.modifyDate || '',
                    gearinformationsystemsId: this.defaults.gearinformationsystemsId || '',
                    gearInformationSystemName: this.defaults.gearInformationSystemName || ''
                });
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        // ============ Start Condicion para validar  el label del select ============================
        if (this.mode === 'create') {
            this.defaultSelect = this.route.snapshot.queryParams['nameInformationSystems'];
        } else {
            this.defaultSelect = this.defaults.gearInformationSystemName; // se asigna variable que toma para la modificacion
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
        this.form.value.gearInformationSystemName = this.route.snapshot.queryParams['nameInformationSystems'];
        this.form.value.gearinformationsystemsId = this.route.snapshot.queryParams['idInformationSystem'];

        const customer = this.form.value;
        this.dialogRef.close(customer);
    }

    updateCustomer() {
        // ============ Start Condicion el actualizar del select  ============================
        if (this.gearInformation) {
            this.form.value.gearInformationSystemName = this.route.snapshot.queryParams['nameInformationSystems'];
            this.form.value.gearinformationsystemsId = this.route.snapshot.queryParams['idInformationSystem'];
        } else {
            this.form.value.gearInformationSystemName = this.defaults.gearInformationSystemName;
            this.form.value.gearinformationsystemsId = this.defaults.gearinformationsystemsId;
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

    // ====== Esta es para el llamado de Error al traer los dominios ======
    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
