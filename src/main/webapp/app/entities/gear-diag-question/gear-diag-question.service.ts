import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearDiagQuestion } from 'app/shared/model/gear-diag-question.model';

type EntityResponseType = HttpResponse<IGearDiagQuestion>;
type EntityArrayResponseType = HttpResponse<IGearDiagQuestion[]>;

@Injectable({ providedIn: 'root' })
export class GearDiagQuestionService {
    public resourceUrl = SERVER_API_URL + 'api/gear-diag-questions';

    constructor(private http: HttpClient) {}

    create(gearDiagQuestion: IGearDiagQuestion): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearDiagQuestion);
        return this.http
            .post<IGearDiagQuestion>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(gearDiagQuestion: IGearDiagQuestion): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearDiagQuestion);
        return this.http
            .put<IGearDiagQuestion>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IGearDiagQuestion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IGearDiagQuestion[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(gearDiagQuestion: IGearDiagQuestion): IGearDiagQuestion {
        const copy: IGearDiagQuestion = Object.assign({}, gearDiagQuestion, {
            creationDate:
                gearDiagQuestion.creationDate != null && gearDiagQuestion.creationDate.isValid()
                    ? gearDiagQuestion.creationDate.format(DATE_FORMAT)
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
            res.body.forEach((gearDiagQuestion: IGearDiagQuestion) => {
                gearDiagQuestion.creationDate = gearDiagQuestion.creationDate != null ? moment(gearDiagQuestion.creationDate) : null;
            });
        }
        return res;
    }
}
