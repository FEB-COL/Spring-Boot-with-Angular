import { Component, OnInit, OnDestroy, AfterViewInit, Input, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearInformationSystems } from 'app/shared/model/gear-information-systems.model';
import { Principal } from 'app/core';
import { GearInformationSystemsService } from './gear-information-systems.service';
import { Router } from '@angular/router';

/** Coponentes necesarios para agregar el thema de la tabla*/
import { ListColumn } from '../../shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

/** Importacion de Modal Create */
import { InformationSystemCreateUpdateComponent } from './modalsInformationSystems/information-system-create-update.component';
import { IGearDocumentType } from 'app/shared/model/gear-document-type.model';

/**  Consulta Plantillas */
import { GearSystemsFunctionalityService } from './../gear-systems-functionality/gear-systems-functionality.service';
import { IGearSystemsFunctionality } from 'app/shared/model/gear-systems-functionality.model';

/**  Implementacion Sweetalert */
import swal from 'sweetalert2';

import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'jhi-gear-information-systems',
    templateUrl: './gear-information-systems.component.html',
    styleUrls: ['./gear-information-systems.component.scss']
})
export class GearInformationSystemsComponent implements OnInit, AfterViewInit, OnDestroy {
    funcionalities: IGearSystemsFunctionality[];
    dataSource: MatTableDataSource<IGearDocumentType>; // Array de la interface

    gearInformationSystems: IGearInformationSystems[];
    currentAccount: any;
    eventSubscriber: Subscription;

    auxMoneda = 5326;

    // ======================= Variables para el filtadro por Unidad ============
    informationSystemsByUnits: IGearInformationSystems[];
    idUnitLocalStorage: any = localStorage.getItem('key1');
    // ========================================================================

    // Variables que utilizar el theme
    subject$: ReplaySubject<IGearInformationSystems[]> = new ReplaySubject<IGearInformationSystems[]>(1); // esta es la variable de carga de cada pagina
    data$: Observable<IGearInformationSystems[]> = this.subject$.asObservable(); // esta es la varialbe de carga de cada dato, listo para visualizar

    // Edicion de la columnas que vamos a Visualizar
    // Cosa por destacar la propiedada isModelProperty es para que los datos que traemos del modelo concuerden con la columnas que vamos a mostrar
    @Input()
    columns: ListColumn[] = [
        { name: 'Id', property: 'id', visible: false, isModelProperty: true },
        { name: 'Nombre', property: 'name', visible: true, isModelProperty: true },
        { name: 'Descripción', property: 'description', visible: true, isModelProperty: true },
        { name: 'Versión', property: 'version', visible: true, isModelProperty: true },
        // { name: 'Fecha Adquisición', property: 'acquisitionDate', visible: true, isModelProperty: true },
        // { name: 'Fecha Inicio', property: 'startDate', visible: true, isModelProperty: true },
        { name: 'Responsable', property: 'responsible', visible: true, isModelProperty: true },
        { name: 'Email Responsable', property: 'responsibleEmail', visible: true, isModelProperty: true },
        { name: 'Proveedor', property: 'provider', visible: true, isModelProperty: true },
        { name: 'Costo Inicial', property: 'initialCost', visible: true, isModelProperty: true },
        { name: 'Costo Mantenimiento', property: 'mainteinanceCost', visible: true, isModelProperty: true },
        // { name: 'Fecha Creación', property: 'creationDate', visible: true, isModelProperty: true },
        // { name: 'Fecha Modificación ', property: 'modifyDate', visible: true, isModelProperty: true },
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
        private gearInformationSystemsService: GearInformationSystemsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        // Componente Necesario para la parte de Login
        private dialog: MatDialog,
        private functionalityService: GearSystemsFunctionalityService
    ) {}

    // ====== Con esta funcion se Realiza la carga de datos en una estructura que la tabla entienda OJO
    loadAll() {
        // // ============================== Sistemas de Informacion Generales======================================
        // this.gearInformationSystemsService.query().subscribe(
        //     (res: HttpResponse<IGearInformationSystems[]>) => {
        //         this.gearInformationSystems = res.body;
        //
        //         // cargar el arreglo a la variable
        //         const informationSystem = this.gearInformationSystems;
        //
        //         // Assign the data to the data source for the table to render
        //         this.dataSource = new MatTableDataSource(informationSystem);
        //         this.dataSource.paginator = this.paginator;
        //         this.dataSource.sort = this.sort;
        //     },
        //     (res: HttpErrorResponse) => this.onError(res.message)
        // );
        // // ============================== Sistemas de Informacion Generales======================================

        // ============================== Sistemas de informacion por Unidad Organizacional ======================================
        this.gearInformationSystemsService.informationSystemByUnitId(this.idUnitLocalStorage).subscribe(res => {
            this.informationSystemsByUnits = res;

            // for (let i = 0; i < this.informationSystemsByUnits.length; i++) {
            //     this.informationSystemsByUnits[i].initialCost =
            //
            // }

            // Assign the data to the data source for the table to render
            this.dataSource = new MatTableDataSource(this.informationSystemsByUnits);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            console.log('RESULTADOOOOOO', this.informationSystemsByUnits);
        });

        // ============================== Sistemas de informacion por Unidad Organizacional ======================================
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
    createInformationSystem() {
        this.dialog
            .open(InformationSystemCreateUpdateComponent)
            .afterClosed()
            .subscribe((gearInformationSystem: IGearInformationSystems) => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearInformationSystem) {
                    // ====== start Funcion de Creacion de document type ========

                    this.subscribeToSaveResponse(this.gearInformationSystemsService.create(gearInformationSystem));
                    // ======== End  de creacion de document type ==============

                    // Carga de Tabla reflesca los valores
                    this.loadAll();
                    // Reflesca la tabla en el Tipo Documento
                    this.subject$.next(this.informationSystemsByUnits);
                    this.ngOnInit();
                    this.loadAll();
                    swal({
                        position: 'center',
                        type: 'success',
                        title: 'Guardado',
                        showConfirmButton: false,
                        timer: 2000
                    });
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
        this.registerChangeInGearInformationSystems();
    }

    // =========  End  Funcion para cargar la visualizacion de la pagina ==========

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGearInformationSystems() {
        this.eventSubscriber = this.eventManager.subscribe('gearInformationSystemsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    // ======== Start Funciones necesario para la creacion de Dominio ==============

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearInformationSystems>>) {
        result.subscribe(
            (res: HttpResponse<IGearInformationSystems>) => this.onSaveSuccess(),
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
    updateInformationsystem(gearInformationsystem) {
        this.dialog
            .open(InformationSystemCreateUpdateComponent, {
                data: gearInformationsystem
            })
            .afterClosed()
            .subscribe(gearInformationsystem => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearInformationsystem) {
                    /**
                     * Here we are updating our local array.
                     * You would probably make an HTTP request here.
                     */
                    this.subscribeToSaveResponse(this.gearInformationSystemsService.update(gearInformationsystem));

                    const index = this.informationSystemsByUnits.findIndex(
                        existingCustomer => existingCustomer.id === gearInformationsystem.id
                    );
                    // Actulizacion de la tabla
                    this.informationSystemsByUnits[index] = gearInformationsystem;
                    this.subject$.next(this.informationSystemsByUnits);
                    this.ngOnInit();
                    this.loadAll();
                    swal({
                        position: 'center',
                        type: 'success',
                        title: 'Actualizado',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            });
    }

    // ========= End Funcion se actuliza el componente =============

    // ========= Start Funcion Eliminar el componente =============

    deleteInformationsystem(informationsystem) {
        let aux = false;

        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        if (informationsystem) {
            this.functionalityService.query().subscribe(
                (res: HttpResponse<IGearSystemsFunctionality[]>) => {
                    this.funcionalities = res.body;

                    //  ========== Recoorer tipo de documentos ============
                    for (let i = 0; i < this.funcionalities.length; i++) {
                        if (this.funcionalities[i].gearinformationsystemsId === informationsystem.id) {
                            aux = true;
                        }
                    }

                    if (!aux) {
                        this.gearInformationSystemsService.delete(informationsystem.id).subscribe(response => {
                            this.eventManager.broadcast({
                                name: 'gearDomainListModification',
                                content: 'Deleted an gearDomain'
                            });
                            // this.activeModal.dismiss(true);
                        });
                        this.informationSystemsByUnits.splice(
                            this.informationSystemsByUnits.findIndex(existingCustomer => existingCustomer.id === informationsystem.id),
                            1
                        );
                        this.subject$.next(this.informationSystemsByUnits);
                        this.ngOnInit();
                        this.loadAll();
                        swal({
                            position: 'center',
                            type: 'success',
                            title: 'Eliminado',
                            showConfirmButton: false,
                            timer: 2000
                        });
                    } else {
                        swal({
                            position: 'center',
                            type: 'warning',
                            text: 'No se puede Eliminar ' + informationsystem.name + ', tiene una dependencia',
                            showConfirmButton: true
                        });
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    // ========= End Funcion Eliminar el componente =============

    listFuncionalities(id, name) {
        this.router.navigate(['/funcionalities'], {
            queryParams: {
                idInformationSystem: id,
                nameInformationSystems: name
            }
        });
    }
}
