import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearSurveyQuestion } from 'app/shared/model/gear-survey-question.model';

type EntityResponseType = HttpResponse<IGearSurveyQuestion>;
type EntityArrayResponseType = HttpResponse<IGearSurveyQuestion[]>;

@Injectable({ providedIn: 'root' })
export class GearSurveyQuestionService {
    public resourceUrl = SERVER_API_URL + 'api/gear-survey-questions';

    constructor(private http: HttpClient) {}

    create(gearSurveyQuestion: IGearSurveyQuestion): Observable<EntityResponseType> {
        return this.http.post<IGearSurveyQuestion>(this.resourceUrl, gearSurveyQuestion, { observe: 'response' });
    }

    update(gearSurveyQuestion: IGearSurveyQuestion): Observable<EntityResponseType> {
        return this.http.put<IGearSurveyQuestion>(this.resourceUrl, gearSurveyQuestion, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGearSurveyQuestion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGearSurveyQuestion[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
