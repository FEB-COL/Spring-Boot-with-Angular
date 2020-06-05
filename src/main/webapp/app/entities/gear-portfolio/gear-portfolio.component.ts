import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearPortfolio } from 'app/shared/model/gear-portfolio.model';
import { Principal } from 'app/core';
import { GearPortfolioService } from './gear-portfolio.service';

/** Coponentes necesarios para agregar el thema de la tabla*/
import { ListColumn } from '../../shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

/** Importacion de Modal Create */
import { PortfolioCreateUpdateComponent } from './modalsPortfolios/portfolio-create-update.component';

/** Consulta Poryectos */
import { IGearProject } from 'app/shared/model/gear-project.model';
import { GearProjectService } from 'app/entities/gear-project';

/** Implementacion Sweetalert */
import swal from 'sweetalert2';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { IGearDocumentType } from 'app/shared/model/gear-document-type.model';

@Component({
    selector: 'jhi-gear-portfolio',
    templateUrl: './gear-portfolio.component.html',
    styleUrls: ['./gear-portfolio.component.scss']
})
export class GearPortfolioComponent implements OnInit, AfterViewInit, OnDestroy {
    projects: IGearProject[];
    dataSource: MatTableDataSource<IGearPortfolio>; // Array de la interface

    gearPortfolios: IGearPortfolio[];
    currentAccount: any;
    eventSubscriber: Subscription;

    // ======================= Variables para el filtadro por Unidad ============
    portfoliosByUnits: IGearPortfolio[];
    idUnitLocalStorage: any = localStorage.getItem('key1');
    // ========================================================================

    // Variables que utilizar el theme
    subject$: ReplaySubject<IGearPortfolio[]> = new ReplaySubject<IGearPortfolio[]>(1); // esta es la variable de carga de cada pagina
    data$: Observable<IGearPortfolio[]> = this.subject$.asObservable(); // esta es la varialbe de carga de cada dato, listo para visualizar

    // Edicion de la columnas que vamos a Visualizar
    // Cosa por destacar la propiedada isModelProperty es para que los datos que traemos del modelo concuerden con la columnas que vamos a mostrar
    @Input()
    columns: ListColumn[] = [
        { name: 'Id', property: 'id', visible: false, isModelProperty: true },
        { name: 'Nombre', property: 'name', visible: true, isModelProperty: true },
        { name: 'Descripción', property: 'description', visible: true, isModelProperty: true },
        // { name: 'Fecha Inicio', property: 'startDate', visible: true, isModelProperty: true },
        // { name: 'Creado Por', property: 'createdBy', visible: true, isModelProperty: true },
        // { name: 'Fecha Creación', property: 'creationDate', visible: true, isModelProperty: true },
        // { name: 'Modificado por', property: 'lastModifiedBy', visible: true, isModelProperty: true },
        // { name: 'Fecha Modificación', property: 'lastModifiedDate', visible: true, isModelProperty: true },

        { name: 'Acciones', property: 'actions', visible: true }
    ] as ListColumn[];
    pageSize = 10;
    @ViewChild(MatPaginator)
    paginator: MatPaginator;
    @ViewChild(MatSort)
    sort: MatSort;

    // Variables para la creacion-Eliminacion y Edicion
    isSaving: boolean;

    constructor(
        private gearPortfolioService: GearPortfolioService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        // Componente Necesario para la parte de Login
        private dialog: MatDialog,
        // tipo Docuemntos
        private projectService: GearProjectService
    ) {}

    loadAll() {
        // // ============================== Portfolios Generales======================================
        // this.gearPortfolioService.query().subscribe(
        //     (res: HttpResponse<IGearPortfolio[]>) => {
        //         this.gearPortfolios = res.body;
        //
        //         // cargar el arreglo a la variable
        //         const portfolios = this.gearPortfolios;
        //
        //         // Assign the data to the data source for the table to render
        //         this.dataSource = new MatTableDataSource(portfolios);
        //         this.dataSource.paginator = this.paginator;
        //         this.dataSource.sort = this.sort;
        //     },
        //     (res: HttpErrorResponse) => this.onError(res.message)
        // );
        // // ============================== Portfolios Generales======================================

        this.gearPortfolioService.portfolioByUnitId(this.idUnitLocalStorage).subscribe(res => {
            this.portfoliosByUnits = res;

            // cargar el arreglo a la variable
            const portfoliosUnit = this.portfoliosByUnits;

            // Assign the data to the data source for the table to render
            this.dataSource = new MatTableDataSource(portfoliosUnit);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            console.log('RESULTADOooooo', this.portfoliosByUnits);
        });
    }

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
        this.registerChangeInGearPortfolios();
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

    // // Para la craecion de Domonios OJO
    createPorfolio() {
        this.dialog
            .open(PortfolioCreateUpdateComponent)
            .afterClosed()
            .subscribe((gearPortfolio: IGearPortfolio) => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearPortfolio) {
                    console.log('entro en la creacion');
                    console.log('lo que se guardara', gearPortfolio);

                    // Funcion de Creacion de Dominio
                    this.subscribeToSaveResponse(this.gearPortfolioService.create(gearPortfolio));
                    // Fin de creacion de dominio

                    this.subject$.next(this.portfoliosByUnits);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Guardado', showConfirmButton: false, timer: 2000 });
                }
            });
    }

    onFilterChange(value) {
        if (!this.dataSource) {
            return;
        }
        value = value.trim();
        value = value.toLowerCase();
        this.dataSource.filter = value;
    }

    /**
     * End Funciones
     */

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGearPortfolio) {
        return item.id;
    }

    registerChangeInGearPortfolios() {
        this.eventSubscriber = this.eventManager.subscribe('gearPortfolioListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    // =================== Funciones necesario para la creacion de Dominio  =======================
    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearPortfolio>>) {
        result.subscribe((res: HttpResponse<IGearPortfolio>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }
    // ====================== en esta Funcion se actuliza el componente ===============================

    // ====================== en esta Funcion se actuliza el componente ===============================

    updatePortfolio(gearPorfolio) {
        this.dialog
            .open(PortfolioCreateUpdateComponent, {
                data: gearPorfolio
            })
            .afterClosed()
            .subscribe(gearPorfolio => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearPorfolio) {
                    /**
                     * Here we are updating our local array.
                     * You would probably make an HTTP request here.
                     */
                    this.subscribeToSaveResponse(this.gearPortfolioService.update(gearPorfolio));

                    const index = this.portfoliosByUnits.findIndex(existingCustomer => existingCustomer.id === gearPorfolio.id);
                    // Actulizacion de la tabla
                    this.portfoliosByUnits[index] = gearPorfolio;
                    this.subject$.next(this.portfoliosByUnits);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Actualizado', showConfirmButton: false, timer: 2000 });
                }
            });
    }
    // ====================== en esta Funcion se actuliza el componente ===============================

    // ====================== en esta Funcion se Elimina el componente ===============================
    deletePortfolio(portfolio) {
        let aux = false;

        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        if (portfolio) {
            this.projectService.query().subscribe(
                (res: HttpResponse<IGearDocumentType[]>) => {
                    this.projects = res.body;
                    console.log('Consultado tipo Documentos', this.projects);

                    // Recoorer tipo de documentos
                    for (let i = 0; i < this.projects.length; i++) {
                        if (this.projects[i].gearPortfolioId === portfolio.id) {
                            aux = true;
                        }
                    }

                    if (!aux) {
                        console.log('CUMPLE PARA ELIMINAR ######', aux);

                        this.gearPortfolioService.delete(portfolio.id).subscribe(response => {
                            this.eventManager.broadcast({
                                name: 'gearDomainListModification',
                                content: 'Deleted an gearDomain'
                            });
                        });
                        this.portfoliosByUnits.splice(
                            this.portfoliosByUnits.findIndex(existingCustomer => existingCustomer.id === portfolio.id),
                            1
                        );
                        this.subject$.next(this.portfoliosByUnits);
                        this.ngOnInit();
                        this.loadAll();
                        swal({ position: 'center', type: 'success', title: 'Eliminado', showConfirmButton: false, timer: 2000 });
                    } else {
                        console.log('NO CUMPLE PARA ₵₵₵₵₵₵₵₵', aux);
                        swal({
                            position: 'center',
                            type: 'warning',
                            text: 'No se puede Eliminar ' + portfolio.name + ', tiene una dependencia',
                            showConfirmButton: true
                        });
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }
    // ====================== en esta Funcion se Elimina el componente ===============================

    /**  Redireccionar vista para crear preguntas del diagnostico */
    listProjects(id, name) {
        this.router.navigate(['/projects'], { queryParams: { idPortfolio: id, namePortfolio: name } });
    }
}
