import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';
// import { Customer } from './customer.model';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IGearDomain } from 'app/shared/model/gear-domain.model';
import { GearDomainService } from 'app/entities/gear-domain';
import { IGearDecision } from 'app/shared/model/gear-decision.model';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'fury-customer-create-update',
    templateUrl: './gear-decision-create-update.component.html',
    styleUrls: ['./gear-decision-create-update.component.scss']
})
export class GearDecisionCreateUpdateComponent implements OnInit {
    // ======================= Start  Variables Iniciales ======================
    geardomains: IGearDomain[]; // variable para el valor de la relacion
    geardomain: any; // donde se alamcena el valor
    defaultSelect: string; // variable que toma el valor que tiene antes de modificar
    initDefaultSelect: string; // variabl para iniccializar el label
    isSaving: boolean;

    // ============= LocalStorage Unidad organizacional =========================
    idUnitLocalStorage: any = localStorage.getItem('key1');
    // ==========================================================================

    form: FormGroup;
    mode: 'create' | 'update' = 'create';

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<GearDecisionCreateUpdateComponent>,
        private fb: FormBuilder,
        private gearDomainService: GearDomainService
    ) {
        // variable para el label
        this.initDefaultSelect = 'Seleccione Dominio';
    }

    ngOnInit() {
        this.isSaving = false; // inicio de variable false por jhipster.
        if (this.defaults) {
            this.mode = 'update';
        } else {
            this.defaults = {} as IGearDecision;
        }

        console.log('@@@@ defaults', this.defaults);

        this.defaultSelect = this.defaults.geardomainName; // se asigna variable que toma para la modificacion
        this.form = this.fb.group({
            name: this.defaults.name || '',
            goal: this.defaults.goal || '',
            geardomainId: this.defaults.geardomainId || '',
            geardomainName: this.defaults.geardomainName || ''
        });

        //////////////////////////////////////////////////////////////////////////////////////////
        //esta parte se llama todo los valores guardados de los Dominios
        //////////////////////////////////////////////////////////////////////////////////////////
        console.log('VLAOR DE LOCALSTORAGE ACTUAL', this.idUnitLocalStorage);
        this.gearDomainService.domainByUnitId(this.idUnitLocalStorage).subscribe(res => {
            this.geardomains = res;

            console.log('RESULTADOooooo', this.geardomains);

            //cargamos los valores
            this.form = this.fb.group({
                name: this.defaults.name || '',
                goal: this.defaults.goal || '',
                geardomainId: this.defaults.geardomainId || '',
                geardomainName: this.defaults.geardomainName || ''
            });
        });

        //////////////////////////////////////////////////////////////////////////////////////////
        // ============ Start Condicion para validar  el label del select ============================
        if (this.mode === 'create') {
            this.defaultSelect = this.initDefaultSelect;
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
        this.form.value.geardomainName = this.geardomain.name;
        this.form.value.geardomainId = this.geardomain.id;

        const customer = this.form.value;
        this.dialogRef.close(customer);
    }

    updateCustomer() {
        // ============ Start Condicion el actualizar del select  ============================
        if (this.geardomain) {
            this.form.value.geardomainName = this.geardomain.name;
            this.form.value.geardomainId = this.geardomain.id;
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
}
