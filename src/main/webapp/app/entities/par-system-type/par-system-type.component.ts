import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IParSystemType } from 'app/shared/model/par-system-type.model';
import { Principal } from 'app/core';
import { ParSystemTypeService } from './par-system-type.service';
import { Router } from '@angular/router';

/** Coponentes necesarios para agregar el thema de la tabla*/
import { ListColumn } from '../../shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

/** Importacion de Modal Create */
import { SystemTypeCreateUpdateComponent } from './modalsSystemTypes/system-type-create-update.component';

/** Implementacion Sweetalert  */
import swal from 'sweetalert2';

@Component({
    selector: 'jhi-par-system-type',
    templateUrl: './par-system-type.component.html',
    styleUrls: ['./par-system-type.component.scss']
})
export class ParSystemTypeComponent implements OnInit, AfterViewInit, OnDestroy {
    // Arreglo que contiene los items para la tabla
    displayedColumns: string[] = ['id', 'name', 'description', 'accion']; // nombre de las columnas
    dataSource: MatTableDataSource<IParSystemType>; // Array de la interface

    parSystemTypes: IParSystemType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    // Variables que utilizar el theme
    subject$: ReplaySubject<IParSystemType[]> = new ReplaySubject<IParSystemType[]>(1); // esta es la variable de carga de cada pagina
    data$: Observable<IParSystemType[]> = this.subject$.asObservable(); // esta es la varialbe de carga de cada dato, listo para visualizar

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

    /** Variables para la creacion-Eliminacion y Edicion de Dominio */
    isSaving: boolean;

    constructor(
        private parSystemTypeService: ParSystemTypeService,
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
        this.parSystemTypeService.query().subscribe(
            (res: HttpResponse<IParSystemType[]>) => {
                this.parSystemTypes = res.body;
                console.log('valor dos', this.parSystemTypes);

                // cargar el arreglo a la variable typeSystems ,
                const typeSystems = this.parSystemTypes;

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(typeSystems);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;

                console.log('Domain traido de BD', this.parSystemTypes);
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

    // ========= start Para la craecion de Tipo de Sistema OJO ===================
    createSystemType() {
        this.dialog
            .open(SystemTypeCreateUpdateComponent)
            .afterClosed()
            .subscribe((parSystemType: IParSystemType) => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (parSystemType) {
                    console.log('entro en la creacion');

                    // ====== start Funcion de Creacion de document type ========

                    this.subscribeToSaveResponse(this.parSystemTypeService.create(parSystemType));
                    console.log('elementos de Dominios', this.parSystemTypes);
                    // ======== End  de creacion de document type ==============

                    // Carga de Tabla reflesca los valores
                    this.loadAll();
                    // Reflesca la tabla en el Tipo Documento
                    this.subject$.next(this.parSystemTypes);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Guardado', showConfirmButton: false, timer: 2000 });
                }
            });
    }
    private newMethod(): string {
        return 'Eliminado';
    }

    // ========= start Para la Tipo de Sistema OJO ===================

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
        console.log('Entra al NgOnINit Sistema');
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
        console.log('valor', this.parSystemTypes);
        this.registerChangeInParSystemTypes();
    }
    // =========  End  Funcion para cargar la visualizacion de la pagina ==========

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInParSystemTypes() {
        this.eventSubscriber = this.eventManager.subscribe('parSystemTypeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    // ======== Start Funciones necesario para la creacion ==============

    private subscribeToSaveResponse(result: Observable<HttpResponse<IParSystemType>>) {
        result.subscribe((res: HttpResponse<IParSystemType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }
    // ======== End  Funciones necesario para la creacion  ==============

    // ========= Start Funcion se actuliza el componente =============
    updateSystemType(parSystemType) {
        this.dialog
            .open(SystemTypeCreateUpdateComponent, {
                data: parSystemType
            })
            .afterClosed()
            .subscribe(parSystemType => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (parSystemType) {
                    /**
                     * Here we are updating our local array.
                     * You would probably make an HTTP request here.
                     */
                    this.subscribeToSaveResponse(this.parSystemTypeService.update(parSystemType));

                    const index = this.parSystemTypes.findIndex(existingCustomer => existingCustomer.id === parSystemType.id);
                    // Actulizacion de la tabla
                    this.parSystemTypes[index] = parSystemType;
                    this.loadAll();
                    this.subject$.next(this.parSystemTypes);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Actulizado', showConfirmButton: false, timer: 2000 });
                }
            });
    }
    // ========= End Funcion se actuliza el componente =============

    // ========= Start Funcion Eliminar el componente =============
    deleteSystemType(systemType) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        if (systemType) {
            this.parSystemTypeService.delete(systemType.id).subscribe(response => {
                this.eventManager.broadcast({
                    name: 'gearDomainListModification',
                    content: 'Deleted an gearDomain'
                });
                // this.activeModal.dismiss(true);
            });
            this.parSystemTypes.splice(this.parSystemTypes.findIndex(existingCustomer => existingCustomer.id === systemType.id), 1);
            this.subject$.next(this.parSystemTypes);
            this.ngOnInit();
            this.loadAll();
            swal({ position: 'center', type: 'success', title: 'Eliminado', showConfirmButton: false, timer: 2000 });
        }
    }
    // ========= End Funcion Eliminar el componente =============
}
