import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearOption } from 'app/shared/model/gear-option.model';
import { Principal } from 'app/core';
import { GearOptionService } from './gear-option.service';
import { ActivatedRoute, Router } from '@angular/router';

/** Coponentes necesarios para agregar el thema de la tabla*/
import { ListColumn } from '../../shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

/** Importacion de Modal Create */
import { OptionCreateUpdateComponent } from './modalsOption/option-create-update.component';

/**  Implementacion Sweetalert */
import { SwalPartialTargets } from '@toverux/ngx-sweetalert2';
import { Location } from '@angular/common';
import { IGearDecision } from 'app/shared/model/gear-decision.model';
import { IGearDocumentType } from 'app/shared/model/gear-document-type.model';
import { IGearCriteria } from 'app/shared/model/gear-criteria.model';
import { CriteriaCreateUpdateComponent } from 'app/entities/gear-criteria/modalsCriteria/criteria-create-update.component';
import swal from 'sweetalert2';

@Component({
    selector: 'jhi-gear-option',
    templateUrl: './gear-option.component.html',
    styleUrls: ['./gear-option.component.scss']
})
export class GearOptionComponent implements OnInit, AfterViewInit, OnDestroy {
    idDecision: IGearDecision[];

    // Arreglo que contiene los items para la tabla
    displayedColumns: string[] = ['id', 'name', 'description', 'geardecisionName', 'accion']; // nombre de las columnas
    dataSource: MatTableDataSource<IGearOption>; // Array de la interface

    auxOption: IGearOption[];
    gearOptions: IGearOption[];
    currentAccount: any;
    eventSubscriber: Subscription;

    // Variables que utilizar el theme
    subject$: ReplaySubject<IGearCriteria[]> = new ReplaySubject<IGearCriteria[]>(1); // esta es la variable de carga de cada pagina
    data$: Observable<IGearCriteria[]> = this.subject$.asObservable(); // esta es la varialbe de carga de cada dato, listo para visualizar

    // Edicion de la columnas que vamos a Visualizar
    // Cosa por destacar la propiedada isModelProperty es para que los datos que traemos del modelo concuerden con la columnas que vamos a mostrar
    @Input()
    columns: ListColumn[] = [
        { name: 'Id', property: 'id', visible: false, isModelProperty: true },
        { name: 'Nombre', property: 'name', visible: true, isModelProperty: true },
        { name: 'Descripción', property: 'description', visible: true, isModelProperty: true },
        { name: 'Decisión', property: 'geardecisionName', visible: true, isModelProperty: true },
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
        private gearOptionService: GearOptionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        // Componente Necesario para la parte de Login
        private dialog: MatDialog,
        public readonly swalTargets: SwalPartialTargets,
        private route: ActivatedRoute,
        private _location: Location
    ) {}

    loadAll() {
        this.gearOptionService.query().subscribe(
            (res: HttpResponse<IGearOption[]>) => {
                let aux = [];
                this.auxOption = res.body;
                this.idDecision = this.route.snapshot.queryParams['idDecision'];

                for (let i = 0; i < this.auxOption.length; i++) {
                    if (this.auxOption[i]['geardecisionId'] === Number(this.idDecision)) {
                        aux.push(this.auxOption[i]);
                    }
                }

                this.gearOptions = aux;

                const options = this.gearOptions;

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(options);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    // =========  start Funcion para cargar la visualizacion de la pagina ==========
    ngOnInit() {
        console.log('Valor de lo triado', this.route.snapshot.queryParams['idDecision']);

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
        this.registerChangeInGearOptions();
    }
    // =========  End  Funcion para cargar la visualizacion de la pagina ==========

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

    /** Funciones Necesarias que Funcionan con el thema Fury */
    get visibleColumns() {
        return this.columns.filter(column => column.visible).map(column => column.property);
    }

    ngAfterViewInit() {
        // Con el llamado esta Funcion Cargamos los datos y los datos de pagina y sort que necesitamos para la tabla
        this.loadAll();
    }
    /** End Funciones */

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGearOption) {
        return item.id;
    }

    registerChangeInGearOptions() {
        this.eventSubscriber = this.eventManager.subscribe('gearOptionListModification', response => this.loadAll());
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

    // ========= start Para la craecion de Domonios OJO ===================
    createOption() {
        this.dialog
            .open(OptionCreateUpdateComponent)
            .afterClosed()
            .subscribe((gearOption: IGearOption) => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearOption) {
                    // ====== start Funcion de Creacion de document type ========
                    this.subscribeToSaveResponse(this.gearOptionService.create(gearOption));
                    // ======== End  de creacion de document type ==============

                    // Reflesca la tabla en el Tipo Documento
                    this.subject$.next(this.gearOptions);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Guardado', showConfirmButton: false, timer: 2000 });
                }
            });
    }
    // =========End  Para la craecion de Domonios OJO ===============

    // ========= Start Funcion se actuliza el componente =============
    updateOption(gearOption) {
        this.dialog
            .open(OptionCreateUpdateComponent, {
                data: gearOption
            })
            .afterClosed()
            .subscribe(gearOption => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearOption) {
                    /**
                     * Here we are updating our local array.
                     * You would probably make an HTTP request here.
                     */
                    this.subscribeToSaveResponse(this.gearOptionService.update(gearOption));

                    const index = this.gearOptions.findIndex(existingCustomer => existingCustomer.id === gearOption.id);
                    // Actulizacion de la tabla
                    this.gearOptions[index] = gearOption;
                    this.subject$.next(this.gearOptions);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Actualizado', showConfirmButton: false, timer: 2000 });
                }
            });
    }
    // ========= End Funcion se actuliza el componente =============

    // ========= Start Funcion Eliminar el componente =============
    deleteOption(option) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        if (option) {
            this.gearOptionService.delete(option.id).subscribe(response => {
                this.eventManager.broadcast({
                    name: 'gearDomainListModification',
                    content: 'Deleted an gearDomain'
                });
                // this.activeModal.dismiss(true);
            });
            this.gearOptions.splice(this.gearOptions.findIndex(existingCustomer => existingCustomer.id === option.id), 1);
            this.subject$.next(this.gearOptions);
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
