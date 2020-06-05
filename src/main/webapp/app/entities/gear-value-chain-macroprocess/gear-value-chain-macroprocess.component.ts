import { AfterViewInit, Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Principal } from 'app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GearValueChainMacroprocessService } from './../gear-value-chain-macroprocess/gear-value-chain-macroprocess.service';
import { IGearValueChainMacroprocess } from 'app/shared/model/gear-value-chain-macroprocess.model';

/** Coponentes necesarios para agregar el thema de la tabla*/
import { ListColumn } from '../../shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

/** Importacion de Modal Create */
import { MacroprocessCreateUpdateComponent } from './modalsMacroprocess/macroprocess-create-update.component';

/**  Consulta Proceso */
import { GearValueChainProcessService } from './../gear-value-chain-process/gear-value-chain-process.service';
import { IGearValueChainProcess } from 'app/shared/model/gear-value-chain-process.model';

/** Implementacion Sweetalert */
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Moment } from 'moment';

@Component({
    selector: 'jhi-gear-value-chain-macroprocess',
    templateUrl: './gear-value-chain-macroprocess.component.html',
    styleUrls: ['./gear-value-chain-macroprocess.component.scss']
})
export class GearValueChainMacroprocessComponent implements OnInit, AfterViewInit, OnDestroy {
    procesess: IGearValueChainProcess[];
    idCategory: string;

    // Arreglo que contiene los items para la tabla
    displayedColumns: string[] = ['id', 'name', 'decription', 'order', 'gearvaluechaincategoryName', 'accion']; // nombre de las columnas
    dataSource: MatTableDataSource<IGearValueChainMacroprocess>; // Array de la interface

    auxMacro: IGearValueChainMacroprocess[];
    gearValueChainMacroprocesses: IGearValueChainMacroprocess[];
    currentAccount: any;
    eventSubscriber: Subscription;

    // Variables que utilizar el theme
    subject$: ReplaySubject<IGearValueChainMacroprocess[]> = new ReplaySubject<IGearValueChainMacroprocess[]>(1); // esta es la variable de carga de cada pagina
    data$: Observable<IGearValueChainMacroprocess[]> = this.subject$.asObservable(); // esta es la varialbe de carga de cada dato, listo para visualizar

    // Edicion de la columnas que vamos a Visualizar
    // Cosa por destacar la propiedada isModelProperty es para que los datos que traemos del modelo concuerden con la columnas que vamos a mostrar
    @Input()
    columns: ListColumn[] = [
        { name: 'Id', property: 'id', visible: false, isModelProperty: true },
        { name: 'Nombre', property: 'name', visible: true, isModelProperty: true },
        { name: 'Descripción', property: 'decription', visible: true, isModelProperty: true },
        { name: 'Orden', property: 'order', visible: true, isModelProperty: true },
        { name: 'Categoría', property: 'gearvaluechaincategoryName', visible: true, isModelProperty: true },
        { name: 'Fecha Creación', property: 'creationDate', visible: true, isModelProperty: true },
        { name: 'Fecha Actualización', property: 'lastUpdate', visible: true, isModelProperty: true },
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
        private gearValueChainMacroprocessService: GearValueChainMacroprocessService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        // Componente Necesario para la parte de Login
        private dialog: MatDialog,
        private processService: GearValueChainProcessService,
        private route: ActivatedRoute,
        private _location: Location
    ) {}

    // ====== Con esta funcion se Realiza la carga de datos en una estructura que la tabla entienda OJO
    loadAll() {
        console.log('id capturado', this.route.snapshot.queryParams);

        this.gearValueChainMacroprocessService.query().subscribe(
            (res: HttpResponse<IGearValueChainMacroprocess[]>) => {
                let aux = [];
                this.auxMacro = res.body;

                // Reasignar variable
                this.idCategory = this.route.snapshot.queryParams['idCategory'];
                for (let i = 0; i < this.auxMacro.length; i++) {
                    if (this.auxMacro[i]['gearvaluechaincategoryId'] === Number(this.idCategory)) {
                        aux.push(this.auxMacro[i]);
                    }
                }
                this.gearValueChainMacroprocesses = aux;

                // this.gearValueChainMacroprocesses = res.body;

                // cargar el arreglo a la variable
                const macroprocess = this.gearValueChainMacroprocesses;

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(macroprocess);
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
    createMacroprocess() {
        this.dialog
            .open(MacroprocessCreateUpdateComponent)
            .afterClosed()
            .subscribe((gearMacroprocess: IGearValueChainMacroprocess) => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearMacroprocess) {
                    // ====== start Funcion de Creacion de document type ========

                    this.subscribeToSaveResponse(this.gearValueChainMacroprocessService.create(gearMacroprocess));
                    // ======== End  de creacion de document type ==============

                    // Reflesca la tabla en el Tipo Documento
                    this.subject$.next(this.gearValueChainMacroprocesses);
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
        console.log('Entra al NgOnINit Macropro');
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
        this.registerChangeInGearValueChainMacroprocesses();
    }

    // =========  End  Funcion para cargar la visualizacion de la pagina ==========

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGearValueChainMacroprocesses() {
        this.eventSubscriber = this.eventManager.subscribe('gearValueChainMacroprocessListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    // ======== Start Funciones necesario para la creacion de Dominio ==============

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearValueChainMacroprocess>>) {
        result.subscribe(
            (res: HttpResponse<IGearValueChainMacroprocess>) => this.onSaveSuccess(),
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
    updateMacroprocess(gearMacroprocess) {
        this.dialog
            .open(MacroprocessCreateUpdateComponent, {
                data: gearMacroprocess
            })
            .afterClosed()
            .subscribe(gearMacroprocess => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearMacroprocess) {
                    /**
                     * Here we are updating our local array.
                     * You would probably make an HTTP request here.
                     */
                    this.subscribeToSaveResponse(this.gearValueChainMacroprocessService.update(gearMacroprocess));

                    const index = this.gearValueChainMacroprocesses.findIndex(
                        existingCustomer => existingCustomer.id === gearMacroprocess.id
                    );
                    // Actulizacion de la tabla
                    this.gearValueChainMacroprocesses[index] = gearMacroprocess;
                    this.subject$.next(this.gearValueChainMacroprocesses);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Actualizado', showConfirmButton: false, timer: 2000 });
                }
            });
    }

    // ========= End Funcion se actuliza el componente =============

    // ========= Start Funcion Eliminar el componente =============

    deleteMacroprocess(macroprocess) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        if (macroprocess) {
            let aux = false;

            this.processService.query().subscribe(
                (res: HttpResponse<IGearValueChainProcess[]>) => {
                    this.procesess = res.body;
                    //  ========== Recoorer tipo de documentos ============
                    for (let i = 0; i < this.procesess.length; i++) {
                        if (this.procesess[i].gearvaluechainmacroprocessId === macroprocess.id) {
                            aux = true;
                        }
                    }

                    if (!aux) {
                        this.gearValueChainMacroprocessService.delete(macroprocess.id).subscribe(response => {
                            this.eventManager.broadcast({
                                name: 'gearDomainListModification',
                                content: 'Deleted an gearDomain'
                            });
                            // this.activeModal.dismiss(true);
                        });
                        this.gearValueChainMacroprocesses.splice(
                            this.gearValueChainMacroprocesses.findIndex(existingCustomer => existingCustomer.id === macroprocess.id),
                            1
                        );
                        this.subject$.next(this.gearValueChainMacroprocesses);
                        this.ngOnInit();
                        this.loadAll();
                        swal({ position: 'center', type: 'success', title: 'Eliminado', showConfirmButton: false, timer: 2000 });
                    } else {
                        swal({
                            position: 'center',
                            type: 'warning',
                            text: 'No se puede Eliminar ' + macroprocess.name + ', tiene una dependencia',
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

    // ================
    listProcesses(id, name) {
        this.router.navigate(['/processes'], { queryParams: { idMacro: id, nameMacro: name } });
    }
}
