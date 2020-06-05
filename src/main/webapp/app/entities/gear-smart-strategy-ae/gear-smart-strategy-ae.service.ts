import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearSmartStrategyAE } from 'app/shared/model/gear-smart-strategy-ae.model';

type EntityResponseType = HttpResponse<IGearSmartStrategyAE>;
type EntityArrayResponseType = HttpResponse<IGearSmartStrategyAE[]>;

@Injectable({ providedIn: 'root' })
export class GearSmartStrategyAEService {
    public resourceUrl = SERVER_API_URL + 'api/gear-smart-strategy-aes';

    constructor(private http: HttpClient) {}

    create(gearSmartStrategyAE: IGearSmartStrategyAE): Observable<EntityResponseType> {
        return this.http.post<IGearSmartStrategyAE>(this.resourceUrl, gearSmartStrategyAE, { observe: 'response' });
    }

    update(gearSmartStrategyAE: IGearSmartStrategyAE): Observable<EntityResponseType> {
        return this.http.put<IGearSmartStrategyAE>(this.resourceUrl, gearSmartStrategyAE, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGearSmartStrategyAE>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGearSmartStrategyAE[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
