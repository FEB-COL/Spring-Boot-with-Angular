import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearSurveyQuestionType } from 'app/shared/model/gear-survey-question-type.model';

type EntityResponseType = HttpResponse<IGearSurveyQuestionType>;
type EntityArrayResponseType = HttpResponse<IGearSurveyQuestionType[]>;

@Injectable({ providedIn: 'root' })
export class GearSurveyQuestionTypeService {
    public resourceUrl = SERVER_API_URL + 'api/gear-survey-question-types';

    constructor(private http: HttpClient) {}

    create(gearSurveyQuestionType: IGearSurveyQuestionType): Observable<EntityResponseType> {
        return this.http.post<IGearSurveyQuestionType>(this.resourceUrl, gearSurveyQuestionType, { observe: 'response' });
    }

    update(gearSurveyQuestionType: IGearSurveyQuestionType): Observable<EntityResponseType> {
        return this.http.put<IGearSurveyQuestionType>(this.resourceUrl, gearSurveyQuestionType, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGearSurveyQuestionType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGearSurveyQuestionType[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
