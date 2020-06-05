import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearDiagQuestion } from 'app/shared/model/gear-diag-question.model';
import { Principal } from 'app/core';
import { GearDiagQuestionService } from './gear-diag-question.service';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ListColumn } from 'app/shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

// Importacion de Modal Create
import { DiagQuestionsCreateUpdateComponent } from './modalsDiagQuestions/diag-questions-create-update.component';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { IGearDiagnosis } from 'app/shared/model/gear-diagnosis.model';
import { Moment } from 'moment';
import {} from 'app/shared/model/gear-diag-answer.model';
import { DiagnosisCreateUpdateComponent } from 'app/entities/gear-diagnosis/modalsDiagnosis/diagnosis-create-update.component';

// Consulta Respuestas
import { GearDiagAnswerService } from './../gear-diag-answer/gear-diag-answer.service';
import { IGearDiagAnswer } from 'app/shared/model/gear-diag-answer.model';

// Impo

// Implementacion Sweetalert
import swal from 'sweetalert2';
import { SwalPartialTargets } from '@toverux/ngx-sweetalert2';
import { IGearCustomFieldTemplate } from 'app/shared/model/gear-custom-field-template.model';
import { Location } from '@angular/common';

@Component({
    selector: 'jhi-gear-diag-question',
    templateUrl: './gear-diag-question.component.html',
    styleUrls: ['./gear-diag-question.component.scss']
})
export class GearDiagQuestionComponent implements OnInit, AfterViewInit, OnDestroy {
    diaganswers: IGearDiagAnswer[];
    idDiagnostico: string;

    // Arreglo que contiene los items para la tabla
    displayedColumns: string[] = [
        'id',
        'name',
        'description',
        // 'creationDate',
        'gearDiagnosisId',
        'gearDiagquestionId',
        'accion'
    ]; // nombre de las columnas
    dataSource: MatTableDataSource<IGearDiagQuestion>; // Array de la interface

    auxQuestions: IGearDiagQuestion[];
    gearDiagQuestions: IGearDiagQuestion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    // Variables que utilizar el theme
    subject$: ReplaySubject<IGearDiagQuestion[]> = new ReplaySubject<IGearDiagQuestion[]>(1); // esta es la variable de carga de cada pagina
    data$: Observable<IGearDiagQuestion[]> = this.subject$.asObservable(); // esta es la varialbe de carga de cada dato, listo para visualizar

    // Edicion de la columnas que vamos a Visualizar
    // Cosa por destacar la propiedada isModelProperty es para que los datos que traemos del modelo concuerden con la columnas que vamos a mostrar
    @Input()
    columns: ListColumn[] = [
        { name: 'Id', property: 'id', visible: false, isModelProperty: true },
        { name: 'Pregunta', property: 'name', visible: true, isModelProperty: true },
        { name: 'Descripción', property: 'description', visible: true, isModelProperty: true },
        // { name: 'Fecha Creación', property: 'creationDate', visible: true, isModelProperty: true },
        { name: 'Diagnóstico', property: 'gearDiagnosisName', visible: true, isModelProperty: true },
        { name: 'Ámbito', property: 'gearAmbitName', visible: true, isModelProperty: true },
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
        private gearDiagQuestionService: GearDiagQuestionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        // Componente Necesario para la parte de Login
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private answerService: GearDiagAnswerService,
        private _location: Location
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
    createQuestion() {
        this.dialog
            .open(DiagQuestionsCreateUpdateComponent)
            .afterClosed()
            .subscribe((gearQuestion: IGearDiagQuestion) => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearQuestion) {
                    // ====== start Funcion de Creacion de document type ========

                    this.subscribeToSaveResponse(this.gearDiagQuestionService.create(gearQuestion));

                    // ======== End  de creacion de document type ==============

                    // Reflesca la tabla en el Tipo Documento
                    this.subject$.next(this.gearDiagQuestions);
                    this.ngOnInit();
                    this.loadAll();
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

    //  ===================================================================================================
    loadAll() {
        console.log('id capturado de diagnostico dos ssssss', this.route.snapshot.queryParams);

        this.gearDiagQuestionService.query().subscribe(
            (res: HttpResponse<IGearDiagQuestion[]>) => {
                let aux = []; // variable auxiliar para reasignar valor
                this.auxQuestions = res.body;

                // reasignar el valor a la  variable, del id del diagnostico obtenido
                this.idDiagnostico = this.route.snapshot.queryParams['idDiagnostico'];

                for (let i = 0; i < this.auxQuestions.length; i++) {
                    if (this.auxQuestions[i]['gearDiagnosisId'] === Number(this.idDiagnostico)) {
                        aux.push(this.auxQuestions[i]);
                    }
                }

                this.gearDiagQuestions = aux;

                // this.gearDiagQuestions = res.body;

                // cargar el arreglo a la variable
                const questions = this.gearDiagQuestions;

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(questions);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    // ==============================================================================================

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
        this.registerChangeInGearDiagQuestions();
    }

    // =========  End  Funcion para cargar la visualizacion de la pagina ==========

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGearDiagQuestions() {
        this.eventSubscriber = this.eventManager.subscribe('gearDiagQuestionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    // ======== Start Funciones necesario para la creacion de Dominio ==============

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearDiagQuestion>>) {
        result.subscribe((res: HttpResponse<IGearDiagQuestion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }

    // ======== End  Funciones necesario para la creacion de Dominio ==============

    // ========= Start Funcion se actuliza el componente =============
    updateQuestion(gearQuestion) {
        this.dialog
            .open(DiagQuestionsCreateUpdateComponent, {
                data: gearQuestion
            })
            .afterClosed()
            .subscribe(gearQuestion => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearQuestion) {
                    /**
                     * Here we are updating our local array.
                     * You would probably make an HTTP request here.
                     */
                    this.subscribeToSaveResponse(this.gearDiagQuestionService.update(gearQuestion));

                    const index = this.gearDiagQuestions.findIndex(existingCustomer => existingCustomer.id === gearQuestion.id);
                    // Actulizacion de la tabla
                    this.gearDiagQuestions[index] = gearQuestion;
                    this.subject$.next(this.gearDiagQuestions);
                    this.ngOnInit();
                    this.loadAll();
                }
            });
    }

    // ========= End Funcion se actuliza el componente =============

    // ========= Start Funcion Eliminar el componente =============

    deleteQuestion(question) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        if (question) {
            let aux = false;

            this.answerService.query().subscribe(
                (res: HttpResponse<IGearDiagAnswer[]>) => {
                    this.diaganswers = res.body;

                    //  ========== Recoorer tipo de documentos ============
                    for (let i = 0; i < this.diaganswers.length; i++) {
                        if (this.diaganswers[i].gearDiagquestionId === question.id) {
                            aux = true;
                        }
                    }

                    if (!aux) {
                        this.gearDiagQuestionService.delete(question.id).subscribe(response => {
                            this.eventManager.broadcast({
                                name: 'gearDomainListModification',
                                content: 'Deleted an gearDomain'
                            });
                            // this.activeModal.dismiss(true);
                        });
                        this.gearDiagQuestions.splice(
                            this.gearDiagQuestions.findIndex(existingCustomer => existingCustomer.id === question.id),
                            1
                        );
                        this.subject$.next(this.gearDiagQuestions);
                        this.ngOnInit();
                        this.loadAll();
                    } else {
                        swal('No se puede Eliminar ' + question.name + ', tiene una dependencia');
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }
    // ========= End Funcion Eliminar el componente =============

    // ==== Funcion para retorceder vista
    backClicked() {
        this._location.back();
    }
}
