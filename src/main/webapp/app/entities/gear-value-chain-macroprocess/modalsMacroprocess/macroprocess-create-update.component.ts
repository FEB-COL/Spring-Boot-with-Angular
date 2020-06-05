import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
// import { Customer } from './customer.model';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IGearValueChainCategory } from 'app/shared/model/gear-value-chain-category.model';
import { GearValueChainCategoryService } from 'app/entities/gear-value-chain-category';
import { IGearValueChainMacroprocess } from 'app/shared/model/gear-value-chain-macroprocess.model';
import { Moment } from 'moment';
import { IGearValueChainProcess } from 'app/shared/model/gear-value-chain-process.model';
import { JhiAlertService } from 'ng-jhipster';
import { IGearDomain } from 'app/shared/model/gear-domain.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'fury-customer-create-update',
    templateUrl: './macroprocess-create-update.component.html',
    styleUrls: ['./macroprocess-create-update.component.scss']
})
export class MacroprocessCreateUpdateComponent implements OnInit {
    // ======================= Start  Variables Iniciales ======================
    gearCategories: IGearValueChainCategory[]; // variable para el valor de la relacion
    gearCategory: any; // donde se alamcena el valor
    defaultSelect: string; // variable que toma el valor que tiene antes de modificar
    initDefaultSelect: string; // variabl para iniccializar el label
    isSaving: boolean;

    form: FormGroup;
    mode: 'create' | 'update' = 'create';

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<MacroprocessCreateUpdateComponent>,
        private fb: FormBuilder, // private gearDomainService: GearDomainService // constructor definido por jhipster
        private gearValueChainCategoryService: GearValueChainCategoryService,
        private jhiAlertService: JhiAlertService,
        private route: ActivatedRoute
    ) {
        // variable para el label
        this.initDefaultSelect = 'Seleccione Categoría';
    }

    ngOnInit() {
        this.isSaving = false; // inicio de variable false por jhipster.
        if (this.defaults) {
            this.mode = 'update';
        } else {
            this.defaults = {} as IGearValueChainMacroprocess;
        }

        this.form = this.fb.group({
            name: this.defaults.name || '',
            decription: this.defaults.decription || '',
            // draft: this.defaults.draft || '',
            order: this.defaults.order || '',
            gearvaluechaincategoryId: this.defaults.gearvaluechaincategoryId || '',
            gearvaluechaincategoryName: this.defaults.gearvaluechaincategoryName || ''
        });
        //////////////////////////////////////////////////////////////////////////////////////////
        //esta parte se llama todo los valores guardados de los Dominios
        //////////////////////////////////////////////////////////////////////////////////////////
        this.gearValueChainCategoryService.query().subscribe(
            (res: HttpResponse<IGearDomain[]>) => {
                this.gearCategories = res.body;
                //cargamos los valores
                this.form = this.fb.group({
                    name: this.defaults.name || '',
                    decription: this.defaults.decription || '',
                    // draft: this.defaults.draft || '',
                    order: this.defaults.order || '',
                    gearvaluechaincategoryId: this.defaults.gearvaluechaincategoryId || '',
                    gearvaluechaincategoryName: this.defaults.gearvaluechaincategoryName || ''
                });
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        //////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////

        // ============ Start Condicion para validar  el label del select ============================
        if (this.mode === 'create') {
            this.defaultSelect = this.route.snapshot.queryParams['nameCategory'];
        } else {
            this.defaultSelect = this.defaults.gearvaluechaincategoryName; // se asigna variable que toma para la modificacion
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
        this.form.value.gearvaluechaincategoryName = this.route.snapshot.queryParams['nameCategory'];
        this.form.value.gearvaluechaincategoryId = this.route.snapshot.queryParams['idCategory'];

        const customer = this.form.value;
        this.dialogRef.close(customer);
    }

    updateCustomer() {
        // ============ Start Condicion el actualizar del select  ============================
        if (this.gearCategory) {
            this.form.value.gearvaluechaincategoryName = this.route.snapshot.queryParams['nameCategory'];
            this.form.value.gearvaluechaincategoryId = this.route.snapshot.queryParams['idCategory'];
        } else {
            this.form.value.gearvaluechaincategoryName = this.defaults.gearvaluechaincategoryName;
            this.form.value.gearvaluechaincategoryId = this.defaults.gearvaluechaincategoryId;
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
