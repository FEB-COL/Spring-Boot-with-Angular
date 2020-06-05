import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearCriteria } from 'app/shared/model/gear-criteria.model';

type EntityResponseType = HttpResponse<IGearCriteria>;
type EntityArrayResponseType = HttpResponse<IGearCriteria[]>;

@Injectable({ providedIn: 'root' })
export class GearCriteriaService {
    public resourceUrl = SERVER_API_URL + 'api/gear-criteria';

    constructor(private http: HttpClient) {}

    create(gearCriteria: IGearCriteria): Observable<EntityResponseType> {
        return this.http.post<IGearCriteria>(this.resourceUrl, gearCriteria, { observe: 'response' });
    }

    update(gearCriteria: IGearCriteria): Observable<EntityResponseType> {
        return this.http.put<IGearCriteria>(this.resourceUrl, gearCriteria, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGearCriteria>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGearCriteria[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
