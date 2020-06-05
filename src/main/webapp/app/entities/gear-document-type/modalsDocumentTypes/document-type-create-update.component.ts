import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IGearDomain } from 'app/shared/model/gear-domain.model';
import { GearDomainService } from 'app/entities/gear-domain';
import { IGearDocumentType } from 'app/shared/model/gear-document-type.model';
import { JhiAlertService } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'fury-customer-create-update',
    templateUrl: './document-type-create-update.component.html',
    styleUrls: ['./document-type-create-update.component.scss']
})
export class DocumentTypeCreateUpdateComponent implements OnInit {
    // ======================= Start  Variables Iniciales ======================
    geardomains: IGearDomain[]; // variable para el valor de la relacion
    geardomain: any; // donde se alamcena el valor
    defaultSelect: string; // variable que toma el valor que tiene antes de modificar.
    initDefaultSelect: string; // variabl para iniccializar el label
    isSaving: boolean;

    form: FormGroup;
    mode: 'create' | 'update' = 'create';

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<DocumentTypeCreateUpdateComponent>,
        private fb: FormBuilder,
        private gearDomainService: GearDomainService,
        private jhiAlertService: JhiAlertService,
        private route: ActivatedRoute
    ) {
        // variable para el label
        this.initDefaultSelect = 'Seleccione Dominio';
    }

    ngOnInit() {
        this.isSaving = false; // inicio de variable false por jhipster.
        if (this.defaults) {
            this.mode = 'update';
        } else {
            this.defaults = {} as IGearDocumentType;
        }

        this.defaultSelect = this.defaults.geardomainName; // se asigna variable que toma para la modificacion
        this.form = this.fb.group({
            name: this.defaults.name || '',
            geardomainId: this.defaults.geardomainId || '',
            geardomainName: this.defaults.geardomainName || ''
        });

        // ===== Staer Carga valores de dominios en el actualizar =========================
        this.gearDomainService.query().subscribe(
            (res: HttpResponse<IGearDomain[]>) => {
                this.geardomains = res.body;
                //cargamos los valores
                this.form = this.fb.group({
                    name: this.defaults.name || '',
                    geardomainId: this.defaults.geardomainId || '',
                    geardomainName: this.defaults.geardomainName || ''
                });
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        // ===== End Carga valores de dominios en el actualizar =========================

        // ============ Start Condicion para validar  el label del select ============================
        if (this.mode === 'create') {
            this.defaultSelect = this.route.snapshot.queryParams['nameDomain'];
        } else {
            this.defaultSelect = this.defaults.geardomainName; // se asigna variable que toma para la modificacion
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
        this.form.value.geardomainName = this.route.snapshot.queryParams['nameDomain'];
        this.form.value.geardomainId = this.route.snapshot.queryParams['idDomain'];

        const customer = this.form.value;
        this.dialogRef.close(customer);
    }

    updateCustomer() {
        // ============ Start Condicion el actualizar del select  ============================
        if (this.geardomain) {
            this.form.value.geardomainName = this.route.snapshot.queryParams['nameDomain'];
            this.form.value.geardomainId = this.route.snapshot.queryParams['idDomain'];
        } else {
            this.form.value.geardomainName = this.defaults.geardomainName;
            this.form.value.geardomainId = this.defaults.geardomainId;
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
