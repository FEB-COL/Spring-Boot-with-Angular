import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IParCoinType } from 'app/shared/model/par-coin-type.model';
import { Principal } from 'app/core';
import { ParCoinTypeService } from './par-coin-type.service';
import { Router } from '@angular/router';

/** Coponentes necesarios para agregar el thema de la tabla */
import { ListColumn } from '../../shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

/** Importacion de Modal Create */
import { CoinTypeCreateUpdateComponent } from './modalsCoinTypes/coin-type-create-update.component';
import { IGearDocumentType } from 'app/shared/model/gear-document-type.model';
import swal from 'sweetalert2';

@Component({
    selector: 'jhi-par-coin-type',
    templateUrl: './par-coin-type.component.html',
    styleUrls: ['./par-coin-type.component.scss']
})
export class ParCoinTypeComponent implements OnInit, AfterViewInit, OnDestroy {
    dataSource: MatTableDataSource<IParCoinType>; // Array de la interface
    parCoinTypes: IParCoinType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    //Variables que utilizar el theme
    subject$: ReplaySubject<IParCoinType[]> = new ReplaySubject<IParCoinType[]>(1); // esta es la variable de carga de cada pagina
    data$: Observable<IParCoinType[]> = this.subject$.asObservable(); // esta es la varialbe de carga de cada dato, listo para visualizar

    //Edicion de la columnas que vamos a Visualizar
    //Cosa por destacar la propiedada isModelProperty es para que los datos que traemos del modelo concuerden con la columnas que vamos a mostrar
    @Input()
    columns: ListColumn[] = [
        { name: 'Id', property: 'id', visible: false, isModelProperty: true },
        { name: 'Moneda', property: 'name', visible: true, isModelProperty: true },
        { name: 'Codigo', property: 'description', visible: true, isModelProperty: true },
        { name: 'Simbolo', property: 'symbol', visible: true, isModelProperty: true },
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
        private parCoinTypeService: ParCoinTypeService,
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
        this.parCoinTypeService.query().subscribe(
            (res: HttpResponse<IParCoinType[]>) => {
                this.parCoinTypes = res.body;
                // cargar el arreglo a la variable
                const typeCoins = this.parCoinTypes;

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(typeCoins);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;

                console.log('Moneda traido de BD', this.parCoinTypes);
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
    createCoinType() {
        this.dialog
            .open(CoinTypeCreateUpdateComponent)
            .afterClosed()
            .subscribe((parCoinType: IGearDocumentType) => {
                if (parCoinType) {
                    console.log('entro en la creacion');

                    // ====== start Funcion de Creacion de document type ========

                    this.subscribeToSaveResponse(this.parCoinTypeService.create(parCoinType));
                    console.log('elementos de Dominios', this.parCoinTypes);
                    // ======== End  de creacion de document type ==============

                    // // Carga de Tabla reflesca los valores
                    this.loadAll();
                    // Reflesca la tabla en el Tipo Documento
                    this.subject$.next(this.parCoinTypes);
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

    // =========  start Funcion para cargar la visualizacion de la pagina ========
    ngOnInit() {
        console.log('Entra al NgOnINit MOneda');
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
        this.registerChangeInParCoinTypes();
    }
    // =========  End  Funcion para cargar la visualizacion de la pagina ==========

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInParCoinTypes() {
        this.eventSubscriber = this.eventManager.subscribe('parCoinTypeListModification', response => this.loadAll());
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
    updateCoinType(parCoinType) {
        this.dialog
            .open(CoinTypeCreateUpdateComponent, {
                data: parCoinType
            })
            .afterClosed()
            .subscribe(parCoinType => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (parCoinType) {
                    /**
                     * Here we are updating our local array.
                     * You would probably make an HTTP request here.
                     */
                    this.subscribeToSaveResponse(this.parCoinTypeService.update(parCoinType));

                    const index = this.parCoinTypes.findIndex(existingCustomer => existingCustomer.id === parCoinType.id);
                    // Actulizacion de la tabla
                    this.parCoinTypes[index] = parCoinType;
                    this.subject$.next(this.parCoinTypes);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Actualizado', showConfirmButton: false, timer: 2000 });
                }
            });
    }
    // ========= End Funcion se actuliza el componente =============

    // ========= Start Funcion Eliminar el componente =============

    deleteCoinType(coinType) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        if (coinType) {
            this.parCoinTypeService.delete(coinType.id).subscribe(response => {
                this.eventManager.broadcast({
                    name: 'gearDomainListModification',
                    content: 'Deleted an gearDomain'
                });
                // this.activeModal.dismiss(true);
            });
            this.parCoinTypes.splice(this.parCoinTypes.findIndex(existingCustomer => existingCustomer.id === coinType.id), 1);
            this.subject$.next(this.parCoinTypes);
            this.ngOnInit();
            this.loadAll();
            swal({ position: 'center', type: 'success', title: 'Eliminado', showConfirmButton: false, timer: 2000 });
        }
    }
    // ========= End Funcion Eliminar el componente =============
}
