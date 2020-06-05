import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearDiagAnswer } from 'app/shared/model/gear-diag-answer.model';
import { Principal } from 'app/core';
import { GearDiagAnswerService } from './gear-diag-answer.service';

import { GearDiagQuestionService } from './../gear-diag-question/gear-diag-question.service';

import { ActivatedRoute, Router } from '@angular/router';
import { IGearDiagQuestion } from 'app/shared/model/gear-diag-question.model';
import { MatTableDataSource } from '@angular/material';
import { IQuestionAnswer } from 'app/shared/model/question-answer.model';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { forEach } from 'lodash-es';
import { IGearDiagnosisType } from 'app/shared/model/gear-diagnosis-type.model';
import { GearDiagnosisService } from 'app/entities/gear-diagnosis';
import { IGearDiagnosis } from 'app/shared/model/gear-diagnosis.model';
import { gearGestionUsuariosRoute } from 'app/entities/gear-gestion-usuarios';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared';
import { Moment } from 'moment';

@Component({
    selector: 'jhi-gear-diag-answer',
    templateUrl: './gear-diag-answer.component.html'
})
export class GearDiagAnswerComponent implements OnInit, OnDestroy {
    respuestas: IGearDiagAnswer[];

    preguntas: IGearDiagQuestion[];
    creationDateDp: any;

    idDiagnostico: string;
    isSaving: boolean;

    // viewTable: IQuestionAnswer[]; // modelo genereado temporalmente

    viewTable: string[] = []; // modelo genereado temporalmente se le da el formato string para aareglar lo del push
    modelTable: IQuestionAnswer;
    selectValues: [];
    preguntasRelacionadas: IGearDiagQuestion[];

    diagAnswer: IGearDiagAnswer;
    gearDiagAnswers: IGearDiagAnswer[];
    questions: IGearDiagQuestion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    //valos de carga para el input
    valuesSelect: any;

    //para la actulizacion de Diagnositico en el nivel de madures
    gearDiagnosis: IGearDiagnosis;
    auxGearDiagnosis: IGearDiagnosis;

    promedio: any;

    constructor(
        private gearDiagAnswerService: GearDiagAnswerService,
        private diagQuestionService: GearDiagQuestionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        private route: ActivatedRoute,
        //para actualizar eL nivel de Madures
        private gearDiagnosisService: GearDiagnosisService
    ) {
        this.valuesSelect = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }

    loadAll() {
        // =============================== consulta  todas Respuesta =========================================================
        this.gearDiagAnswerService.query().subscribe(
            (res: HttpResponse<IGearDiagAnswer[]>) => {
                this.gearDiagAnswers = res.body;

                console.log('Mostrar las respuestas Inicio', this.gearDiagAnswers);

                this.allRelation();
            },

            (res: HttpErrorResponse) => this.onError(res.message)
        );
        // ========================================================================================
    }

    ngOnInit() {
        this.isSaving = false;

        console.log('Entra al NgOnINit Respuestas');
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
        this.registerChangeInGearDiagAnswers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGearDiagAnswer) {
        return item.id;
    }

    registerChangeInGearDiagAnswers() {
        this.eventSubscriber = this.eventManager.subscribe('gearDiagAnswerListModification', response => this.loadAll());
    }

    // =======================================================================================================
    allRelation() {
        console.log('ggggghhhhjjjjjj', this.gearDiagAnswers);

        // ======================================= Consulta Pregguntas que vienen con el  id diagnostico  =================================================
        this.diagQuestionService.query().subscribe(
            (res: HttpResponse<IGearDiagQuestion[]>) => {
                let aux = []; // variable auxiliar para reasignar valor
                this.questions = res.body;

                console.log('Consulta Variable TODAS LAS PREGUNTAS  ', this.questions);
                console.log('id capturado de diagnostico treeeeeeeees ', this.route.snapshot.queryParams);

                // reasignar el valor a la  variable, del id del diagnostico obtenido
                this.idDiagnostico = this.route.snapshot.queryParams['idDiagnostico'];
                console.log('========= el valor del ID de diagnostico ', this.idDiagnostico);

                for (let i = 0; i < this.questions.length; i++) {
                    console.log('EEEEEEEE', this.questions[i]['gearDiagnosisId']);
                    console.log('yyyyyyyy', Number(this.idDiagnostico));

                    if (this.questions[i]['gearDiagnosisId'] === Number(this.idDiagnostico)) {
                        console.log('Entrando al id diagnostico actual', this.questions[i]['gearDiagnosisId']);

                        aux.push(this.questions[i]);
                    }
                }

                // esta es la variable que tiene las preguntas relacionadas con el id del diagnostico

                // this.questions = [];
                this.questions = aux;
                console.log('Preguntas en Respuestas ', this.questions);
                let newModel;

                for (let i = 0; i < this.questions.length; i++) {
                    let bandera = false;
                    let posicion = 0;

                    for (let j = 0; j < this.gearDiagAnswers.length; j++) {
                        console.log('rrrrr uuuuu jjjjj', j, i);

                        if (this.gearDiagAnswers[j].gearDiagquestionId === this.questions[i].id) {
                            bandera = true;
                            posicion = j;

                            console.log(' id diagnostico1', this.questions[i].gearDiagnosisId);
                            console.log(' id pregunta 2', this.gearDiagAnswers[j].gearDiagquestionId);
                            console.log(' id respuesta 3', this.gearDiagAnswers[j].id);
                            console.log(' nombre pregunta 4', this.questions[i].name);
                            console.log(' valor pregunta 5', this.gearDiagAnswers[j].answer);

                            newModel = {
                                idDiagnostic: this.questions[i].gearDiagnosisId,
                                idQuestion: this.gearDiagAnswers[j].gearDiagquestionId,
                                idAnswer: this.gearDiagAnswers[j].id,
                                nameQuestion: this.questions[i].name,
                                valueAnswer: this.gearDiagAnswers[j].answer,
                                comment: this.gearDiagAnswers[j].comment
                            };

                            console.log('Dios Aleluya', newModel);

                            this.viewTable.push(newModel);
                        }
                    }
                    console.log('Sale del for');

                    if (!bandera) {
                        newModel = {
                            idDiagnostic: this.questions[i].gearDiagnosisId,
                            idQuestion: this.questions[i].id,
                            idAnswer: '',
                            nameQuestion: this.questions[i].name,
                            valueAnswer: '0',
                            comment: ''
                        };

                        console.log('Dios Aleluya', newModel);

                        this.viewTable.push(newModel);
                    }
                }

                console.log('pintar tabla', this.viewTable);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        // ========================================================================================
    }
    // =========================================================================================================

    saveAnswer() {
        this.promedio = 0;
        console.log('Entro a  la funcion de guardar');
        console.log('rrrrrrr2222222222', this.viewTable);
        //Recorro cada Respuesta del formulario General
        for (let i = 0; i < this.viewTable.length; i++) {
            // Reinicializar el valor para guardar
            this.diagAnswer = new class implements IGearDiagAnswer {
                answer: number;
                comment: string;
                // creationDate: moment.Moment;
                gearDiagquestionId: number;
                id: number;
            }();

            console.log('GGGGGG', this.viewTable[i]['valueAnswer']);
            console.log('EEEEEE', this.viewTable[i]['comment']);
            console.log('OOOOOO', this.viewTable[i]['idQuestion']);
            console.log('@@@@@@@@@@@@@@@', this.viewTable[i]['idAnswer']);

            console.log('IIIIII', i);

            //Armo el modelo para Guardar o Actulizar
            this.diagAnswer.answer = this.viewTable[i]['valueAnswer'];
            this.diagAnswer.comment = this.viewTable[i]['comment'];
            this.diagAnswer.gearDiagquestionId = this.viewTable[i]['idQuestion'];

            //pregunto si hay ID de pregutan para actulizar o Guardar
            //Actualizo
            if (this.viewTable[i]['idAnswer'] > 0) {
                console.log('7777777777777');

                //Funcion de Actualizacion
                this.diagAnswer.id = Number(this.viewTable[i]['idAnswer']);
                this.subscribeToSaveResponse(this.gearDiagAnswerService.update(this.diagAnswer));
                this.router.navigate(['/diagnosis']);
            }
            // Guardo
            else {
                //Funcion de Creado

                console.log('5555555555555555');
                this.subscribeToSaveResponse(this.gearDiagAnswerService.create(this.diagAnswer));
                this.router.navigate(['/diagnosis']);
            }
            //se determina el promedio
            this.promedio = this.diagAnswer.answer + this.promedio;
        }
        //esta parte esta para actulizar el nivel de madures
        //Se actuliza la parte de diagnostico y se realiza
        this.promedio = this.promedio / this.viewTable.length;
        console.log('PROMEDIO', this.promedio);
        //Cargo el modelo en busca de Diagnostico con id
        console.log('id_Diagnostico', this.viewTable[0]['idDiagnostic']);
        this.gearDiagnosis = this.subscribeSelectDiagnostico(this.gearDiagnosisService.find(this.viewTable[0]['idDiagnostic']));
        //Actualizo el nivel de madurez
    }
    subscribeSelectDiagnostico(result: Observable<HttpResponse<IGearDiagnosis>>) {
        result.subscribe(
            (res: HttpResponse<IGearDiagnosis>) => {
                // this.onSaveSuccess()
                console.log('resultadoxxx', res.body);
                this.gearDiagnosis = res.body;
                this.gearDiagnosis.levelMaturity = this.promedio;
                console.log('Diagnosticoxxxxx', this.gearDiagnosis);
                this.subscribeToSaveResponseDiagnostico_aux(this.gearDiagnosisService.update(this.gearDiagnosis));

                this.loadAll();
                this.registerChangeInGearDiagAnswers();
                return this.gearDiagnosis;
            },
            (res: HttpErrorResponse) => {
                this.auxGearDiagnosis = new class implements IGearDiagnosis {
                    creationDate: Moment;
                    description: string;
                    gearDiagQuestions: IGearDiagQuestion[];
                    gearDiagnosisTypeId: number;
                    id: number;
                    levelMaturity: number;
                    name: string;
                }();
            }
        );
        return this.auxGearDiagnosis;
    }

    private subscribeToSaveResponseDiagnostico_aux(result: Observable<HttpResponse<IGearDiagnosis>>) {
        result.subscribe((res: HttpResponse<IGearDiagnosis>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearDiagAnswer>>) {
        result.subscribe((res: HttpResponse<IGearDiagAnswer>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
