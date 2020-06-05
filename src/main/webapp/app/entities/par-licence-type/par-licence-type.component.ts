import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
//import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IParLicenceType } from 'app/shared/model/par-licence-type.model';
import { Principal } from 'app/core';
import { ParLicenceTypeService } from './par-licence-type.service';
import { Router } from '@angular/router';

/** Coponentes necesarios para agregar el thema de la tabla*/
import { ListColumn } from '../../shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

// Importacion de Modal Create
import { LicenceTypeCreateUpdateComponent } from './modalsLicenceTypes/licence-type-create-update.component';
import { DocumentTypeCreateUpdateComponent } from 'app/entities/gear-document-type/modalsDocumentTypes/document-type-create-update.component';
import { IGearDocumentType } from 'app/shared/model/gear-document-type.model';
import swal from 'sweetalert2';

@Component({
    selector: 'jhi-par-licence-type',
    templateUrl: './par-licence-type.component.html',
    styleUrls: ['./par-licence-type.component.scss']
})
export class ParLicenceTypeComponent implements OnInit, AfterViewInit, OnDestroy {
    // Arreglo que contiene los items para la tabla
    displayedColumns: string[] = ['id', 'name', 'description', 'accion']; // nombre de las columnas
    dataSource: MatTableDataSource<IParLicenceType>; // Array de la interface

    parLicenceTypes: IParLicenceType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    // Variables que utilizar el theme
    subject$: ReplaySubject<IParLicenceType[]> = new ReplaySubject<IParLicenceType[]>(1); // esta es la variable de carga de cada pagina
    data$: Observable<IParLicenceType[]> = this.subject$.asObservable(); // esta es la varialbe de carga de cada dato, listo para visualizar
    customers: IParLicenceType[]; // es el modelo que vamos a visualizar

    // Edicion de la columnas que vamos a Visualizar
    // Cosa por destacar la propiedada isModelProperty es para que los datos que traemos del modelo concuerden con la columnas que vamos a mostrar
    @Input()
    columns: ListColumn[] = [
        { name: 'Id', property: 'id', visible: false, isModelProperty: true },
        { name: 'Nombre', property: 'name', visible: true, isModelProperty: true },
        { name: 'Descripción', property: 'description', visible: true, isModelProperty: true },
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
        private parLicenceTypeService: ParLicenceTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        //Componente Necesario para la parte de Login
        private dialog: MatDialog
    ) {}

    // ====== Con esta funcion se Realiza la carga de datos en una estructura que la tabla entienda OJO
    loadAll() {
        console.log('Dentro de load ALl');
        this.parLicenceTypeService.query().subscribe(
            (res: HttpResponse<IParLicenceType[]>) => {
                this.parLicenceTypes = res.body;
                // cargar el arreglo a la variable
                const typeLicences = this.parLicenceTypes;

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(typeLicences);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;

                console.log('Licencia traido de BD', this.parLicenceTypes);
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
    createLicenceType() {
        this.dialog
            .open(LicenceTypeCreateUpdateComponent)
            .afterClosed()
            .subscribe((parLicenceType: IParLicenceType) => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (parLicenceType) {
                    console.log('entro en la creacion');

                    // ====== start Funcion de Creacion de document type ========

                    this.subscribeToSaveResponse(this.parLicenceTypeService.create(parLicenceType));
                    console.log('elementos de Dominios', this.parLicenceTypes);

                    // ======== End  de creacion de document type ==============

                    // Carga de Tabla reflesca los valores
                    this.loadAll();
                    // Reflesca la tabla en el Tipo Documento
                    this.subject$.next(this.parLicenceTypes);
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
        console.log('Entra al NgOnINit Licencia');
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
        this.registerChangeInParLicenceTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    // trackId(index: number, item: IParLicenceType) {
    //     return item.id;
    // }

    registerChangeInParLicenceTypes() {
        this.eventSubscriber = this.eventManager.subscribe('parLicenceTypeListModification', response => this.loadAll());
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

    // ========= Start Funcion se actuliza el componente =============
    updateLicenceType(parLicenceType) {
        this.dialog
            .open(LicenceTypeCreateUpdateComponent, {
                data: parLicenceType
            })
            .afterClosed()
            .subscribe(parLicenceType => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (parLicenceType) {
                    /**
                     * Here we are updating our local array.
                     * You would probably make an HTTP request here.
                     */
                    this.subscribeToSaveResponse(this.parLicenceTypeService.update(parLicenceType));

                    const index = this.parLicenceTypes.findIndex(existingCustomer => existingCustomer.id === parLicenceType.id);
                    // Actulizacion de la tabla
                    this.parLicenceTypes[index] = parLicenceType;
                    this.loadAll();
                    this.subject$.next(this.parLicenceTypes);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Actualizado', showConfirmButton: false, timer: 2000 });
                }
            });
    }
    // ========= End Funcion se actuliza el componente =============

    // ========= Start Funcion Eliminar el componente =============

    deleteLicenceType(licenceType) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        if (licenceType) {
            this.parLicenceTypeService.delete(licenceType.id).subscribe(response => {
                this.eventManager.broadcast({
                    name: 'gearDomainListModification',
                    content: 'Deleted an gearDomain'
                });
                // this.activeModal.dismiss(true);
            });
            this.parLicenceTypes.splice(this.parLicenceTypes.findIndex(existingCustomer => existingCustomer.id === licenceType.id), 1);
            this.subject$.next(this.parLicenceTypes);
            this.ngOnInit();
            this.loadAll();
            swal({ position: 'center', type: 'success', title: 'Eliminado', showConfirmButton: false, timer: 2000 });
        }
    }
    // ========= End Funcion Eliminar el componente =============
}
