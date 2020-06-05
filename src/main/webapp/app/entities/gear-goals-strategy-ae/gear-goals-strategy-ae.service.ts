import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearGoalsStrategyAE } from 'app/shared/model/gear-goals-strategy-ae.model';

type EntityResponseType = HttpResponse<IGearGoalsStrategyAE>;
type EntityArrayResponseType = HttpResponse<IGearGoalsStrategyAE[]>;

@Injectable({ providedIn: 'root' })
export class GearGoalsStrategyAEService {
    public resourceUrl = SERVER_API_URL + 'api/gear-goals-strategy-aes';

    constructor(private http: HttpClient) {}

    create(gearGoalsStrategyAE: IGearGoalsStrategyAE): Observable<EntityResponseType> {
        return this.http.post<IGearGoalsStrategyAE>(this.resourceUrl, gearGoalsStrategyAE, { observe: 'response' });
    }

    update(gearGoalsStrategyAE: IGearGoalsStrategyAE): Observable<EntityResponseType> {
        return this.http.put<IGearGoalsStrategyAE>(this.resourceUrl, gearGoalsStrategyAE, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGearGoalsStrategyAE>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGearGoalsStrategyAE[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    /**
     * Filtrado de estrategias por Unidad Organizacional
     * @param organizationalUnitId
     */
    strategyByUnitId(organizationalUnitId: number): Observable<any> {
        return this.http.get(`${this.resourceUrl}/${organizationalUnitId}/consult`);
    }
}
