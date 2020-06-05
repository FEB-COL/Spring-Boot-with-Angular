import { GearSurveyService } from './gear-survey.service';

/**tabla  */
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Principal } from 'app/core';
import { ActivatedRoute, Router } from '@angular/router';

/**  Implementacion Sweetalert */
import swal from 'sweetalert2';
import { IGearSurvey } from 'app/shared/model/gear-survey.model';

/** Coponentes necesarios para agregar el thema de la tabla */
import { ListColumn } from './../../shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

/** Implemenatacion de descarga ecxel*/
import { ExcelService } from './../../services/excel.service';

import moment = require('moment');
import { IGearDomain } from 'app/shared/model/gear-domain.model';

@Component({
    selector: 'jhi-gear-survey-list',
    templateUrl: './gear-survey-list.component.html',
    styleUrls: ['./gear-survey-list.component.scss']
})
export class GearSurveyListComponent implements OnInit, AfterViewInit {
    variableExportar: [];
    forms = [];
    dataSource: MatTableDataSource<IGearSurvey>; // Array de la interface

    gearSurveys: IGearSurvey[];
    eventSubscriber: Subscription;
    currentAccount: any;

    // ======================= Variables para el filtadro por Unidad ============
    surveysByUnits: IGearDomain[];
    idUnitLocalStorage: any = localStorage.getItem('key1');
    // ========================================================================

    /** Variables que utilizar el theme */
    subject$: ReplaySubject<IGearSurvey[]> = new ReplaySubject<IGearSurvey[]>(1); // esta es la variable de carga de cada pagina
    data$: Observable<IGearSurvey[]> = this.subject$.asObservable(); // esta es la varialbe de carga de cada dato, listo para visualizar

    @Input()
    columns: ListColumn[] = [
        { name: 'Titulo', property: 'name', visible: true, isModelProperty: true },
        { name: 'Fecha Inicio', property: 'start', visible: true, isModelProperty: true },
        { name: 'Fecha Final', property: 'end', visible: true, isModelProperty: true },
        { name: 'Descripcion', property: 'description', visible: true, isModelProperty: true },
        { name: 'Actions', property: 'actions', visible: true }
    ] as ListColumn[];
    pageSize = 10;
    @ViewChild(MatPaginator)
    paginator: MatPaginator;
    @ViewChild(MatSort)
    sort: MatSort;

    constructor(
        private gearSurveyService: GearSurveyService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private excelService: ExcelService
    ) {}

    // ====== Con esta funcion se Realiza la carga de datos en una estructura que la tabla entienda OJO
    loadAll() {
        console.log('Dentro de load ALl');

        // ============================== Surveys Generales======================================
        // this.gearSurveyService.query().subscribe(
        //     (res: HttpResponse<IGearSurvey[]>) => {
        //         this.gearSurveys = res.body;
        //
        //         // for (let i = 0; i < this.gearSurveys.length; i++) {
        //         //     this.gearSurveys[i].start = moment((this.gearSurveys[i].start).format('DD-MM-YYYY'));
        //         //     this.gearSurveys[i].end = moment((this.gearSurveys[i].end).format('DD-MM-YYYY'));
        //         // }
        //         //
        //
        //         for (let i = 0; i < this.gearSurveys.length; i++) {
        //             let aux = this.gearSurveys[i].start.format('DD-MM-YYYY');
        //             let auxTwo = this.gearSurveys[i].end.format('DD-MM-YYYY');
        //
        //             this.gearSurveys[i].start = moment(aux);
        //             this.gearSurveys[i].end = moment(auxTwo);
        //         }
        //
        //         // cargar el arreglo a la variable
        //         const surveys = this.gearSurveys;
        //
        //         // Assign the data to the data source for the table to render
        //         this.dataSource = new MatTableDataSource(surveys);
        //         this.dataSource.paginator = this.paginator;
        //         this.dataSource.sort = this.sort;
        //
        //         console.log('ENCUESTAS  de BD', this.gearSurveys);
        //     },
        //     (res: HttpErrorResponse) => this.onError(res.message)
        // );
        // ============================== Surveys Generales======================================

        // ============================== Dominios por Unidad Organizacional ======================================

        console.log('UNIT', this.idUnitLocalStorage);

        this.gearSurveyService.surveyByUnitId(this.idUnitLocalStorage).subscribe(res => {
            console.log('RESULTADOO DE LA CONSULTA POR UNIT', res);

            this.surveysByUnits = res;

            console.log('RESULTADOO DE LA CONSURRRRRRRRRRRRRRRRRRRR', this.surveysByUnits);

            // Assign the data to the data source for the table to render
            this.dataSource = new MatTableDataSource(this.surveysByUnits);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            console.log('RESULTADOooooo', this.surveysByUnits);
        });
        // ============================== Dominios por Unidad Organizacional======================================
    }

    ngOnInit() {
        console.log('RRRRRRRRRR ID UNIDAD ORGANIZATIONAL', this.idUnitLocalStorage);

        this.principal
            .identity()
            .then(account => {
                this.currentAccount = account;
            })
            .catch(err => {
                console.log('Something went wrong: ' + err.message);
                this.router.navigate(['']);
            });
        this.getForms();
        this.loadAll();
    }

    /** Funciones Necesarias que Funcionan con el thema Fury */
    get visibleColumns() {
        return this.columns.filter(column => column.visible).map(column => column.property);
    }

    ngAfterViewInit() {
        // Con el llamado esta Funcion Cargamos los datos y los datos de pagina y sort que necesitamos para la tabla
        this.loadAll();
    }

    onFilterChange(value) {
        if (!this.dataSource) {
            return;
        }
        value = value.trim();
        value = value.toLowerCase();
        this.dataSource.filter = value;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    /** End Funciones */

    getForms() {
        this.gearSurveyService.query().subscribe(res => {
            this.forms = res.body;
        });
    }

    /** Funcion para Eliminar la Encuesta */
    delForm(id) {
        this.gearSurveyService.delete(id).subscribe(res => {
            this.getForms();
            this.ngOnInit();
            this.loadAll();
            swal({
                position: 'center',
                type: 'success',
                title: 'Eliminado',
                showConfirmButton: false,
                timer: 2000
            });
        });
    }

    /** Funcion para redireccionar a la vista de Actualizar Encuesta  */
    updateSurvey(id) {
        this.router.navigate(['/surveys/create', id]);
    }

    /** Funcion para redireccionar a la vista de Crear  */
    addSurvey() {
        this.router.navigate(['/surveys/create']);
    }

    /** Funcion para redireccionar a la vista de Respoinder Encuesta  */
    responseSurvey(id) {
        this.router.navigate(['/surveys/solve', id]);
    }

    /** Exportar Excel*/
    exportExcel(id) {
        console.log('SE PUEDE', id);

        const gearSurveyId = Number(id);
        console.log('####@@@@@@@@###', gearSurveyId);

        this.gearSurveyService.exportExcel(gearSurveyId).subscribe(res => {
            this.variableExportar = res;
            console.log('####@@@@@@@@###', res);

            console.log('VARIABLE EXPORTAR', this.variableExportar);

            this.exportAsXLSX();
        });
    }

    exportAsXLSX(): void {
        /**  Estructura del Excel a exportar */
        let result = [];
        for (let i = 0; i < this.variableExportar.length; i++) {
            result.push({
                Encuesta: this.variableExportar[i]['gearsurveyName'],
                Pregunta: this.variableExportar[i]['gearsurveyquestionName'],
                'Respuesta Sencila': this.variableExportar[i]['text'],
                'Respuestas Multiple': this.variableExportar[i]['gearsurveyanswerName'],
                Usuario: this.variableExportar[i]['gearUserName']
            });
        }

        /**  Servicio Exportar del Plugin */
        this.excelService.exportAsExcelFile(result, 'Encuestas');
    }
}
