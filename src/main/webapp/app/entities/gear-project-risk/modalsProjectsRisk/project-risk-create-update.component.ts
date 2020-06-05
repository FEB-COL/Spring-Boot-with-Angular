import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { GearProjectRiskService } from 'app/entities/gear-project-risk';
import { IGearProjectRisk } from 'app/shared/model/gear-project-risk.model';
import { GearProjectService } from 'app/entities/gear-project';
import { IGearProject } from 'app/shared/model/gear-project.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'fury-customer-create-update',
    templateUrl: './project-risk-create-update.component.html',
    styleUrls: ['./project-risk-create-update.component.scss']
})
export class ProjectRiskCreateUpdateComponent implements OnInit {
    // ======================= Start  Variables Iniciales ======================
    gearprojects: IGearProject[]; // variable para el valor de la relacion
    gearProyectos: any; // donde se alamcena el valor
    defaultSelect: string; // variable que toma el valor que tiene antes de modificar.
    initDefaultSelect: string; // variabl para iniccializar el label
    isSaving: boolean;

    form: FormGroup;
    mode: 'create' | 'update' = 'create';

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<ProjectRiskCreateUpdateComponent>,
        private fb: FormBuilder, // private gearDomainService: GearDomainService // constructor definido por jhipster
        private projectRiskService: GearProjectRiskService,
        private jhiAlertService: JhiAlertService,
        private projectService: GearProjectService,
        private route: ActivatedRoute
    ) {
        // variable para el label
        this.initDefaultSelect = 'Seleccione Proyecto';
    }

    ngOnInit() {
        this.isSaving = false; // inicio de variable false por jhipster.
        if (this.defaults) {
            this.mode = 'update';
        } else {
            this.defaults = {} as IGearProjectRisk;
        }

        // =============  Campos del formulario para guiardar ===========
        this.defaultSelect = this.defaults.gearProjectName; // se asigna variable que toma para la modificacion
        this.form = this.fb.group({
            status: this.defaults.status || '',
            // impact: this.defaults.impact || '',
            description: this.defaults.description || '',
            // creationDate: this.defaults.creationDate || '',
            // modifyDate: this.defaults.modifyDate || '',
            gearProjectId: this.defaults.gearProjectId || '',
            gearProjectName: this.defaults.gearProjectName || ''
        });

        //////////////////////////////////////////////////////////////////////////////////////////
        //esta parte se llama todo los valores guardados de los Dominios
        //////////////////////////////////////////////////////////////////////////////////////////
        this.projectService.query().subscribe(
            (res: HttpResponse<IGearProject[]>) => {
                this.gearprojects = res.body;
                //cargamos los valores
                this.form = this.fb.group({
                    status: this.defaults.status || '',
                    // impact: this.defaults.impact || '',
                    description: this.defaults.description || '',
                    // creationDate: this.defaults.creationDate || '',
                    // modifyDate: this.defaults.modifyDate || '',
                    gearProjectId: this.defaults.gearProjectId || '',
                    gearProjectName: this.defaults.gearProjectName || ''
                });
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        //////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////
        // ============ Start Condicion para validar  el label del select ============================
        if (this.mode === 'create') {
            this.defaultSelect = this.route.snapshot.queryParams['nameProject'];
        } else {
            this.defaultSelect = this.defaults.gearProjectName; // se asigna variable que toma para la modificacion
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

    private onSaveSuccess() {
        this.isSaving = false;
        // this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    // Crear Tipo de documento
    createCustomer() {
        this.form.value.gearProjectName = this.route.snapshot.queryParams['nameProject'];
        this.form.value.gearProjectId = this.route.snapshot.queryParams['idProject'];

        const customer = this.form.value;
        this.dialogRef.close(customer);
    }

    updateCustomer() {
        // ============ Start Condicion el actualizar del select  ============================
        if (this.gearProyectos) {
            this.form.value.gearProjectName = this.route.snapshot.queryParams['nameProject'];
            this.form.value.gearProjectId = this.route.snapshot.queryParams['idProject'];
        } else {
            this.form.value.gearProjectName = this.defaults.gearProjectName;
            this.form.value.gearProjectId = this.defaults.gearProjectId;
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
