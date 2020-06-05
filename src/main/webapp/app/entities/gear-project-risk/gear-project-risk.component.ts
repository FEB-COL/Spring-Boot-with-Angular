import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearProjectRisk } from 'app/shared/model/gear-project-risk.model';
import { Principal } from 'app/core';
import { GearProjectRiskService } from './gear-project-risk.service';

/** Coponentes necesarios para agregar el thema de la tabla*/
import { ListColumn } from '../../shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

/** Importacion de Modal Create */
import { Location } from '@angular/common';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectRiskCreateUpdateComponent } from 'app/entities/gear-project-risk/modalsProjectsRisk/project-risk-create-update.component';
import { IGearProject } from 'app/shared/model/gear-project.model';

/** Implementacion Sweetalert  */
import swal from 'sweetalert2';

@Component({
    selector: 'jhi-gear-project-risk',
    templateUrl: './gear-project-risk.component.html',
    styleUrls: ['./gear-project-risk.component.scss']
})
export class GearProjectRiskComponent implements OnInit, AfterViewInit, OnDestroy {
    projects: IGearProject[];
    idProject: string;
    dataSource: MatTableDataSource<IGearProjectRisk>; // Array de la interface

    auxProjectRisks: IGearProjectRisk[];
    gearProjectRisks: IGearProjectRisk[];
    currentAccount: any;
    eventSubscriber: Subscription;

    // Variables que utilizar el theme
    subject$: ReplaySubject<IGearProjectRisk[]> = new ReplaySubject<IGearProjectRisk[]>(1); // esta es la variable de carga de cada pagina
    data$: Observable<IGearProjectRisk[]> = this.subject$.asObservable(); // esta es la varialbe de carga de cada dato, listo para visualizar

    // Edicion de la columnas que vamos a Visualizar
    // Cosa por destacar la propiedada isModelProperty es para que los datos que traemos del modelo concuerden con la columnas que vamos a mostrar
    @Input()
    columns: ListColumn[] = [
        { name: 'Id', property: 'id', visible: false, isModelProperty: true },
        { name: 'Estado', property: 'status', visible: true, isModelProperty: true },
        // { name: 'Impacto', property: 'impact', visible: true, isModelProperty: true },
        { name: 'Descripción', property: 'description', visible: true, isModelProperty: true },
        // { name: 'Fecha Modificación', property: 'firstImpactDate', visible: true, isModelProperty: true },
        // { name: 'Mitigacion Estrategica', property: 'mitigationStrategy', visible: true, isModelProperty: true },
        // { name: 'Descripción Mitigacion', property: 'mitigationDescription', visible: true, isModelProperty: true },
        // { name: 'Fecha Esperada Cierre', property: 'expectedCloseDate', visible: true, isModelProperty: true },
        // { name: 'Creado Por', property: 'createdBy', visible: true, isModelProperty: true },
        // { name: 'Fecha Creación', property: 'creationDate', visible: true, isModelProperty: true },
        // { name: 'Modificado Por', property: 'lastModifiedBy', visible: true, isModelProperty: true },
        // { name: 'Fecha Modificación', property: 'lastModifiedDate', visible: true, isModelProperty: true },
        { name: 'Proyecto', property: 'gearProjectName', visible: true, isModelProperty: true },
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
        private gearProjectRiskService: GearProjectRiskService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        // Componente Necesario para la parte de Login
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private _location: Location
    ) {}

    loadAll() {
        this.gearProjectRiskService.query().subscribe(
            (res: HttpResponse<IGearProjectRisk[]>) => {
                let aux = []; // variable auxiliar para reasignar valor
                this.auxProjectRisks = res.body;
                this.idProject = this.route.snapshot.queryParams['idProject'];

                for (let i = 0; i < this.auxProjectRisks.length; i++) {
                    if (this.auxProjectRisks[i]['gearProjectId'] === Number(this.idProject)) {
                        aux.push(this.auxProjectRisks[i]);
                    }
                }

                this.gearProjectRisks = aux;

                // cargar el arreglo a la variable
                const riesgos = this.gearProjectRisks;

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(riesgos);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
        this.registerChangeInGearProjectRisks();
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
    createProjectRisk() {
        this.dialog
            .open(ProjectRiskCreateUpdateComponent)
            .afterClosed()
            .subscribe((gearProjectrisk: IGearProjectRisk) => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearProjectrisk) {
                    // ====== start Funcion de Creacion de document type ========
                    this.subscribeToSaveResponse(this.gearProjectRiskService.create(gearProjectrisk));
                    // ======== End  de creacion de document type ==============

                    // Reflesca la tabla en el Tipo Documento
                    this.subject$.next(this.gearProjectRisks);
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

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGearProjectRisks() {
        this.eventSubscriber = this.eventManager.subscribe('gearProjectRiskListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    // ======== Start Funciones necesario para la creacion de Dominio ==============

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearProjectRisk>>) {
        result.subscribe((res: HttpResponse<IGearProjectRisk>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }

    // ======== End  Funciones necesario para la creacion de Dominio ==============

    // ========= Start Funcion se actuliza el componente =============
    updateRiskProject(gearRiskProject) {
        this.dialog
            .open(ProjectRiskCreateUpdateComponent, {
                data: gearRiskProject
            })
            .afterClosed()
            .subscribe(gearRiskProject => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearRiskProject) {
                    /**
                     * Here we are updating our local array.
                     * You would probably make an HTTP request here.
                     */
                    this.subscribeToSaveResponse(this.gearProjectRiskService.update(gearRiskProject));

                    const index = this.gearProjectRisks.findIndex(existingCustomer => existingCustomer.id === gearRiskProject.id);
                    // Actulizacion de la tabla
                    this.gearProjectRisks[index] = gearRiskProject;
                    this.subject$.next(this.gearProjectRisks);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Actualizado', showConfirmButton: false, timer: 2000 });
                }
            });
    }

    // ========= End Funcion se actuliza el componente =============

    // ========= Start Funcion Eliminar el componente =============

    deleteProjectRisk(riskProject) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        if (riskProject) {
            this.gearProjectRiskService.delete(riskProject.id).subscribe(response => {
                this.eventManager.broadcast({
                    name: 'gearDomainListModification',
                    content: 'Deleted an gearDomain'
                });
                // this.activeModal.dismiss(true);
            });
            this.gearProjectRisks.splice(this.gearProjectRisks.findIndex(existingCustomer => existingCustomer.id === riskProject.id), 1);
            this.subject$.next(this.gearProjectRisks);
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
