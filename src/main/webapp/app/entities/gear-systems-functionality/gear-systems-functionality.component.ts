import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearSystemsFunctionality } from 'app/shared/model/gear-systems-functionality.model';
import { Principal } from 'app/core';
import { GearSystemsFunctionalityService } from './gear-systems-functionality.service';
import { ActivatedRoute, Router } from '@angular/router';

/** Coponentes necesarios para agregar el thema de la tabla*/
import { ListColumn } from '../../shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

/** Importacion de Modal Create */
import { SystemFuncionalityCreateUpdateComponent } from './modalsSystemsFuncionality/system-funcionality-create-update.component';
import { IGearDocumentType } from 'app/shared/model/gear-document-type.model';
import { Location } from '@angular/common';

/** Implementacion Sweetalert  */
import swal from 'sweetalert2';

@Component({
    selector: 'jhi-gear-systems-functionality',
    templateUrl: './gear-systems-functionality.component.html',
    styleUrls: ['./gear-systems-funcionality.component.scss']
})
export class GearSystemsFunctionalityComponent implements OnInit, AfterViewInit, OnDestroy {
    idIformationSystem: string;
    dataSource: MatTableDataSource<IGearDocumentType>; // Array de la interface

    auxFuncionalities: IGearSystemsFunctionality[];
    gearSystemsFunctionalities: IGearSystemsFunctionality[];
    currentAccount: any;
    eventSubscriber: Subscription;

    // Variables que utilizar el theme
    subject$: ReplaySubject<IGearSystemsFunctionality[]> = new ReplaySubject<IGearSystemsFunctionality[]>(1); // esta es la variable de carga de cada pagina
    data$: Observable<IGearSystemsFunctionality[]> = this.subject$.asObservable(); // esta es la varialbe de carga de cada dato, listo para visualizar

    // Edicion de la columnas que vamos a Visualizar
    // Cosa por destacar la propiedada isModelProperty es para que los datos que traemos del modelo concuerden con la columnas que vamos a mostrar
    @Input()
    columns: ListColumn[] = [
        { name: 'Id', property: 'id', visible: false, isModelProperty: true },
        { name: 'Nombre', property: 'name', visible: true, isModelProperty: true },
        { name: 'Descripción', property: 'description', visible: true, isModelProperty: true },
        { name: 'Fecha Creación', property: 'creationDate', visible: true, isModelProperty: true },
        { name: 'Fecha Modificación', property: 'modifyDate', visible: true, isModelProperty: true },
        { name: 'Sistema Información', property: 'gearInformationSystemName', visible: true, isModelProperty: true },
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
        private gearSystemsFunctionalityService: GearSystemsFunctionalityService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        // Componente Necesario para la parte de Login
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private _location: Location
    ) {}

    // Con esta funcion se Realiza la carga de datos en una estructura que la tabla entienda OJO
    loadAll() {
        this.gearSystemsFunctionalityService.query().subscribe(
            (res: HttpResponse<IGearSystemsFunctionality[]>) => {
                let aux = [];
                this.auxFuncionalities = res.body;

                // Reasignar variable
                this.idIformationSystem = this.route.snapshot.queryParams['idInformationSystem'];

                for (let i = 0; i < this.auxFuncionalities.length; i++) {
                    if (this.auxFuncionalities[i]['gearinformationsystemsId'] === Number(this.idIformationSystem)) {
                        aux.push(this.auxFuncionalities[i]);
                    }
                }

                this.gearSystemsFunctionalities = aux;

                // this.gearSystemsFunctionalities = res.body;

                const funcionality = this.gearSystemsFunctionalities;

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(funcionality);
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
    createFuncionality() {
        this.dialog
            .open(SystemFuncionalityCreateUpdateComponent)
            .afterClosed()
            .subscribe((gearFuncionality: IGearDocumentType) => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearFuncionality) {
                    // ====== start Funcion de Creacion de document type ========

                    this.subscribeToSaveResponse(this.gearSystemsFunctionalityService.create(gearFuncionality));
                    // ======== End  de creacion de document type ==============

                    // Reflesca la tabla en el Tipo Documento
                    this.subject$.next(this.gearSystemsFunctionalities);
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
        this.registerChangeInGearSystemsFunctionalities();
    }

    // =========  End  Funcion para cargar la visualizacion de la pagina ==========

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGearSystemsFunctionalities() {
        this.eventSubscriber = this.eventManager.subscribe('gearSystemsFunctionalityListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    // ======== Start Funciones necesario para la creacion de Dominio ==============

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearSystemsFunctionality>>) {
        result.subscribe(
            (res: HttpResponse<IGearSystemsFunctionality>) => this.onSaveSuccess(),
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
    updateFuncionality(gearFuncionality) {
        this.dialog
            .open(SystemFuncionalityCreateUpdateComponent, {
                data: gearFuncionality
            })
            .afterClosed()
            .subscribe(gearFuncionality => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearFuncionality) {
                    /**
                     * Here we are updating our local array.
                     * You would probably make an HTTP request here.
                     */
                    this.subscribeToSaveResponse(this.gearSystemsFunctionalityService.update(gearFuncionality));

                    const index = this.gearSystemsFunctionalities.findIndex(
                        existingCustomer => existingCustomer.id === gearFuncionality.id
                    );
                    // Actulizacion de la tabla
                    this.gearSystemsFunctionalities[index] = gearFuncionality;
                    this.subject$.next(this.gearSystemsFunctionalities);
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

    deleteFuncionality(funcionality) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        if (funcionality) {
            this.gearSystemsFunctionalityService.delete(funcionality.id).subscribe(response => {
                this.eventManager.broadcast({
                    name: 'gearDomainListModification',
                    content: 'Deleted an gearDomain'
                });
                // this.activeModal.dismiss(true);
            });
            this.gearSystemsFunctionalities.splice(
                this.gearSystemsFunctionalities.findIndex(existingCustomer => existingCustomer.id === funcionality.id),
                1
            );
            this.subject$.next(this.gearSystemsFunctionalities);
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
