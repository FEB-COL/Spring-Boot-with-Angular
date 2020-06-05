import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearDecision } from 'app/shared/model/gear-decision.model';

type EntityResponseType = HttpResponse<IGearDecision>;
type EntityArrayResponseType = HttpResponse<IGearDecision[]>;

@Injectable({ providedIn: 'root' })
export class GearDecisionService {
    public resourceUrl = SERVER_API_URL + 'api/gear-decisions';

    constructor(private http: HttpClient) {}

    create(gearDecision: IGearDecision): Observable<EntityResponseType> {
        return this.http.post<IGearDecision>(this.resourceUrl, gearDecision, { observe: 'response' });
    }

    update(gearDecision: IGearDecision): Observable<EntityResponseType> {
        return this.http.put<IGearDecision>(this.resourceUrl, gearDecision, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGearDecision>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGearDecision[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
