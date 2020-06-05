import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { JhiAlertService } from 'ng-jhipster';
import { IGearPortfolio } from 'app/shared/model/gear-portfolio.model';
import { IGearProject } from 'app/shared/model/gear-project.model';
import { GearPortfolioService } from 'app/entities/gear-portfolio';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'fury-customer-create-update',
    templateUrl: './project-create-update.component.html',
    styleUrls: ['./project-create-update.component.scss']
})
export class ProjectCreateUpdateComponent implements OnInit {
    // ======================= Start  Variables Iniciales ======================
    gearPortfolios: IGearPortfolio[]; // variable para el valor de la relacion
    gearportfolio: any; // donde se alamcena el valor
    defaultSelect: string; // variable que toma el valor que tiene antes de modificar.
    initDefaultSelect: string; // variabl para iniccializar el label
    isSaving: boolean;

    form: FormGroup;
    mode: 'create' | 'update' = 'create';

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<ProjectCreateUpdateComponent>,
        private fb: FormBuilder, // private gearDomainService: GearDomainService // constructor definido por jhipster
        private gearPortfolioService: GearPortfolioService,
        private jhiAlertService: JhiAlertService,
        private route: ActivatedRoute
    ) {
        // variable para el label
        this.initDefaultSelect = 'Seleccione Portafolio';
    }

    ngOnInit() {
        this.isSaving = false; // inicio de variable false por jhipster.
        if (this.defaults) {
            this.mode = 'update';
        } else {
            this.defaults = {} as IGearProject;
        }

        console.log('@@@@ defaults', this.defaults);

        this.defaultSelect = this.defaults.gearPortfolioName; // se asigna variable que toma para la modificacion
        this.form = this.fb.group({
            name: this.defaults.name || '',
            description: this.defaults.description || '',
            gearPortfolioId: this.defaults.gearPortfolioId || '',
            gearPortfolioName: this.defaults.gearPortfolioName || ''
        });

        console.log('@@@@@', this.defaultSelect);

        //////////////////////////////////////////////////////////////////////////////////////////
        //esta parte se llama todo los valores guardados de los Dominios
        //////////////////////////////////////////////////////////////////////////////////////////
        this.gearPortfolioService.query().subscribe(
            (res: HttpResponse<IGearPortfolio[]>) => {
                this.gearPortfolios = res.body;
                //cargamos los valores
                this.form = this.fb.group({
                    name: this.defaults.name || '',
                    description: this.defaults.description || '',
                    gearPortfolioId: this.defaults.gearPortfolioId || '',
                    gearPortfolioName: this.defaults.gearPortfolioName || ''
                });
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        //////////////////////////////////////////////////////////////////////////////////////////

        // ============ Start Condicion para validar  el label del select ============================
        if (this.mode === 'create') {
            this.defaultSelect = this.route.snapshot.queryParams['namePortfolio'];
        } else {
            this.defaultSelect = this.defaults.gearPortfolioName; // se asigna variable que toma para la modificacion
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
        this.form.value.gearPortfolioName = this.route.snapshot.queryParams['namePortfolio'];
        this.form.value.gearPortfolioId = this.route.snapshot.queryParams['idPortfolio'];

        const customer = this.form.value;
        this.dialogRef.close(customer);
    }

    updateCustomer() {
        // ============ Start Condicion el actualizar del select  ============================
        if (this.gearportfolio) {
            this.form.value.gearPortfolioName = this.route.snapshot.queryParams['namePortfolio'];
            this.form.value.gearPortfolioId = this.route.snapshot.queryParams['idPortfolio'];
        } else {
            this.form.value.gearPortfolioName = this.defaults.gearPortfolioName;
            this.form.value.gearPortfolioId = this.defaults.gearPortfolioId;
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
