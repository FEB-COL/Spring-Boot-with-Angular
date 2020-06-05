import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearProject } from 'app/shared/model/gear-project.model';
import { Principal } from 'app/core';
import { GearProjectService } from './gear-project.service';
import { ActivatedRoute, Router } from '@angular/router';

/** Coponentes necesarios para agregar el thema de la tabla*/
import { ListColumn } from '../../shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

/** Consulta dependencias */

/**  Importacion de Modal Create */
import { ProjectCreateUpdateComponent } from './modalsProjects/project-create-update.component';

/**  Implementacion Sweetalert */
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { IGearPortfolio } from 'app/shared/model/gear-portfolio.model';
import { IGearProjectRisk } from 'app/shared/model/gear-project-risk.model';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { IGearDocumentType } from 'app/shared/model/gear-document-type.model';
import { GearProjectRiskService } from 'app/entities/gear-project-risk';

@Component({
    selector: 'jhi-gear-project',
    templateUrl: './gear-project.component.html',
    styleUrls: ['./gear-project.component.scss']
})
export class GearProjectComponent implements OnInit, AfterViewInit, OnDestroy {
    risks: IGearProjectRisk[];
    idPortfolio: IGearPortfolio[];
    dataSource: MatTableDataSource<IGearProject>; // Array de la interface

    auxProjects: IGearProject[];
    gearProjects: IGearProject[];
    currentAccount: any;
    eventSubscriber: Subscription;

    // Variables que utilizar el theme
    subject$: ReplaySubject<IGearProject[]> = new ReplaySubject<IGearProject[]>(1); // esta es la variable de carga de cada pagina
    data$: Observable<IGearProject[]> = this.subject$.asObservable(); // esta es la varialbe de carga de cada dato, listo para visualizar

    // Edicion de la columnas que vamos a Visualizar
    // Cosa por destacar la propiedada isModelProperty es para que los datos que traemos del modelo concuerden con la columnas que vamos a mostrar
    @Input()
    columns: ListColumn[] = [
        { name: 'Id', property: 'id', visible: false, isModelProperty: true },
        { name: 'Nombre', property: 'name', visible: true, isModelProperty: true },
        { name: 'Descripción', property: 'description', visible: true, isModelProperty: true },
        // { name: 'Presupuesto', property: 'budget', visible: true, isModelProperty: true },
        // { name: 'Procentaje', property: 'percentageCompleted', visible: true, isModelProperty: true },
        // { name: 'Gastado', property: 'spend', visible: true, isModelProperty: true },
        // { name: 'Fecha Inicial', property: 'startDate', visible: true, isModelProperty: true },
        // { name: 'Fecha Final', property: 'endDate', visible: true, isModelProperty: true },
        // { name: 'Adjuntar', property: 'attach', visible: true, isModelProperty: true },
        // { name: 'Creado Por', property: 'createdBy', visible: true, isModelProperty: true },
        // { name: 'Fecha Creación', property: 'creationDate', visible: true, isModelProperty: true },
        // { name: 'Modificado Por', property: 'lastModifiedBy', visible: true, isModelProperty: true },
        // { name: 'Fecha Modificación', property: 'lastModifiedDate', visible: true, isModelProperty: true },
        { name: 'Portafolio', property: 'gearPortfolioName', visible: true, isModelProperty: true },
        { name: 'Acciones', property: 'actions', visible: true }
    ] as ListColumn[];
    pageSize = 10;
    @ViewChild(MatPaginator)
    paginator: MatPaginator;
    @ViewChild(MatSort)
    sort: MatSort;

    // Variables para la creacion-Eliminacion y Edicion de Dominio
    isSaving: boolean;

    constructor(
        private gearProjectService: GearProjectService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        // Componente Necesario para la parte de Login
        private dialog: MatDialog,
        private projectRiskService: GearProjectRiskService,
        private route: ActivatedRoute,
        private _location: Location
    ) {}

    loadAll() {
        this.gearProjectService.query().subscribe(
            (res: HttpResponse<IGearProject[]>) => {
                let aux = []; // variable auxiliar para reasignar valor
                this.auxProjects = res.body;
                this.idPortfolio = this.route.snapshot.queryParams['idPortfolio'];

                for (let i = 0; i < this.auxProjects.length; i++) {
                    if (this.auxProjects[i]['gearPortfolioId'] === Number(this.idPortfolio)) {
                        aux.push(this.auxProjects[i]);
                    }
                }

                this.gearProjects = aux;

                // cargar el arreglo a la variable
                const proyectos = this.gearProjects;

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(proyectos);
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
        this.registerChangeInGearProjects();
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

    // ========= start Para la craecion  OJO ===================
    createProject() {
        this.dialog
            .open(ProjectCreateUpdateComponent)
            .afterClosed()
            .subscribe((gearPorject: IGearProject) => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearPorject) {
                    console.log('entro en la creacion');

                    // ====== start Funcion de Creacion de document type ========
                    this.subscribeToSaveResponse(this.gearProjectService.create(gearPorject));
                    // ======== End  de creacion de document type ==============

                    // Reflesca la tabla en el Tipo Documento
                    this.subject$.next(this.gearProjects);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Guardado', showConfirmButton: false, timer: 2000 });
                }
            });
    }
    // =========End  Para la craecion OJO ===================

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

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGearProjects() {
        this.eventSubscriber = this.eventManager.subscribe('gearProjectListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    // ======== Start Funciones necesario para la creacion  ==============
    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearDocumentType>>) {
        result.subscribe((res: HttpResponse<IGearDocumentType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }
    // ======== End  Funciones necesario para la creacion  ==============

    // ========= Start Funcion se actuliza el componente =============
    updateProject(gearProject) {
        this.dialog
            .open(ProjectCreateUpdateComponent, {
                data: gearProject
            })
            .afterClosed()
            .subscribe(gearProject => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearProject) {
                    /**
                     * Here we are updating our local array.
                     * You would probably make an HTTP request here.
                     */
                    this.subscribeToSaveResponse(this.gearProjectService.update(gearProject));

                    const index = this.gearProjects.findIndex(existingCustomer => existingCustomer.id === gearProject.id);
                    // Actulizacion de la tabla
                    this.gearProjects[index] = gearProject;
                    this.subject$.next(this.gearProjects);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Actualizado', showConfirmButton: false, timer: 2000 });
                }
            });
    }
    // ========= End Funcion se actuliza el componente =============

    // ========= Start Funcion Eliminar el componente =============
    deleteProject(project) {
        let aux = false;
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        if (project) {
            this.projectRiskService.query().subscribe(
                (res: HttpResponse<IGearProjectRisk[]>) => {
                    this.risks = res.body;
                    console.log('Consultado Plantillas', this.risks);

                    //  ========== Recoorer tipo de documentos ============
                    for (let i = 0; i < this.risks.length; i++) {
                        if (this.risks[i].gearProjectId === project.id) {
                            aux = true;
                        }
                    }

                    if (!aux) {
                        console.log('CUMPLE PARA ELIMINAR ######', aux);

                        this.gearProjectService.delete(project.id).subscribe(response => {
                            this.eventManager.broadcast({
                                name: 'gearDomainListModification',
                                content: 'Deleted an gearDomain'
                            });
                            // this.activeModal.dismiss(true);
                        });
                        this.gearProjects.splice(this.gearProjects.findIndex(existingCustomer => existingCustomer.id === project.id), 1);
                        this.subject$.next(this.gearProjects);
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
                        console.log('NO CUMPLE PARA ₵₵₵₵₵₵₵₵', aux);
                        swal({
                            position: 'center',
                            type: 'warning',
                            text: 'No se puede Eliminar ' + project.name + ', tiene una dependencia',
                            showConfirmButton: true
                        });
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }
    // ========= End Funcion Eliminar el componente =============

    /** Redireccionar vista para crear preguntas del diagnostico */
    listRisk(id, name) {
        this.router.navigate(['/riskProjects'], { queryParams: { idProject: id, nameProject: name } });
    }

    /** ==== Funcion para retorceder vista */
    backClicked() {
        this._location.back();
    }
}
