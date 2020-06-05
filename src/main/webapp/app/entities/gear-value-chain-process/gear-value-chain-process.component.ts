import { AfterViewInit, Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearValueChainProcess } from 'app/shared/model/gear-value-chain-process.model';
import { Principal } from 'app/core';
import { GearValueChainProcessService } from './gear-value-chain-process.service';
import { ActivatedRoute, Router } from '@angular/router';

/** Coponentes necesarios para agregar el thema de la tabla*/
import { ListColumn } from '../../shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

/**  Importacion de Modal Create */
import { ProcessCreateUpdateComponent } from './modalsProcess/process-create-update.component';
import { Location } from '@angular/common';

/** Implementacion Sweetalert */
import swal from 'sweetalert2';

@Component({
    selector: 'jhi-gear-value-chain-process',
    templateUrl: './gear-value-chain-process.component.html',
    styleUrls: ['./gear-value-chain-process.component.scss']
})
export class GearValueChainProcessComponent implements OnInit, OnDestroy, AfterViewInit {
    idMacro: string;

    // Arreglo que contiene los items para la tabla
    displayedColumns: string[] = ['id', 'name', 'decription', 'attach', 'inputs', 'outputs', 'gearvaluechainmacroprocessName', 'accion']; // nombre de las columnas
    dataSource: MatTableDataSource<IGearValueChainProcess>; // Array de la interface

    auxMacro: IGearValueChainProcess[];
    gearValueChainProcesses: IGearValueChainProcess[];
    currentAccount: any;
    eventSubscriber: Subscription;

    // Variables que utilizar el theme
    subject$: ReplaySubject<IGearValueChainProcess[]> = new ReplaySubject<IGearValueChainProcess[]>(1); // esta es la variable de carga de cada pagina
    data$: Observable<IGearValueChainProcess[]> = this.subject$.asObservable(); // esta es la varialbe de carga de cada dato, listo para visualizar

    // Edicion de la columnas que vamos a Visualizar
    // Cosa por destacar la propiedada isModelProperty es para que los datos que traemos del modelo concuerden con la columnas que vamos a mostrar
    @Input()
    columns: ListColumn[] = [
        { name: 'Id', property: 'id', visible: false, isModelProperty: true },
        { name: 'Nombre', property: 'name', visible: true, isModelProperty: true },
        { name: 'Descripción', property: 'decription', visible: true, isModelProperty: true },
        { name: 'Adjunto', property: 'attach', visible: true, isModelProperty: true },
        { name: 'Inputs', property: 'inputs', visible: true, isModelProperty: true },
        { name: 'Outputs', property: 'outputs', visible: true, isModelProperty: true },
        { name: 'MacroProcesos', property: 'gearvaluechainmacroprocessName', visible: true, isModelProperty: true },
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
        private gearValueChainProcessService: GearValueChainProcessService,
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
        console.log('id capturado ', this.route.snapshot.queryParams);

        this.gearValueChainProcessService.query().subscribe(
            (res: HttpResponse<IGearValueChainProcess[]>) => {
                let aux = [];
                this.auxMacro = res.body;

                console.log('%%%%%%%%%', this.route.snapshot.queryParams['idMacro']);

                // Reasignar variable
                this.idMacro = this.route.snapshot.queryParams['idMacro'];
                console.log('========= el valor del ID de que muestra  ', this.idMacro);

                for (let i = 0; i < this.auxMacro.length; i++) {
                    if (this.auxMacro[i]['gearvaluechainmacroprocessId'] === Number(this.idMacro)) {
                        aux.push(this.auxMacro[i]);
                    }
                }

                this.gearValueChainProcesses = aux;

                // this.gearValueChainProcesses = res.body;

                // cargar el arreglo a la variable
                const process = this.gearValueChainProcesses;

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(process);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;

                console.log('Procesos traido de BD', this.gearValueChainProcesses);
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
    createProcess() {
        this.dialog
            .open(ProcessCreateUpdateComponent)
            .afterClosed()
            .subscribe((gearProcess: IGearValueChainProcess) => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearProcess) {
                    console.log('entro en la creacion');

                    // ====== start Funcion de Creacion de document type ========

                    this.subscribeToSaveResponse(this.gearValueChainProcessService.create(gearProcess));
                    console.log('elementos de Dominios', this.gearValueChainProcesses);
                    // ======== End  de creacion de document type ==============

                    // Carga de Tabla reflesca los valores
                    this.loadAll();
                    // Reflesca la tabla en el Tipo Documento
                    this.subject$.next(this.gearValueChainProcesses);
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
        console.log('Entra al NgOnINit Procesos');
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
        this.registerChangeInGearValueChainProcesses();
    }
    // =========  End  Funcion para cargar la visualizacion de la pagina ==========

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGearValueChainProcesses() {
        this.eventSubscriber = this.eventManager.subscribe('gearValueChainProcessListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    // ======== Start Funciones necesario para la creacion de Dominio ==============

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearValueChainProcess>>) {
        result.subscribe(
            (res: HttpResponse<IGearValueChainProcess>) => this.onSaveSuccess(),
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
    updateProcess(gearProcess) {
        this.dialog
            .open(ProcessCreateUpdateComponent, {
                data: gearProcess
            })
            .afterClosed()
            .subscribe(gearProcess => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearProcess) {
                    /**
                     * Here we are updating our local array.
                     * You would probably make an HTTP request here.
                     */
                    this.subscribeToSaveResponse(this.gearValueChainProcessService.update(gearProcess));

                    const index = this.gearValueChainProcesses.findIndex(existingCustomer => existingCustomer.id === gearProcess.id);
                    // Actulizacion de la tabla
                    this.gearValueChainProcesses[index] = gearProcess;
                    this.subject$.next(this.gearValueChainProcesses);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Actualizado', showConfirmButton: false, timer: 2000 });
                }
            });
    }
    // ========= End Funcion se actuliza el componente =============

    // ========= Start Funcion Eliminar el componente =============

    deleteProcess(process) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        if (process) {
            this.gearValueChainProcessService.delete(process.id).subscribe(response => {
                this.eventManager.broadcast({
                    name: 'gearDomainListModification',
                    content: 'Deleted an gearDomain'
                });
                // this.activeModal.dismiss(true);
            });
            this.gearValueChainProcesses.splice(
                this.gearValueChainProcesses.findIndex(existingCustomer => existingCustomer.id === process.id),
                1
            );
            this.subject$.next(this.gearValueChainProcesses);
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
