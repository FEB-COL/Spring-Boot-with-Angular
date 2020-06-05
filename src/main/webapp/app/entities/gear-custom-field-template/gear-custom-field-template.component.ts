import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearCustomFieldTemplate } from 'app/shared/model/gear-custom-field-template.model';
import { Principal } from 'app/core';
import { GearCustomFieldTemplateService } from './gear-custom-field-template.service';
import { ActivatedRoute, Router } from '@angular/router';

/** Coponentes necesarios para agregar el thema de la tabla*/
import { ListColumn } from '../../shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

/** Importacion de Modal Create */
import { CustomFieldTemplateCreateUpdateComponent } from './modalsCustomFieldTemplate/custom-field-template-create-update.component';
import { Location } from '@angular/common';
import swal from 'sweetalert2';

@Component({
    selector: 'jhi-gear-custom-field-template',
    templateUrl: './gear-custom-field-template.component.html',
    styleUrls: ['./gear-custom-field-template.component.scss']
    // styleUrls: ['gear-custom-field-template.css']  //este es el estilo viejo que utilizar jhipster por defecto
})
export class GearCustomFieldTemplateComponent implements OnInit, AfterViewInit, OnDestroy {
    idDocumentType: string;
    dataSource: MatTableDataSource<IGearCustomFieldTemplate>; // Array de la interface

    auxTemplates: IGearCustomFieldTemplate[];
    gearCustomFieldTemplates: IGearCustomFieldTemplate[];
    currentAccount: any;
    eventSubscriber: Subscription;

    //Variables que utilizar el theme
    subject$: ReplaySubject<IGearCustomFieldTemplate[]> = new ReplaySubject<IGearCustomFieldTemplate[]>(1); // esta es la variable de carga de cada pagina
    data$: Observable<IGearCustomFieldTemplate[]> = this.subject$.asObservable(); // esta es la varialbe de carga de cada dato, listo para visualizar

    // Edicion de la columnas que vamos a Visualizar
    // Cosa por destacar la propiedada isModelProperty es para que los datos que traemos del modelo concuerden con la columnas que vamos a mostrar
    @Input()
    columns: ListColumn[] = [
        { name: 'Id', property: 'id', visible: false, isModelProperty: true },
        { name: 'Etiqueta', property: 'labelField', visible: true, isModelProperty: true },
        { name: 'Valor Defecto', property: 'defaultValue', visible: true, isModelProperty: true },
        // { name: 'Tipo Atributo', property: 'fieldType', visible: true, isModelProperty: true },
        { name: 'Lista Opciones', property: 'listOptions', visible: true, isModelProperty: true },
        { name: 'Tipo Documento', property: 'gearDdocumenttypeName', visible: true, isModelProperty: true },
        { name: 'Acciones', property: 'actions', visible: true }
    ] as ListColumn[];
    pageSize = 10;
    @ViewChild(MatPaginator)
    paginator: MatPaginator;
    @ViewChild(MatSort)
    sort: MatSort;

    /**
     * Variables para la creacion-Eliminacion y Edicion de Dominio
     */

    isSaving: boolean;

    constructor(
        private gearCustomFieldTemplateService: GearCustomFieldTemplateService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        //Componente Necesario para la parte de Login
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private _location: Location
    ) {}

    // ====== Con esta funcion se Realiza la carga de datos en una estructura que la tabla entienda OJO
    loadAll() {
        console.log('id capturado ', this.route.snapshot.queryParams);

        this.gearCustomFieldTemplateService.query().subscribe(
            (res: HttpResponse<IGearCustomFieldTemplate[]>) => {
                let aux = []; // variable auxiliar para reasignar valor
                this.auxTemplates = res.body;

                // reasignar el valor a la  variable, del id del diagnostico obtenido
                this.idDocumentType = this.route.snapshot.queryParams['idDocumentType'];
                console.log('========= el valor del ID de diagnostico ', this.idDocumentType);

                for (let i = 0; i < this.auxTemplates.length; i++) {
                    if (this.auxTemplates[i]['gearDdocumenttypeId'] === Number(this.idDocumentType)) {
                        console.log('Entrando al If ₵₵₵₵₵₵₵₵₵', this.auxTemplates[i]['gearDdocumenttypeId']);

                        aux.push(this.auxTemplates[i]);
                    }
                    console.log('Fuera del If @@@@@@', this.auxTemplates[i]['gearDdocumenttypeId']);
                }

                this.gearCustomFieldTemplates = aux;

                // this.gearCustomFieldTemplates = res.body;
                // cargar el arreglo a la variable
                const customFieldTemplates = this.gearCustomFieldTemplates;

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(customFieldTemplates);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;

                console.log('Plantilla traido de BD', this.gearCustomFieldTemplates);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    /**
     * Funciones Necesarias que Funcionan con el thema Fury
     */
    get visibleColumns() {
        return this.columns.filter(column => column.visible).map(column => column.property);
    }

    ngAfterViewInit() {
        //Con el llamado esta Funcion Cargamos los datos y los datos de pagina y sort que necesitamos para la tabla
        this.loadAll();
    }

    // ========= start Para la craecion de Domonios OJO ===================
    createCustomFieldTemplate() {
        this.dialog
            .open(CustomFieldTemplateCreateUpdateComponent)
            .afterClosed()
            .subscribe((gearCustomFieldtemplate: IGearCustomFieldTemplate) => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearCustomFieldtemplate) {
                    console.log('entro en la creacion');

                    // ====== start Funcion de Creacion de document type ========

                    this.subscribeToSaveResponse(this.gearCustomFieldTemplateService.create(gearCustomFieldtemplate));
                    console.log('elementos de Plantilla', this.gearCustomFieldTemplates);
                    // ======== End  de creacion de document type ==============

                    // Reflesca la tabla en la Plantilla
                    this.subject$.next(this.gearCustomFieldTemplates);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Guardado', showConfirmButton: false, timer: 2000 });
                }
            });
    }
    // ========= start Para la craecion de Domonios OJO ===================

    // ======= start Funcion para el filtrado ===========
    onFilterChange(value) {
        if (!this.dataSource) {
            return;
        }
        value = value.trim();
        value = value.toLowerCase();
        this.dataSource.filter = value;
    }
    // ======= End Funcion para el filtrado ===========

    /**
     * End Funciones
     */

    // =========  start Funcion para cargar la visualizacion de la pagina ==========
    ngOnInit() {
        console.log('Entra al NgOnINit Plantilla');
        this.principal
            .identity()
            .then(account => {
                this.currentAccount = account;
            })
            .catch(err => {
                console.log('Something went wrong: ' + err.message);
                this.router.navigate(['']);
            });
        this.loadAll();
        this.registerChangeInGearCustomFieldTemplates();
    }
    // =========  End  Funcion para cargar la visualizacion de la pagina ==========

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGearCustomFieldTemplates() {
        this.eventSubscriber = this.eventManager.subscribe('gearCustomFieldTemplateListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    // ======== Start Funciones necesario para la creacion de Dominio ==============

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearCustomFieldTemplate>>) {
        result.subscribe(
            (res: HttpResponse<IGearCustomFieldTemplate>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }
    // ======== End  Funciones necesario para la creacion de Dominio ==============

    // ========= Start Funcion se actuliza el componente =============
    updateCustomFieldTemplate(gearCustomFieldTemplate) {
        this.dialog
            .open(CustomFieldTemplateCreateUpdateComponent, {
                data: gearCustomFieldTemplate
            })
            .afterClosed()
            .subscribe(gearCustomFieldTemplate => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearCustomFieldTemplate) {
                    /**
                     * Here we are updating our local array.
                     * You would probably make an HTTP request here.
                     */
                    this.subscribeToSaveResponse(this.gearCustomFieldTemplateService.update(gearCustomFieldTemplate));

                    const index = this.gearCustomFieldTemplates.findIndex(
                        existingCustomer => existingCustomer.id === gearCustomFieldTemplate.id
                    );

                    this.gearCustomFieldTemplates[index] = gearCustomFieldTemplate;
                    this.subject$.next(this.gearCustomFieldTemplates);
                    // Actulizacion de la tabla
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Actualizado', showConfirmButton: false, timer: 2000 });
                }
            });
    }
    // ========= End Funcion se actuliza el componente =============

    deleteCustomFieldTemplate(customFieldtemplate) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        if (customFieldtemplate) {
            this.gearCustomFieldTemplateService.delete(customFieldtemplate.id).subscribe(response => {
                this.eventManager.broadcast({
                    name: 'gearDomainListModification',
                    content: 'Deleted an gearDomain'
                });
                // this.activeModal.dismiss(true);
            });
            this.gearCustomFieldTemplates.splice(
                this.gearCustomFieldTemplates.findIndex(existingCustomer => existingCustomer.id === customFieldtemplate.id),
                1
            );
            this.subject$.next(this.gearCustomFieldTemplates);
            this.ngOnInit();
            this.loadAll();
            swal({ position: 'center', type: 'success', title: 'Eliminado', showConfirmButton: false, timer: 2000 });
        }
    }
    // ========= End Funcion Eliminar el componente =============

    // ==== Funcion para retorceder vista
    backClicked() {
        this._location.back();
    }
}
