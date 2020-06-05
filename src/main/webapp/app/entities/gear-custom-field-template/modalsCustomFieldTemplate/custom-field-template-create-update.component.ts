import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { GearDocumentTypeService } from 'app/entities/gear-document-type';
import { IGearCustomFieldTemplate } from 'app/shared/model/gear-custom-field-template.model';
import { IGearDocumentType } from 'app/shared/model/gear-document-type.model';
import { JhiAlertService } from 'ng-jhipster';
import { split } from 'ts-node';
import { ActivatedRoute } from '@angular/router';

export interface Lista {
    name: string;
}

@Component({
    selector: 'fury-customer-create-update',
    templateUrl: './custom-field-template-create-update.component.html',
    styleUrls: ['./custom-field-template-create-update.component.scss']
})
export class CustomFieldTemplateCreateUpdateComponent implements OnInit {
    //  ===================================== Start Ejemplo Chip =======================================
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    optionList: Lista[] = [];

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '').trim()) {
            this.optionList.push({ name: value.trim() });
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    remove(tag: Lista): void {
        const index = this.optionList.indexOf(tag);

        if (index >= 0) {
            this.optionList.splice(index, 1);
        }
    }

    // ================================ Start Ejemplo Chip ============================================

    gearDocumentTypes: IGearDocumentType[];
    gearDocumentType: any;
    defaultSelect: string; // variable que toma el valor que tiene antes de modificar
    initDefaultSelect: string; // variabl para iniccializar el label
    isSaving: boolean;

    form: FormGroup;
    mode: 'create' | 'update' = 'create';

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<CustomFieldTemplateCreateUpdateComponent>,
        private fb: FormBuilder, // private gearDomainService: GearDomainService // constructor definido por jhipster
        //  para la parte de select
        private gearDocumentTypeService: GearDocumentTypeService,
        private jhiAlertService: JhiAlertService,
        private route: ActivatedRoute
    ) {
        // variable para el label
        this.initDefaultSelect = 'Seleccione Tipo Documento';
    }

    ngOnInit() {
        console.log('id capturado de tipo Document', this.route.snapshot.queryParams['nameDocument']);
        console.log('id capturado de tipo Document', this.route.snapshot.queryParams['idDocumentType']);

        this.isSaving = false; // inicio de variable false por jhipster.
        if (this.defaults) {
            this.mode = 'update';
        } else {
            this.defaults = {} as IGearCustomFieldTemplate;
        }

        /** Funcion para actualizar los tags */
        if (this.mode === 'update') {
            let auxRecolector = this.defaults.listOptions;
            let recolector;
            recolector = auxRecolector.split('-');
            console.log('###₵₵@@@@#₵₵', recolector);

            for (let i = 0; i < recolector.length - 1; i++) {
                console.log('Mostrar Recolector', recolector);

                if (recolector[i].length > 1) {
                    this.optionList.push({ name: recolector[i].trim() });
                }
            }
        }

        this.defaultSelect = this.defaults.gearDdocumenttypeName; // se asigna variable que toma para la modificacion
        this.form = this.fb.group({
            labelField: this.defaults.labelField || '',
            defaultValue: this.defaults.defaultValue || '',
            // fieldType: this.defaults.fieldType || '',
            // listOptions: this.defaults.listOptions.split('-') || '',
            listOptions: '' || '',
            gearDdocumenttypeId: this.defaults.gearDdocumenttypeId || '',
            gearDdocumenttypeName: this.defaults.gearDdocumenttypeName || ''
        });

        // ===== Staer Carga valores de tipo documentos en el actualizar =========================
        this.gearDocumentTypeService.query().subscribe(
            (res: HttpResponse<IGearDocumentType[]>) => {
                this.gearDocumentTypes = res.body;
                //cargamos los valores
                this.form = this.fb.group({
                    labelField: this.defaults.labelField || '',
                    defaultValue: this.defaults.defaultValue || '',
                    // fieldType: this.defaults.fieldType || '',
                    // listOptions: this.defaults.listOptions || '',
                    listOptions: '' || '',
                    gearDdocumenttypeId: this.defaults.gearDdocumenttypeId || '',
                    gearDdocumenttypeName: this.defaults.gearDdocumenttypeName || ''
                });
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        // ============ Start Condicion para validar  el label del select ============================
        if (this.mode === 'create') {
            this.defaultSelect = this.route.snapshot.queryParams['nameDocument'];
        } else {
            this.defaultSelect = this.defaults.gearDdocumenttypeName; // se asigna variable que toma para la modificacion
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

    // Crear Plantilla
    createCustomer() {
        // para la relacion
        this.form.value.gearDdocumenttypeId = this.route.snapshot.queryParams['idDocumentType'];
        this.form.value.gearDdocumenttypeName = this.route.snapshot.queryParams['nameDocument'];

        console.log('@@@@', this.form);
        console.log('#######', this.gearDocumentType);
        console.log('%%%%%%%', this.optionList);

        if (this.optionList) {
            let auxiliar = '';
            for (let i = 0; i < this.optionList.length; i++) {
                auxiliar += this.optionList[i].name + '-';
            }
            console.log('SSSSSS', auxiliar);
            this.form.value.listOptions = auxiliar;
        }

        const customer = this.form.value;
        this.dialogRef.close(customer);
    }

    updateCustomer() {
        // ============ Start Condicion el actualizar del select  ============================
        if (this.gearDocumentType) {
            this.form.value.gearDdocumenttypeId = this.route.snapshot.queryParams['idDocumentType'];
            this.form.value.gearDdocumenttypeName = this.route.snapshot.queryParams['nameDocument'];
        } else {
            this.form.value.gearDdocumenttypeName = this.defaults.gearDdocumenttypeName;
            this.form.value.gearDdocumenttypeId = this.defaults.gearDdocumenttypeId;
        }
        // ============ End Condicion el actualizar del select  ============================

        if (this.optionList) {
            let auxiliar = '';
            for (let i = 0; i < this.optionList.length; i++) {
                auxiliar += this.optionList[i].name + '-';
            }
            console.log('SSSSSS', auxiliar);
            this.form.value.listOptions = auxiliar;
        }

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
        console.log('erorr@@@@@@@@', errorMessage);
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
