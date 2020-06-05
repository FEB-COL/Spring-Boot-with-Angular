import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearOrganizationalUnit } from 'app/shared/model/gear-organizational-unit.model';

type EntityResponseType = HttpResponse<IGearOrganizationalUnit>;
type EntityArrayResponseType = HttpResponse<IGearOrganizationalUnit[]>;

@Injectable({ providedIn: 'root' })
export class GearOrganizationalUnitService {
    public resourceUrl = SERVER_API_URL + 'api/gear-organizational-units';

    constructor(private http: HttpClient) {}

    create(gearOrganizationalUnit: IGearOrganizationalUnit): Observable<EntityResponseType> {
        return this.http.post<IGearOrganizationalUnit>(this.resourceUrl, gearOrganizationalUnit, { observe: 'response' });
    }

    update(gearOrganizationalUnit: IGearOrganizationalUnit): Observable<EntityResponseType> {
        return this.http.put<IGearOrganizationalUnit>(this.resourceUrl, gearOrganizationalUnit, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGearOrganizationalUnit>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGearOrganizationalUnit[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
