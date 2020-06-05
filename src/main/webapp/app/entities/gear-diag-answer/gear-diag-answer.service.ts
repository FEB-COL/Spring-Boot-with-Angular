import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearDiagAnswer } from 'app/shared/model/gear-diag-answer.model';

type EntityResponseType = HttpResponse<IGearDiagAnswer>;
type EntityArrayResponseType = HttpResponse<IGearDiagAnswer[]>;

@Injectable({ providedIn: 'root' })
export class GearDiagAnswerService {
    public resourceUrl = SERVER_API_URL + 'api/gear-diag-answers';

    constructor(private http: HttpClient) {}

    create(gearDiagAnswer: IGearDiagAnswer): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearDiagAnswer);
        return this.http
            .post<IGearDiagAnswer>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(gearDiagAnswer: IGearDiagAnswer): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearDiagAnswer);
        return this.http
            .put<IGearDiagAnswer>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IGearDiagAnswer>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IGearDiagAnswer[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(gearDiagAnswer: IGearDiagAnswer): IGearDiagAnswer {
        const copy: IGearDiagAnswer = Object.assign({}, gearDiagAnswer, {
            creationDate:
                gearDiagAnswer.creationDate != null && gearDiagAnswer.creationDate.isValid()
                    ? gearDiagAnswer.creationDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((gearDiagAnswer: IGearDiagAnswer) => {
                gearDiagAnswer.creationDate = gearDiagAnswer.creationDate != null ? moment(gearDiagAnswer.creationDate) : null;
            });
        }
        return res;
    }
}
