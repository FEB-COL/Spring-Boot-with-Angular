import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearDocumentType } from 'app/shared/model/gear-document-type.model';
import { Principal } from 'app/core';
import { GearDocumentTypeService } from './gear-document-type.service';
import { ActivatedRoute, Router } from '@angular/router';

/** Coponentes necesarios para agregar el thema de la tabla*/
import { ListColumn } from '../../shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

/**  Consulta Plantillas */
import { GearCustomFieldTemplateService } from './../gear-custom-field-template/gear-custom-field-template.service';
import { IGearCustomFieldTemplate } from 'app/shared/model/gear-custom-field-template.model';
import { IGearDomain } from 'app/shared/model/gear-domain.model';

/** Importacion de Modal Create */
import { DocumentTypeCreateUpdateComponent } from './modalsDocumentTypes/document-type-create-update.component';

/**  Implementacion Sweetalert */
import swal from 'sweetalert2';
import { SwalPartialTargets } from '@toverux/ngx-sweetalert2';
import { Location } from '@angular/common';

@Component({
    selector: 'jhi-gear-document-type',
    templateUrl: './gear-document-type.component.html',
    styleUrls: ['./gear-document-type.component.scss']
})
export class GearDocumentTypeComponent implements OnInit, AfterViewInit, OnDestroy {
    plantillas: IGearCustomFieldTemplate[];
    idDomain: IGearDomain[];
    dataSource: MatTableDataSource<IGearDocumentType>; // Array de la interface

    auxDocument: IGearDomain[];
    gearDocumentTypes: IGearDocumentType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    // Variables que utilizar el theme
    subject$: ReplaySubject<IGearDocumentType[]> = new ReplaySubject<IGearDocumentType[]>(1); // esta es la variable de carga de cada pagina
    data$: Observable<IGearDocumentType[]> = this.subject$.asObservable(); // esta es la varialbe de carga de cada dato, listo para visualizar

    // Edicion de la columnas que vamos a Visualizar
    // Cosa por destacar la propiedada isModelProperty es para que los datos que traemos del modelo concuerden con la columnas que vamos a mostrar
    @Input()
    columns: ListColumn[] = [
        { name: 'Id', property: 'id', visible: false, isModelProperty: true },
        { name: 'Nombre', property: 'name', visible: true, isModelProperty: true },
        { name: 'Dominio', property: 'geardomainName', visible: true, isModelProperty: true },
        { name: 'Acciones', property: 'actions', visible: true }
    ] as ListColumn[];
    pageSize = 10;
    @ViewChild(MatPaginator)
    paginator: MatPaginator;
    @ViewChild(MatSort)
    sort: MatSort;

    /** Variables para la creacion-Eliminacion y Edicion de Dominio */
    isSaving: boolean;

    constructor(
        private gearDocumentTypeService: GearDocumentTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        // Componente Necesario para la parte de Login
        private dialog: MatDialog,
        private customFieldTemplateService: GearCustomFieldTemplateService,
        public readonly swalTargets: SwalPartialTargets,
        private route: ActivatedRoute,
        private _location: Location
    ) {}

    // ====== Con esta funcion se Realiza la carga de datos en una estructura que la tabla entienda OJO
    loadAll() {
        this.gearDocumentTypeService.query().subscribe(
            (res: HttpResponse<IGearDocumentType[]>) => {
                let aux = []; // variable auxiliar para reasignar valor
                this.auxDocument = res.body;
                this.idDomain = this.route.snapshot.queryParams['idDomain'];

                for (let i = 0; i < this.auxDocument.length; i++) {
                    if (this.auxDocument[i]['geardomainId'] === Number(this.idDomain)) {
                        aux.push(this.auxDocument[i]);
                    }
                }

                this.gearDocumentTypes = aux;

                // this.gearDocumentTypes = res.body;

                // cargar el arreglo a la variable
                const documentTypes = this.gearDocumentTypes;

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(documentTypes);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    // =========  start Funcion para cargar la visualizacion de la pagina ==========
    ngOnInit() {
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
        this.registerChangeInGearDocumentTypes();
    }
    // =========  End  Funcion para cargar la visualizacion de la pagina ==========

    /** Funciones Necesarias que Funcionan con el thema Fury */
    get visibleColumns() {
        return this.columns.filter(column => column.visible).map(column => column.property);
    }

    ngAfterViewInit() {
        // Con el llamado esta Funcion Cargamos los datos y los datos de pagina y sort que necesitamos para la tabla
        this.loadAll();
    }
    /** End Funciones */

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGearDocumentTypes() {
        this.eventSubscriber = this.eventManager.subscribe('gearDocumentTypeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    // ======== Start Funciones necesario para la creacion de Dominio ==============
    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearDocumentType>>) {
        result.subscribe((res: HttpResponse<IGearDocumentType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }
    // ======== End  Funciones necesario para la creacion de Dominio ==============

    // ========= start Para la craecion de Domonios OJO ===================
    createDocumentType() {
        this.dialog
            .open(DocumentTypeCreateUpdateComponent)
            .afterClosed()
            .subscribe((gearDocumentType: IGearDocumentType) => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearDocumentType) {
                    // ====== start Funcion de Creacion de document type ========
                    this.subscribeToSaveResponse(this.gearDocumentTypeService.create(gearDocumentType));
                    // ======== End  de creacion de document type ==============

                    // Reflesca la tabla en el Tipo Documento
                    this.subject$.next(this.gearDocumentTypes);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Guardado', showConfirmButton: false, timer: 2000 });
                }
            });
    }
    // =========End  Para la craecion de Domonios OJO ===================

    // ========= Start Funcion se actuliza el componente =============
    updateDocumentType(gearDocumentType) {
        this.dialog
            .open(DocumentTypeCreateUpdateComponent, {
                data: gearDocumentType
            })
            .afterClosed()
            .subscribe(gearDocumentType => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearDocumentType) {
                    /**
                     * Here we are updating our local array.
                     * You would probably make an HTTP request here.
                     */
                    this.subscribeToSaveResponse(this.gearDocumentTypeService.update(gearDocumentType));

                    const index = this.gearDocumentTypes.findIndex(existingCustomer => existingCustomer.id === gearDocumentType.id);
                    // Actulizacion de la tabla
                    this.gearDocumentTypes[index] = gearDocumentType;
                    this.subject$.next(this.gearDocumentTypes);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Actualizado', showConfirmButton: false, timer: 2000 });
                }
            });
    }
    // ========= End Funcion se actuliza el componente =============

    // ========= Start Funcion Eliminar el componente =============
    deleteDocumentType(documentType) {
        let aux = false;
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        if (documentType) {
            this.customFieldTemplateService.query().subscribe(
                (res: HttpResponse<IGearCustomFieldTemplate[]>) => {
                    this.plantillas = res.body;
                    console.log('Consultado Plantillas', this.plantillas);

                    //  ========== Recoorer tipo de documentos ============
                    for (let i = 0; i < this.plantillas.length; i++) {
                        if (this.plantillas[i].gearDdocumenttypeId === documentType.id) {
                            aux = true;
                        }
                    }

                    if (!aux) {
                        this.gearDocumentTypeService.delete(documentType.id).subscribe(response => {
                            this.eventManager.broadcast({
                                name: 'gearDomainListModification',
                                content: 'Deleted an gearDomain'
                            });
                            // this.activeModal.dismiss(true);
                        });
                        this.gearDocumentTypes.splice(
                            this.gearDocumentTypes.findIndex(existingCustomer => existingCustomer.id === documentType.id),
                            1
                        );
                        this.subject$.next(this.gearDocumentTypes);
                        this.ngOnInit();
                        this.loadAll();
                        swal({ position: 'center', type: 'success', title: 'eliminado', showConfirmButton: false, timer: 2000 });
                    } else {
                        swal({
                            position: 'center',
                            type: 'warning',
                            text: 'No se puede Eliminar ' + documentType.name + ', tiene una dependencia',
                            showConfirmButton: true
                        });
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }
    // ========= End Funcion Eliminar el componente =============

    // ==== Funcion para retorceder vista
    backClicked() {
        this._location.back();
    }

    // Redireccionar vista para crear preguntas del diagnostico
    listTemplates(id, name) {
        this.router.navigate(['/templates'], { queryParams: { idDocumentType: id, nameDocument: name } });
    }
}
