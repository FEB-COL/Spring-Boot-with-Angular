import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearGoalsStrategyAE } from 'app/shared/model/gear-goals-strategy-ae.model';
import { Principal } from 'app/core';
import { GearGoalsStrategyAEService } from './gear-goals-strategy-ae.service';
import { Router } from '@angular/router';

/** Coponentes necesarios para agregar el thema de la tabla*/
import { ListColumn } from '../../shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

/** Importacion de Modal Create */
import { GoalsStrategyCreateUpdateComponent } from './modalsGoalsStrategy/goals-strategy-create-update.component';
import { IGearDocumentType } from 'app/shared/model/gear-document-type.model';

/** Consulta Objetivos */
import { GearSmartStrategyAEService } from './../gear-smart-strategy-ae/gear-smart-strategy-ae.service';
import { IGearSmartStrategyAE } from 'app/shared/model/gear-smart-strategy-ae.model';

/**  Implementacion Sweetalert */
import swal from 'sweetalert2';

@Component({
    selector: 'jhi-gear-goals-strategy-ae',
    templateUrl: './gear-goals-strategy-ae.component.html',
    styleUrls: ['./gear-goals-strategy-ae.component.scss']
})
export class GearGoalsStrategyAEComponent implements OnInit, AfterViewInit, OnDestroy {
    smarts: IGearSmartStrategyAE[];

    // Arreglo que contiene los items para la tabla
    dataSource: MatTableDataSource<IGearGoalsStrategyAE>; // Array de la interface
    gearGoalsStrategyAES: IGearGoalsStrategyAE[];
    currentAccount: any;
    eventSubscriber: Subscription;

    // ======================= Variables para el filtadro por Unidad ============
    strategyByUnits: IGearGoalsStrategyAE[];
    idUnitLocalStorage: any = localStorage.getItem('key1');
    // ========================================================================

    // Variables que utilizar el theme
    subject$: ReplaySubject<IGearGoalsStrategyAE[]> = new ReplaySubject<IGearGoalsStrategyAE[]>(1); // esta es la variable de carga de cada pagina
    data$: Observable<IGearGoalsStrategyAE[]> = this.subject$.asObservable(); // esta es la varialbe de carga de cada dato, listo para visualizar

    // Edicion de la columnas que vamos a Visualizar
    // Cosa por destacar la propiedada isModelProperty es para que los datos que traemos del modelo concuerden con la columnas que vamos a mostrar
    @Input()
    columns: ListColumn[] = [
        { name: 'Id', property: 'id', visible: false, isModelProperty: true },
        { name: 'Nombre', property: 'name', visible: true, isModelProperty: true },
        { name: 'Descripción', property: 'drescription', visible: true, isModelProperty: true },
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
        private gearGoalsStrategyAEService: GearGoalsStrategyAEService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        // Componente Necesario para la parte de Login
        private dialog: MatDialog,
        private smartStrategyAEService: GearSmartStrategyAEService
    ) {}

    // ====== Con esta funcion se Realiza la carga de datos en una estructura que la tabla entienda OJO
    loadAll() {
        // ============================== Dominios Generales======================================
        // this.gearGoalsStrategyAEService.query().subscribe(
        //     (res: HttpResponse<IGearGoalsStrategyAE[]>) => {
        //         this.gearGoalsStrategyAES = res.body;
        //         // cargar el arreglo a la variable
        //         const goalsStrategy = this.gearGoalsStrategyAES;
        //
        //         // Assign the data to the data source for the table to render
        //         this.dataSource = new MatTableDataSource(goalsStrategy);
        //         this.dataSource.paginator = this.paginator;
        //         this.dataSource.sort = this.sort;
        //     },
        //     (res: HttpErrorResponse) => this.onError(res.message)
        // );
        // ============================== Dominios Generales======================================

        // ============================== Dominios por Unidad Organizacional ======================================
        this.gearGoalsStrategyAEService.strategyByUnitId(this.idUnitLocalStorage).subscribe(res => {
            this.strategyByUnits = res;

            // cargar el arreglo a la variable
            const strategyUnit = this.strategyByUnits;

            // Assign the data to the data source for the table to render
            this.dataSource = new MatTableDataSource(strategyUnit);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            console.log('RESULTADOooooo', this.strategyByUnits);
        });
        // ============================== Dominios por Unidad Organizacional======================================
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
    createGoalsStrategy() {
        this.dialog
            .open(GoalsStrategyCreateUpdateComponent)
            .afterClosed()
            .subscribe((gearGoalsStrategy: IGearGoalsStrategyAE) => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearGoalsStrategy) {
                    // ====== start Funcion de Creacion de document type ========

                    this.subscribeToSaveResponse(this.gearGoalsStrategyAEService.create(gearGoalsStrategy));
                    // ======== End  de creacion de document type ==============

                    // Reflesca la tabla en el Tipo Documento
                    this.subject$.next(this.strategyByUnits);
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
        this.registerChangeInGearGoalsStrategyAES();
    }

    // =========  End  Funcion para cargar la visualizacion de la pagina ==========

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGearGoalsStrategyAES() {
        this.eventSubscriber = this.eventManager.subscribe('gearGoalsStrategyAEListModification', response => this.loadAll());
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
    updateGoalsStrategy(gearGoalsStrategy) {
        this.dialog
            .open(GoalsStrategyCreateUpdateComponent, {
                data: gearGoalsStrategy
            })
            .afterClosed()
            .subscribe(gearGoalsStrategy => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearGoalsStrategy) {
                    /**
                     * Here we are updating our local array.
                     * You would probably make an HTTP request here.
                     */
                    this.subscribeToSaveResponse(this.gearGoalsStrategyAEService.update(gearGoalsStrategy));

                    const index = this.strategyByUnits.findIndex(existingCustomer => existingCustomer.id === gearGoalsStrategy.id);
                    // Actulizacion de la tabla
                    this.strategyByUnits[index] = gearGoalsStrategy;
                    this.subject$.next(this.strategyByUnits);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Actualizado', showConfirmButton: false, timer: 2000 });
                }
            });
    }

    // ========= End Funcion se actuliza el componente =============

    // ========= Start Funcion Eliminar el componente =============

    deleteGoalsStrategy(goalsStrategy) {
        let aux = false;

        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        if (goalsStrategy) {
            this.smartStrategyAEService.query().subscribe(
                (res: HttpResponse<IGearSmartStrategyAE[]>) => {
                    this.smarts = res.body;

                    //  ========== Recoorer tipo de documentos ============
                    for (let i = 0; i < this.smarts.length; i++) {
                        if (this.smarts[i].geargoalsstrategyaeId === goalsStrategy.id) {
                            aux = true;
                        }
                    }

                    if (!aux) {
                        this.gearGoalsStrategyAEService.delete(goalsStrategy.id).subscribe(response => {
                            this.eventManager.broadcast({
                                name: 'gearDomainListModification',
                                content: 'Deleted an gearDomain'
                            });
                            // this.activeModal.dismiss(true);
                        });
                        this.strategyByUnits.splice(
                            this.strategyByUnits.findIndex(existingCustomer => existingCustomer.id === goalsStrategy.id),
                            1
                        );
                        this.subject$.next(this.strategyByUnits);
                        this.ngOnInit();
                        this.loadAll();
                        swal({ position: 'center', type: 'success', title: 'Eliminado', showConfirmButton: false, timer: 2000 });
                    } else {
                        swal({
                            position: 'center',
                            type: 'warning',
                            text: 'No se puede Eliminar ' + goalsStrategy.name + ', tiene una dependencia',
                            showConfirmButton: true
                        });
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    // ========= End Funcion Eliminar el componente =============

    listSmart(id, name) {
        this.router.navigate(['/smarts'], { queryParams: { idGoals: id, nameGoals: name } });
    }
}
