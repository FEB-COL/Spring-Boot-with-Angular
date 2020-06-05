import { Component, OnInit } from '@angular/core';
import { GearSurveyService } from './gear-survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IGearSurveySolve } from 'app/shared/model/gear-survey-solve.model';
import { GearSurveySolveService } from 'app/entities/gear-survey-solve';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IGearDomain } from 'app/shared/model/gear-domain.model';
import { MatTableDataSource } from '@angular/material';
import { Principal } from 'app/core';
import { IGearDocumentType } from 'app/shared/model/gear-document-type.model';
import { IGearSurvey } from 'app/shared/model/gear-survey.model';

@Component({
    selector: 'jhi-gear-survey-solve',
    templateUrl: './gear-survey-solve.component.html',
    styleUrls: ['./gear-survey-solve.component.scss']
})
export class GearSurveySolveComponent implements OnInit {
    form: any = {
        idUser: null
    };

    // form: any;
    page = 0;
    pagination = 5;
    pages = [];
    solves: IGearSurveySolve[];
    gearSolves: IGearSurveySolve[];
    currentAccount: any;
    idUserSesion: any;

    constructor(
        private gearSurveyService: GearSurveyService,
        private route: ActivatedRoute,
        private router: Router,
        private solveService: GearSurveySolveService,
        private principal: Principal
    ) {}

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        console.log('###########', id);

        this.principal.identity().then(account => {
            this.currentAccount = account;

            this.idUserSesion = this.currentAccount['id'];
            console.log('ID USER SESIDON', this.idUserSesion);
        });

        this.gearSurveyService.complete(id).subscribe(res => {
            console.log(res);
            this.form = res.body;

            this.form.idUser = this.idUserSesion;
            console.log('ID USUARIO RESPONDE ', this.form.idUser);

            console.log('FORMULARIOS TRAIDOS', this.form);

            const pages_number = Math.ceil(this.form.questions.length / this.pagination);

            for (let i = 1; i <= pages_number; i++) {
                this.pages.push(i);
            }
        });
    }

    goToPage(page_number) {
        this.page = (page_number - 1) * this.pagination;
    }

    /** */
    save() {
        console.log('@@@@@@@@@@@@@', this.form);
        console.log(JSON.stringify(this.form));

        this.gearSurveyService.solve(this.form).subscribe(res => {
            this.router.navigate(['/surveys']);
        });
    }

    /** */
    cancel() {
        this.router.navigate(['/surveys']);
    }
}
