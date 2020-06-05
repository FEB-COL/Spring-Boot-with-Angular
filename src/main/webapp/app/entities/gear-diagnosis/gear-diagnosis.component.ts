import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearDiagnosis } from 'app/shared/model/gear-diagnosis.model';
import { Principal } from 'app/core';
import { GearDiagnosisService } from './gear-diagnosis.service';
import { Router } from '@angular/router';
import { ListColumn } from 'app/shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

/** Consulta Plantillas */
import { GearDiagQuestionService } from './../gear-diag-question';
import { IGearDiagQuestion } from 'app/shared/model/gear-diag-question.model';

/**  Importacion de Modal Create */
import { DiagnosisCreateUpdateComponent } from './modalsDiagnosis/diagnosis-create-update.component';
import { IGearCustomFieldTemplate } from 'app/shared/model/gear-custom-field-template.model';

/**  Implementacion Sweetalert */
import swal from 'sweetalert2';

/** imports para implementar Diagrama Araña */
import * as $ from 'jquery';
import { IGearDiagAnswer } from 'app/shared/model/gear-diag-answer.model';
import { GearDiagAnswerService } from 'app/entities/gear-diag-answer';

@Component({
    selector: 'jhi-gear-diagnosis',
    templateUrl: './gear-diagnosis.component.html',
    styleUrls: ['./gear-diagnosis.component.scss']
})
export class GearDiagnosisComponent implements OnInit, AfterViewInit, OnDestroy {
    // =================== Start Variables Arana ==============================
    valuesArray: number[];
    hexagons: any;

    /** colores de acuerdo al nivel de madurez */
    levelZero: any;
    levelOne: any;
    levelTwo: any;
    levelThree: any;
    levelFour: any;
    levelFive: any;

    gearDiagAnswers: IGearDiagAnswer[];
    // =================== End Variables Arana ==============================

    diagPreguntas: IGearDiagQuestion[];

    // Arreglo que contiene los items para la tabla
    displayedColumns: string[] = [
        'id',
        'name',
        'description',
        // 'creationDate',
        // 'levelMaturity',
        'gearDiagnosisTypeName',
        'accion'
    ]; // nombre de las columnas
    dataSource: MatTableDataSource<IGearDiagnosis>; // Array de la interface

    gearDiagnoses: IGearDiagnosis[];
    currentAccount: any;
    eventSubscriber: Subscription;

    // Variables que utilizar el theme
    subject$: ReplaySubject<IGearDiagnosis[]> = new ReplaySubject<IGearDiagnosis[]>(1); // esta es la variable de carga de cada pagina
    data$: Observable<IGearDiagnosis[]> = this.subject$.asObservable(); // esta es la varialbe de carga de cada dato, listo para visualizar
    customers: IGearDiagnosis[]; // es el modelo que vamos a visualizar

    // Edicion de la columnas que vamos a Visualizar
    // Cosa por destacar la propiedada isModelProperty es para que los datos que traemos del modelo concuerden con la columnas que vamos a mostrar
    @Input()
    columns: ListColumn[] = [
        { name: 'Id', property: 'id', visible: false, isModelProperty: true },
        { name: 'Nombre', property: 'name', visible: true, isModelProperty: true },
        { name: 'Descripción', property: 'description', visible: true, isModelProperty: true },
        // { name: 'Fecha Creación', property: 'creationDate', visible: true, isModelProperty: true },
        { name: 'Nivel Madurez', property: 'levelMaturity', visible: true, isModelProperty: true },
        { name: 'Tipo Diagnóstico', property: 'gearDiagnosisTypeName', visible: true, isModelProperty: true },
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
        private gearDiagnosisService: GearDiagnosisService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        // Componente Necesario para la parte de Login
        private dialog: MatDialog,
        private questionService: GearDiagQuestionService,
        private gearDiagAnswerService: GearDiagAnswerService
    ) {}

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
    createDiagnosis() {
        this.dialog
            .open(DiagnosisCreateUpdateComponent)
            .afterClosed()
            .subscribe((gearDiagnosis: IGearDiagnosis) => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearDiagnosis) {
                    // ====== start Funcion de Creacion de document type ========
                    this.subscribeToSaveResponse(this.gearDiagnosisService.create(gearDiagnosis));
                    // ======== End  de creacion de document type ==============

                    // Reflesca la tabla en el Tipo Documento
                    this.subject$.next(this.gearDiagnoses);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Guardado', showConfirmButton: false, timer: 2000 });
                }
            });
    }

    // =========End  Para la craecion de Domonios OJO ===================

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

    loadAll() {
        this.gearDiagnosisService.query().subscribe(
            (res: HttpResponse<IGearDiagnosis[]>) => {
                this.gearDiagnoses = res.body;

                // cargar el arreglo a la variable
                const diagnosis = this.gearDiagnoses;

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(diagnosis);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

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
        this.registerChangeInGearDiagnoses();

        // =================== Start Grafica arana ==================================
        /**  Valores aleatorios  para pintar el hexagono */
        this.hexagons = ['99'];

        /** colores de acuerdo al nivel de madurez */
        this.levelZero = 'rgb(237, 28, 36)';
        this.levelOne = 'rgb(255, 127, 39)';
        this.levelTwo = 'rgb(255, 201, 14)';
        this.levelThree = 'rgb(255, 242, 0)';
        this.levelFour = 'rgb(181, 230, 29)';
        this.levelFive = 'rgb(34, 177, 76)';

        // valores de los arreglos
        this.valuesArray = [1, 2, 3, 4, 5, 6];
        console.log('Arreglos', this.valuesArray);

        // this.update(0, 1); // sevicios tecnologicos
        // this.update(1, 2); //  Gobierno
        // this.update(2, 3); // informacion
        // this.update(3, 4); // sistemas de informacion
        // this.update(4, 4); // servicos tecnologicos
        // this.update(5, 5); // uso y aprovacion

        this.loadArana();

        this.gearDiagAnswerService.query().subscribe(
            (res: HttpResponse<IGearDiagAnswer[]>) => {
                this.gearDiagAnswers = res.body;
                console.log('Mostrar las respuestas Inicio', this.gearDiagAnswers);
                let promedio = 0;
                let result;
                if (this.gearDiagAnswers.length > 1) {
                    for (let i = 0; i < this.gearDiagAnswers.length; i++) {
                        promedio = this.gearDiagAnswers[i].answer + promedio;

                        console.log('GGGGGG', promedio);
                    }
                    result = promedio / this.gearDiagAnswers.length;
                    console.log('UUUUUU', result);
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        // =================== end Grafica arana ==================================
    }

    // =========  End  Funcion para cargar la visualizacion de la pagina ==========

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGearDiagnoses() {
        this.eventSubscriber = this.eventManager.subscribe('gearDiagnosisListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    // ======== Start Funciones necesario para la creacion de Dominio ==============

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearDiagnosis>>) {
        result.subscribe((res: HttpResponse<IGearDiagnosis>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }

    // ======== End  Funciones necesario para la creacion de Dominio ==============

    // ========= Start Funcion se actuliza el componente =============
    updateDiagnosis(gearDiagnosis) {
        this.dialog
            .open(DiagnosisCreateUpdateComponent, {
                data: gearDiagnosis
            })
            .afterClosed()
            .subscribe(gearDiagnosis => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearDiagnosis) {
                    /**
                     * Here we are updating our local array.
                     * You would probably make an HTTP request here.
                     */
                    this.subscribeToSaveResponse(this.gearDiagnosisService.update(gearDiagnosis));

                    const index = this.gearDiagnoses.findIndex(existingCustomer => existingCustomer.id === gearDiagnosis.id);
                    // Actulizacion de la tabla
                    this.gearDiagnoses[index] = gearDiagnosis;
                    this.subject$.next(this.gearDiagnoses);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Actualizado', showConfirmButton: false, timer: 2000 });
                }
            });
    }

    // ========= End Funcion se actuliza el componente =============

    // ========= Start Funcion Eliminar el componente =============
    deleteDiagnosis(diagnosis) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        if (diagnosis) {
            let aux = false;

            this.questionService.query().subscribe(
                (res: HttpResponse<IGearCustomFieldTemplate[]>) => {
                    this.diagPreguntas = res.body;
                    //  ========== Recoorer tipo de documentos ============
                    for (let i = 0; i < this.diagPreguntas.length; i++) {
                        if (this.diagPreguntas[i].gearDiagnosisId === diagnosis.id) {
                            aux = true;
                        }
                    }

                    if (!aux) {
                        this.gearDiagnosisService.delete(diagnosis.id).subscribe(response => {
                            this.eventManager.broadcast({
                                name: 'gearDomainListModification',
                                content: 'Deleted an gearDomain'
                            });
                            // this.activeModal.dismiss(true);
                        });
                        this.gearDiagnoses.splice(
                            this.gearDiagnoses.findIndex(existingCustomer => existingCustomer.id === diagnosis.id),
                            1
                        );
                        this.subject$.next(this.gearDiagnoses);
                        this.ngOnInit();
                        this.loadAll();
                        swal({ position: 'center', type: 'success', title: 'Eliminado', showConfirmButton: false, timer: 2000 });
                    } else {
                        swal('No se puede Eliminar ' + diagnosis.name + ', tiene una dependencia');
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }
    // ========= End Funcion Eliminar el componente =============

    // ==================================================== Funciones para implementar Diagrama Arana =============================================
    loadArana() {
        this.gearDiagnosisService.query().subscribe(
            (res: HttpResponse<IGearDiagnosis[]>) => {
                this.gearDiagnoses = res.body;
                console.log('Carga de Arana', this.gearDiagnoses);
                for (let i = 0; i < 6; i++) {
                    //this.gearDiagnoses.length; i++){
                    console.log('resultado de diagnosico 1 por 1', this.gearDiagnoses[i]);
                    if (i < this.gearDiagnoses.length) {
                        if (this.gearDiagnoses[i].levelMaturity != null) {
                            this.update(i, this.gearDiagnoses[i].levelMaturity);
                        } else {
                            this.update(i, 0);
                        }
                    } else {
                        this.update(i, 0);
                    }
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    changeColorToComplete(selector) {
        $(selector).css('border-bottom-color', this.levelZero);
    }

    /**  funcion para rrecorrer el arreglo con paramentros de hexagono y arr */
    setHexagon(hexagon, arr) {
        for (let i = 0; i < arr.length; i++) {
            this.setHexagonDomain(hexagon, i, arr[i]);
        }
    }

    /** Pintar los colores en el hexagono de acuerdo al nivel */
    setHexagonDomain(hexagon, domainIndex, value) {
        for (let i = 0; i <= 5; i++) {
            // contiene el nivel que se va a colorear.concateneado el hexagono el dominio y el nivel
            let selector = '#pyramid-container' + hexagon + '-' + domainIndex + ' .pyramid-level-' + (i + 1);

            if (i <= value) {
                /** Asignación del color deacuerdo al nivel */
                if (i === 0) {
                    console.log('Nivel cero');
                    $(selector).css('border-bottom-color', this.levelZero);
                } else if (i === 1) {
                    console.log('Nivel uno');
                    $(selector).css('border-bottom-color', this.levelOne);
                } else if (i === 2) {
                    console.log('Nivel Dos');
                    $(selector).css('border-bottom-color', this.levelTwo);
                } else if (i === 3) {
                    console.log('Nivel Tres');
                    $(selector).css('border-bottom-color', this.levelThree);
                } else if (i === 4) {
                    console.log('Nivel Cuatro');
                    $(selector).css('border-bottom-color', this.levelFour);
                } else {
                    console.log('Nivel Cinco');
                    $(selector).css('border-bottom-color', this.levelFive);
                }
            } else {
                $(selector).css('border-bottom-color', '');
            }
        }
    }

    /** funciçon para actualizar valores del Hexagono. */
    update(i, val) {
        this.valuesArray[i] = val;
        this.setHexagon('1', this.valuesArray);
    }
    // ==================================================== Funciones para implementar Diagrama Arana =============================================

    /** Redireccionar vista para crear preguntas del diagnostico */
    listQuestion(id, name) {
        this.router.navigate(['/diagQuestion'], { queryParams: { idDiagnostico: id, nameDiagnosis: name } });
    }

    /** redireccionar vista para responder Diagnostico */
    answerDiagnostic(identificador) {
        this.router.navigate(['/diagAnswer'], { queryParams: { idDiagnostico: identificador } });
    }
}
