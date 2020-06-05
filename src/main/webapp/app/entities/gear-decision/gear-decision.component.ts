import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearDecision } from 'app/shared/model/gear-decision.model';
import { Principal } from 'app/core';
import { GearDecisionService } from './gear-decision.service';
import { GearCriteriaService } from './../gear-criteria/gear-criteria.service';
import { Router } from '@angular/router';

/** Coponentes necesarios para agregar el thema de la tabla*/
import { ListColumn } from '../../shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

/** Importacion de Modal Create */
import { GearDecisionCreateUpdateComponent } from './modalsDecision/gear-decision-create-update.component';
import { IGearCriteria } from 'app/shared/model/gear-criteria.model';

/** Implementacion Sweetalert */
import swal from 'sweetalert2';

@Component({
    selector: 'jhi-gear-decision',
    templateUrl: './gear-decision.component.html',
    styleUrls: ['./gear-decision.component.scss']
})
export class GearDecisionComponent implements OnInit, AfterViewInit, OnDestroy {
    criterias: IGearCriteria[];

    dataSource: MatTableDataSource<IGearDecision>; // Array de la interface

    gearDecisions: IGearDecision[];
    currentAccount: any;
    eventSubscriber: Subscription;

    //Variables que utilizar el theme
    subject$: ReplaySubject<IGearDecision[]> = new ReplaySubject<IGearDecision[]>(1); // esta es la variable de carga de cada pagina
    data$: Observable<IGearDecision[]> = this.subject$.asObservable(); // esta es la varialbe de carga de cada dato, listo para visualizar

    //Edicion de la columnas que vamos a Visualizar
    //Cosa por destacar la propiedada isModelProperty es para que los datos que traemos del modelo concuerden con la columnas que vamos a mostrar
    @Input()
    columns: ListColumn[] = [
        { name: 'Id', property: 'id', visible: false, isModelProperty: true },
        { name: 'Nombre', property: 'name', visible: true, isModelProperty: true },
        { name: 'Meta', property: 'goal', visible: true, isModelProperty: true },
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
        private gearDecisionService: GearDecisionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        //Componente Necesario para la parte de Login
        private dialog: MatDialog,
        private criteriaService: GearCriteriaService
    ) {}

    //Con esta funcion se Realiza la carga de datos en una estructura que la tabla entienda OJO
    loadAll() {
        console.log('Dentro de load ALl');
        this.gearDecisionService.query().subscribe(
            (res: HttpResponse<IGearDecision[]>) => {
                this.gearDecisions = res.body;
                // cargar el arreglo a la variable
                const decision = this.gearDecisions;

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(decision);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;

                console.log('Desiciones traido de BD', this.gearDecisions);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    /** Funciones Necesarias que Funcionan con el thema Fury */
    get visibleColumns() {
        return this.columns.filter(column => column.visible).map(column => column.property);
    }

    ngAfterViewInit() {
        //Con el llamado esta Funcion Cargamos los datos y los datos de pagina y sort que necesitamos para la tabla
        this.loadAll();
    }

    // ========= start Para la craecion de Domonios OJO ===================
    createDesicion() {
        this.dialog
            .open(GearDecisionCreateUpdateComponent)
            .afterClosed()
            .subscribe((gearDesicion: IGearDecision) => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearDesicion) {
                    console.log('entro en la creacion');

                    // ====== start Funcion de Creacion de document type ========

                    this.subscribeToSaveResponse(this.gearDecisionService.create(gearDesicion));
                    console.log('elementos de Decisiones', this.gearDecisions);
                    // ======== End  de creacion de document type ==============

                    // Carga de Tabla reflesca los valores
                    this.loadAll();
                    // Reflesca la tabla en el Tipo Documento
                    this.subject$.next(this.gearDecisions);
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

    /** End Funciones */

    /** Funcion para cargar la visualizacion de la pagina*/
    ngOnInit() {
        console.log('Entra al NgOnINit Desicion');
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
        this.registerChangeInGearDecisions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGearDecisions() {
        this.eventSubscriber = this.eventManager.subscribe('gearDecisionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    // ======== Start Funciones necesario para la creacion de Dominio ==============

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearDecision>>) {
        result.subscribe((res: HttpResponse<IGearDecision>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }

    // ======== End  Funciones necesario para la creacion de Dominio ==============

    // ========= Start Funcion se actuliza el componente =============
    updateDesicion(gearDesicion) {
        this.dialog
            .open(GearDecisionCreateUpdateComponent, {
                data: gearDesicion
            })
            .afterClosed()
            .subscribe(gearDesicion => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearDesicion) {
                    /**
                     * Here we are updating our local array.
                     * You would probably make an HTTP request here.
                     */
                    this.subscribeToSaveResponse(this.gearDecisionService.update(gearDesicion));

                    const index = this.gearDecisions.findIndex(existingCustomer => existingCustomer.id === gearDesicion.id);
                    // Actulizacion de la tabla
                    this.gearDecisions[index] = gearDesicion;
                    this.subject$.next(this.gearDecisions);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Actualizado', showConfirmButton: false, timer: 2000 });
                }
            });
    }

    // ========= End Funcion se actuliza el componente =============

    // ========= Start Funcion Eliminar el componente =============

    deleteDesicion(desicion) {
        let aux = false;

        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        if (desicion) {
            this.criteriaService.query().subscribe(
                (res: HttpResponse<IGearCriteria[]>) => {
                    this.criterias = res.body;

                    //  ========== Recoorer Criterios ============
                    for (let i = 0; i < this.criterias.length; i++) {
                        if (this.criterias[i].geardecisionId === desicion.id) {
                            aux = true;
                        }
                    }

                    if (!aux) {
                        this.gearDecisionService.delete(desicion.id).subscribe(response => {
                            this.eventManager.broadcast({
                                name: 'gearDomainListModification',
                                content: 'Deleted an gearDomain'
                            });
                            // this.activeModal.dismiss(true);
                        });
                        this.gearDecisions.splice(this.gearDecisions.findIndex(existingCustomer => existingCustomer.id === desicion.id), 1);
                        this.subject$.next(this.gearDecisions);
                        this.ngOnInit();
                        this.loadAll();
                        swal({ position: 'center', type: 'success', title: 'Eliminado', showConfirmButton: false, timer: 2000 });
                    } else {
                        swal({
                            position: 'center',
                            type: 'warning',
                            text: 'No se puede Eliminar ' + desicion.name + ', tiene una dependencia',
                            showConfirmButton: true
                        });
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }
    // ========= End Funcion Eliminar el componente =============

    listcriteria(id, name) {
        this.router.navigate(['/criteria'], { queryParams: { idDecision: id, nameDecision: name } });
    }

    listOption(id, name) {
        this.router.navigate(['/options'], { queryParams: { idDecision: id, nameDecision: name } });
    }
}
