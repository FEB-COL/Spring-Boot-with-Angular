import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearSurveyAnswer } from 'app/shared/model/gear-survey-answer.model';

type EntityResponseType = HttpResponse<IGearSurveyAnswer>;
type EntityArrayResponseType = HttpResponse<IGearSurveyAnswer[]>;

@Injectable({ providedIn: 'root' })
export class GearSurveyAnswerService {
    public resourceUrl = SERVER_API_URL + 'api/gear-survey-answers';

    constructor(private http: HttpClient) {}

    create(gearSurveyAnswer: IGearSurveyAnswer): Observable<EntityResponseType> {
        return this.http.post<IGearSurveyAnswer>(this.resourceUrl, gearSurveyAnswer, { observe: 'response' });
    }

    update(gearSurveyAnswer: IGearSurveyAnswer): Observable<EntityResponseType> {
        return this.http.put<IGearSurveyAnswer>(this.resourceUrl, gearSurveyAnswer, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGearSurveyAnswer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGearSurveyAnswer[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
