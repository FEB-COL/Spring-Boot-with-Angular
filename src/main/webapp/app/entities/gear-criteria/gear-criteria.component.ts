import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearCriteria } from 'app/shared/model/gear-criteria.model';
import { Principal } from 'app/core';
import { GearCriteriaService } from './gear-criteria.service';
import { ActivatedRoute, Router } from '@angular/router';

/** Coponentes necesarios para agregar el thema de la tabla*/
import { ListColumn } from '../../shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

/** Importacion de Modal Create */
import { CriteriaCreateUpdateComponent } from './modalsCriteria/criteria-create-update.component';

/**  Implementacion Sweetalert */
import { SwalPartialTargets } from '@toverux/ngx-sweetalert2';
import { Location } from '@angular/common';
import { IGearDecision } from 'app/shared/model/gear-decision.model';
import { IGearDocumentType } from 'app/shared/model/gear-document-type.model';

/** Imple,emtacion Librerria para Barras */
import swal from 'sweetalert2';

/** Interface  para las barras */
interface SimpleSliderModel {
    value: number;
    options: Options;
    label1: string;
    label2: string;
    id1: number;
    id2: number;
}
/** esta parte es para la implementacion de ng5-slider */
import { Options } from 'ng5-slider';
import { equal } from 'assert';

@Component({
    selector: 'jhi-gear-criteria',
    templateUrl: './gear-criteria.component.html',
    styleUrls: ['./gear-criteria.component.scss']
})
export class GearCriteriaComponent implements OnInit, AfterViewInit, OnDestroy {
    idDecision: IGearDecision[];
    dataSource: MatTableDataSource<IGearCriteria>; // Array de la interface

    auxCriteria: IGearCriteria[];
    gearCriteria: IGearCriteria[];
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

    /** Esta son variables que se utiliza para la herramienta de decision */
    sliderGeneral: SimpleSliderModel[] = [];
    criterios: any;
    comparisonValues: {};
    slider: SimpleSliderModel;
    // option: Options;
    primer_puesto: string;
    segundo_puesto;
    string;

    constructor(
        private gearCriteriaService: GearCriteriaService,
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
        this.gearCriteriaService.query().subscribe(
            (res: HttpResponse<IGearCriteria[]>) => {
                let aux = [];
                this.auxCriteria = res.body;
                this.idDecision = this.route.snapshot.queryParams['idDecision'];

                for (let i = 0; i < this.auxCriteria.length; i++) {
                    if (this.auxCriteria[i]['geardecisionId'] === Number(this.idDecision)) {
                        aux.push(this.auxCriteria[i]);
                    }
                }

                this.gearCriteria = aux;

                // cargar el arreglo a la variable
                const criterias = this.gearCriteria;

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(criterias);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.criterios = {};
                /** Implementacion Barras */
                this.criterios = this.gearCriteria;
                console.log('xxxxxxxcriterios OJO xxxxxxxxxxxxxxx', this.criterios);
                // this.comparisonValues[0] = {};
                /////////////////////////////////////////////////////////////////////////////////////////////////
                //miramos que el numero de criterios sea superios 1 sino no funciona corrctamente OJO con estaparte
                if (this.criterios.length > 1) {
                    console.log('@@@@@@@@entro en la poisicion -----');
                    // inicializacion de variable
                    this.comparisonValues = {};
                    this.sliderGeneral = [];
                    //estos dos for es para mirar el numero de posibilidades con una agrupacion de dos OJO
                    for (let i = 0; i < this.criterios.length - 1; i++) {
                        // console.log('@@@entro en la poisicion -----2', this.comparisonValues[i]);
                        //Inicializa las variable de comparacion
                        if (this.comparisonValues[i] == undefined) {
                            this.comparisonValues[i] = {};
                        }
                        for (let j = i + 1; j < this.criterios.length; j++) {
                            this.sliderControl(i, j);
                        }
                    }
                }
                // numero de posibilidades
                console.log('resultado FEB OJO ', this.sliderGeneral);

                //end Configuracion personal de FEB
                console.log('Comparacione tres', this.comparisonValues);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    calcular() {
        console.log('valos del resultado OJO', this.sliderGeneral);
        let result = [];

        for (let i = 0; i < this.sliderGeneral.length; i++) {
            if (0 > this.sliderGeneral[i].value) {
                let position = result.findIndex(x => x.id == this.sliderGeneral[i].id1);
                console.log('##resultado de position', position);
                if (position < 0) {
                    result.push({
                        name: this.sliderGeneral[i].label1,
                        id: this.sliderGeneral[i].id1,
                        value: Math.abs(this.sliderGeneral[i].value)
                    });
                } else {
                    result[position]['value'] = result[position]['value'] + Math.abs(this.sliderGeneral[i].value);
                }
            } else if (0 < this.sliderGeneral[i].value) {
                let position = result.findIndex(x => x.id == this.sliderGeneral[i].id2);
                console.log('##resultado de position', position);
                if (position < 0) {
                    result.push({
                        name: this.sliderGeneral[i].label2,
                        id: this.sliderGeneral[i].id2,
                        value: Math.abs(this.sliderGeneral[i].value)
                    });
                } else {
                    result[position]['value'] = result[position]['value'] + Math.abs(this.sliderGeneral[i].value);
                }
            }
        }

        //Ordenar
        result.sort(function(a, b) {
            return b.value - a.value;
        });
        console.log('####resultado ordenado prinsipal ', result);
        // ###############################################################
        //Cacular
        // ###############################################################
        if (result != undefined) {
            if (result.length > 0) {
                this.primer_puesto = result[0]['name'];
                if (result.length == 1) {
                    swal({
                        title: '<strong>Resultado de Decision</strong>',
                        type: 'info',
                        text: 'El Mejor Decision es ' + this.primer_puesto,
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK',
                        confirmButtonAriaLabel: 'Thumbs up, OK!'
                    });
                } else {
                    this.segundo_puesto = result[1]['name'];
                    swal({
                        title: '<strong>Resultado de Decision</strong>',
                        type: 'info',
                        text: 'El Mejor Decision es ' + this.primer_puesto + ' La segunda Mejor Decision es ' + this.segundo_puesto,
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK!',
                        confirmButtonAriaLabel: 'Thumbs up, OK!'
                    });
                }
            }
        }
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
        this.registerChangeInGearCriteria();
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

    registerChangeInGearCriteria() {
        this.eventSubscriber = this.eventManager.subscribe('gearCriteriaListModification', response => this.loadAll());
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
    createCriteria() {
        this.dialog
            .open(CriteriaCreateUpdateComponent)
            .afterClosed()
            .subscribe((gearCriteria: IGearCriteria) => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearCriteria) {
                    // ====== start Funcion de Creacion de document type ========
                    this.subscribeToSaveResponse(this.gearCriteriaService.create(gearCriteria));
                    // ======== End  de creacion de document type ==============

                    // Reflesca la tabla en el Tipo Documento
                    this.subject$.next(this.gearCriteria);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Guardado', showConfirmButton: false, timer: 2000 });
                }
            });
    }
    // =========End  Para la craecion de Domonios OJO ===============

    // ========= Start Funcion se actuliza el componente =============
    updateCriteria(gearCriteria) {
        this.dialog
            .open(CriteriaCreateUpdateComponent, {
                data: gearCriteria
            })
            .afterClosed()
            .subscribe(gearCriteria => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearCriteria) {
                    /**
                     * Here we are updating our local array.
                     * You would probably make an HTTP request here.
                     */
                    this.subscribeToSaveResponse(this.gearCriteriaService.update(gearCriteria));

                    const index = this.gearCriteria.findIndex(existingCustomer => existingCustomer.id === gearCriteria.id);
                    // Actulizacion de la tabla
                    this.gearCriteria[index] = gearCriteria;
                    this.subject$.next(this.gearCriteria);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Actualizado', showConfirmButton: false, timer: 2000 });
                }
            });
    }
    // ========= End Funcion se actuliza el componente =============

    // ========= Start Funcion Eliminar el componente =============
    deleteCriteria(criteria) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        if (criteria) {
            this.gearCriteriaService.delete(criteria.id).subscribe(response => {
                this.eventManager.broadcast({
                    name: 'gearDomainListModification',
                    content: 'Deleted an gearDomain'
                });
                // this.activeModal.dismiss(true);
            });
            this.gearCriteria.splice(this.gearCriteria.findIndex(existingCustomer => existingCustomer.id === criteria.id), 1);
            this.subject$.next(this.gearCriteria);
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

    /** Funcion de Slidercontrol */
    sliderControl(i, j) {
        console.log('entro en la poisicion ' + i);
        this.slider = {
            value: 0,
            options: {
                stepsArray: [
                    { value: 5, legend: 'Mas Importante' },
                    { value: 4 },
                    { value: 3, legend: 'Importante' },
                    { value: 2 },
                    { value: 1 },
                    { value: 0, legend: 'Neutral' },
                    { value: -1 },
                    { value: -2 },
                    { value: -3, legend: 'Importante' },
                    { value: -4 },
                    { value: -5, legend: 'Mas Importante' }
                ],
                vertical: true,
                showSelectionBar: true,
                showTicksValues: true,
                ticksValuesTooltip: (v: number): string => {
                    return 'Tooltip for ' + v;
                }
            },

            label1: this.criterios[i].name,
            label2: this.criterios[j].name,
            id1: this.criterios[i].id,
            id2: this.criterios[j].id
        };
        console.log('@label 1', this.criterios[i].name);
        console.log('@label 2', this.criterios[j].name);
        this.sliderGeneral.push(this.slider);
    }

    uniqueId(row, col) {
        return row + '-' + col;
    }
    criteriaChange(sliderId, modelValue, highValue, pointerType) {
        var res = sliderId.split('_');
        console.log('VALOR RES', res);

        var row = parseInt(res[0]);
        console.log('ROW PRIMERO', row);

        var col = parseInt(res[1]);
        console.log('COL PRIMERO', col);

        this.comparisonValues[row][col].value = modelValue;
        console.log('MODELVALUE', modelValue);
    }
}
