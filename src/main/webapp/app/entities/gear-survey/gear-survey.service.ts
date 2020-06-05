import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearSurvey } from 'app/shared/model/gear-survey.model';

type EntityResponseType = HttpResponse<IGearSurvey>;
type EntityArrayResponseType = HttpResponse<IGearSurvey[]>;

@Injectable({ providedIn: 'root' })
export class GearSurveyService {
    public resourceUrl = SERVER_API_URL + 'api/gear-surveys';

    constructor(private http: HttpClient) {}

    create(gearSurvey: IGearSurvey): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearSurvey);
        return this.http
            .post<IGearSurvey>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(gearSurvey: IGearSurvey): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearSurvey);
        return this.http
            .put<IGearSurvey>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IGearSurvey>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IGearSurvey[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(gearSurvey: IGearSurvey): IGearSurvey {
        const copy: IGearSurvey = Object.assign({}, gearSurvey, {
            start: gearSurvey.start != null && gearSurvey.start.isValid() ? gearSurvey.start.format(DATE_FORMAT) : null,
            end: gearSurvey.end != null && gearSurvey.end.isValid() ? gearSurvey.end.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.start = res.body.start != null ? moment(res.body.start) : null;
            res.body.end = res.body.end != null ? moment(res.body.end) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((gearSurvey: IGearSurvey) => {
                gearSurvey.start = gearSurvey.start != null ? moment(gearSurvey.start) : null;
                gearSurvey.end = gearSurvey.end != null ? moment(gearSurvey.end) : null;
            });
        }
        return res;
    }

    save(survey: any): Observable<EntityResponseType> {
        return this.http.post(`${this.resourceUrl}/save`, survey, { observe: 'response' });
    }

    complete(id: number): Observable<any> {
        return this.http.get(`${this.resourceUrl}/${id}/complete`, { observe: 'response' });
    }

    solve(survey: any): Observable<any> {
        console.log('Valor de Survey @@@@@', survey);
        return this.http.post(`${this.resourceUrl}/solve`, survey, { observe: 'response' });
    }

    /** Servicio consurtas Encuestas Preguntas y respuestas*/
    exportExcel(gearsurveyId: number): Observable<any> {
        return this.http.get(`${this.resourceUrl}/${gearsurveyId}/consult`);
    }

    /**
     * Filtrado de Dominios por Unidad Organizacional
     * @param organizationalUnitId
     */
    surveyByUnitId(organizationalUnitId: number): Observable<any> {
        return this.http.get(`${this.resourceUrl}/${organizationalUnitId}/consultUnit`);
    }
}
