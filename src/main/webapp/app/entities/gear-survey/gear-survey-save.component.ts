import { Component, OnInit } from '@angular/core';
import { GearSurveyService } from './gear-survey.service';
import { GearSurveyQuestionTypeService } from '../gear-survey-question-type/gear-survey-question-type.service';
import { HttpResponse } from '@angular/common/http';
import { IGearSurveyQuestionType } from '../../shared/model/gear-survey-question-type.model';
import { ActivatedRoute, Router } from '@angular/router';
import { IGearSurvey } from '../../shared/model/gear-survey.model';
import { Principal } from 'app/core';

@Component({
    selector: 'jhi-gear-survey-save',
    templateUrl: './gear-survey-save.component.html',
    styleUrls: ['./gear-survey-save.component.scss']
})
export class GearSurveySaveComponent implements OnInit {
    question_types: IGearSurveyQuestionType[] = [];

    /** Estructura de la Encuesta */
    form = {
        id: null,
        title: '',
        description: '',
        start: null,
        end: null,
        gearOrganizationalUnitId: null,
        questions: []
    };

    // ======================= Variables para el filtadro por Unidad ============
    idUnitLocalStorage: any = Number(localStorage.getItem('key1'));
    nameUser: any;
    idUser: any;
    // ========================================================================

    constructor(
        private gearSurveyService: GearSurveyService,
        private gearSurveyQuestionTypeService: GearSurveyQuestionTypeService,
        private router: Router,
        private route: ActivatedRoute,
        private principal: Principal
    ) {
        this.form.id = this.route.snapshot.paramMap.get('id');
        this.form.gearOrganizationalUnitId = Number(this.idUnitLocalStorage);

        this.addQuestion();

        if (this.form.id) {
            this.getForm();
        }
    }

    ngOnInit() {
        console.log('UNIDAD oRGANIZACIONAL', this.idUnitLocalStorage);

        this.principal.identity().then(account => {
            this.nameUser = account['firstName'];
            this.idUser = account['id'];

            console.log('ID USUARIO ENCUESTAS ', this.idUser);
            console.log('NOMBRE USUARIO ENCUESTAS', this.nameUser);
        });

        this.gearSurveyQuestionTypeService.query().subscribe((res: HttpResponse<IGearSurveyQuestionType[]>) => {
            this.question_types = res.body;
        });

        if (this.form.id) {
            this.getForm();
        }
    }

    getForm() {
        this.gearSurveyService.complete(this.form.id).subscribe(res => {
            console.log('============RES============', res);
            this.form = res.body;

            console.log('Todols los Elemetos', this.form);
        });
    }

    addQuestion() {
        this.form.questions.push({
            text: '',
            description: '',
            question_type_id: 1,
            correct_answer: 0,
            answers: []
        });

        this.addAnswer(this.form.questions[this.form.questions.length - 1]);
    }

    addAnswer(question) {
        question.answers.push({
            text: '',
            is_correct: 0
        });
    }

    delQuestion(index) {
        this.form.questions.splice(index, 1);
    }

    delAnswer(question_index, index) {
        this.form.questions[question_index].answers.splice(index, 1);
    }

    /** */
    save() {
        console.log('ENTRA A LA FUNCION GUARDAR ');
        console.log('######$$$$$$$', this.form);

        this.gearSurveyService.save(this.form).subscribe((res: HttpResponse<IGearSurvey>) => {
            this.form.id = res.body.id;

            console.log('@@@@@@ ID DEL FORMULARIO', res.body.id);
            console.log('Elementos Guardados', this.form);

            /** */
            this.getForm();
        });
        this.router.navigate(['/surveys']);
    }

    /** */
    cancel() {
        this.router.navigate(['/surveys']);
    }
}
