import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearSmartStrategyAE } from 'app/shared/model/gear-smart-strategy-ae.model';
import { Principal } from 'app/core';
import { GearSmartStrategyAEService } from './gear-smart-strategy-ae.service';
import { ActivatedRoute, Router } from '@angular/router';

/** Coponentes necesarios para agregar el thema de la tabla*/
import { ListColumn } from '../../shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

// Importacion de Modal Create
import { SmartStrategyCreateUpdateComponent } from './modalsSmartStrategy/smart-strategy-create-update.component';
import { Location } from '@angular/common';

/** Implementacion Sweetalert  */
import swal from 'sweetalert2';

@Component({
    selector: 'jhi-gear-smart-strategy-ae',
    templateUrl: './gear-smart-strategy-ae.component.html',
    styleUrls: ['./gear-smart-strategy.component.scss']
})
export class GearSmartStrategyAEComponent implements OnInit, AfterViewInit, OnDestroy {
    idGoals: string;
    dataSource: MatTableDataSource<IGearSmartStrategyAE>; // Array de la interface

    auxSmarts: IGearSmartStrategyAE[];
    gearSmartStrategyAES: IGearSmartStrategyAE[];
    currentAccount: any;
    eventSubscriber: Subscription;

    // Variables que utilizar el theme
    subject$: ReplaySubject<IGearSmartStrategyAE[]> = new ReplaySubject<IGearSmartStrategyAE[]>(1); // esta es la variable de carga de cada pagina
    data$: Observable<IGearSmartStrategyAE[]> = this.subject$.asObservable(); // esta es la varialbe de carga de cada dato, listo para visualizar

    // Edicion de la columnas que vamos a Visualizar
    // Cosa por destacar la propiedada isModelProperty es para que los datos que traemos del modelo concuerden con la columnas que vamos a mostrar
    @Input()
    columns: ListColumn[] = [
        { name: 'Id', property: 'id', visible: false, isModelProperty: true },
        { name: 'Nombre', property: 'name', visible: true, isModelProperty: true },
        { name: 'descripción', property: 'drescription', visible: true, isModelProperty: true },
        { name: 'Estrategia', property: 'geargoalsstrategyaeName', visible: true, isModelProperty: true },
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
        private gearSmartStrategyAEService: GearSmartStrategyAEService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        // Componente Necesario para la parte de Login
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private _location: Location
    ) {}

    // ====== Con esta funcion se Realiza la carga de datos en una estructura que la tabla entienda OJO
    loadAll() {
        this.gearSmartStrategyAEService.query().subscribe(
            (res: HttpResponse<IGearSmartStrategyAE[]>) => {
                let aux = [];
                this.auxSmarts = res.body;

                // Reasignar variable
                this.idGoals = this.route.snapshot.queryParams['idGoals'];
                for (let i = 0; i < this.auxSmarts.length; i++) {
                    if (this.auxSmarts[i]['geargoalsstrategyaeId'] === Number(this.idGoals)) {
                        aux.push(this.auxSmarts[i]);
                    }
                }

                this.gearSmartStrategyAES = aux;

                // this.gearSmartStrategyAES = res.body;

                // cargar el arreglo a la variable
                const smartStrategy = this.gearSmartStrategyAES;

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(smartStrategy);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
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
        // Con el llamado esta Funcion Cargamos los datos y los datos de pagina y sort que necesitamos para la tabla
        this.loadAll();
    }

    // ========= start Para la craecion de Domonios OJO ===================
    createSmartStrategy() {
        this.dialog
            .open(SmartStrategyCreateUpdateComponent)
            .afterClosed()
            .subscribe((gearSmartStrategy: IGearSmartStrategyAE) => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearSmartStrategy) {
                    // ====== start Funcion de Creacion de document type ========

                    this.subscribeToSaveResponse(this.gearSmartStrategyAEService.create(gearSmartStrategy));
                    // ======== End  de creacion de document type ==============

                    // Reflesca la tabla en el Tipo Documento
                    this.subject$.next(this.gearSmartStrategyAES);
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
        this.registerChangeInGearSmartStrategyAES();
    }
    // =========  End  Funcion para cargar la visualizacion de la pagina ==========

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGearSmartStrategyAES() {
        this.eventSubscriber = this.eventManager.subscribe('gearSmartStrategyAEListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
    // ======== Start Funciones necesario para la creacion de Dominio ==============

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearSmartStrategyAE>>) {
        result.subscribe((res: HttpResponse<IGearSmartStrategyAE>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }
    // ======== End  Funciones necesario para la creacion de Dominio ==============

    // ========= Start Funcion se actuliza el componente =============
    updateSmartStrategy(gearSmartStrategy) {
        this.dialog
            .open(SmartStrategyCreateUpdateComponent, {
                data: gearSmartStrategy
            })
            .afterClosed()
            .subscribe(gearSmartStrategy => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearSmartStrategy) {
                    /**
                     * Here we are updating our local array.
                     * You would probably make an HTTP request here.
                     */
                    this.subscribeToSaveResponse(this.gearSmartStrategyAEService.update(gearSmartStrategy));

                    const index = this.gearSmartStrategyAES.findIndex(existingCustomer => existingCustomer.id === gearSmartStrategy.id);
                    // Actulizacion de la tabla
                    this.gearSmartStrategyAES[index] = gearSmartStrategy;
                    this.subject$.next(this.gearSmartStrategyAES);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Actualizado', showConfirmButton: false, timer: 2000 });
                }
            });
    }
    // ========= End Funcion se actuliza el componente =============

    // ========= Start Funcion Eliminar el componente =============

    deleteSmartStrategy(smartStrategy) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        if (smartStrategy) {
            this.gearSmartStrategyAEService.delete(smartStrategy.id).subscribe(response => {
                this.eventManager.broadcast({
                    name: 'gearDomainListModification',
                    content: 'Deleted an gearDomain'
                });
                // this.activeModal.dismiss(true);
            });
            this.gearSmartStrategyAES.splice(
                this.gearSmartStrategyAES.findIndex(existingCustomer => existingCustomer.id === smartStrategy.id),
                1
            );
            this.subject$.next(this.gearSmartStrategyAES);
            this.ngOnInit();
            this.loadAll();
            swal({
                position: 'center',
                type: 'success',
                title: 'Eliminado',
                showConfirmButton: false,
                timer: 2000
            });
        }
    }
    // ========= End Funcion Eliminar el componente =============

    // ==== Funcion para retorceder vista
    backClicked() {
        this._location.back();
    }
}
