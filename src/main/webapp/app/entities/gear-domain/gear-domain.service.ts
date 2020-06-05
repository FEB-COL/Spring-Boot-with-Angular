import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearDomain } from 'app/shared/model/gear-domain.model';

type EntityResponseType = HttpResponse<IGearDomain>;
type EntityArrayResponseType = HttpResponse<IGearDomain[]>;

@Injectable({ providedIn: 'root' })
export class GearDomainService {
    public resourceUrl = SERVER_API_URL + 'api/gear-domains';

    constructor(private http: HttpClient) {}

    create(gearDomain: IGearDomain): Observable<EntityResponseType> {
        return this.http.post<IGearDomain>(this.resourceUrl, gearDomain, { observe: 'response' });
    }

    update(gearDomain: IGearDomain): Observable<EntityResponseType> {
        return this.http.put<IGearDomain>(this.resourceUrl, gearDomain, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGearDomain>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGearDomain[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    /**
     * Filtrado de Dominios por Unidad Organizacional
     * @param organizationalUnitId
     */
    domainByUnitId(organizationalUnitId: number): Observable<any> {
        return this.http.get(`${this.resourceUrl}/${organizationalUnitId}/consult`);
    }
}
