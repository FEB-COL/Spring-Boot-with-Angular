import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IParLicenceType } from 'app/shared/model/par-licence-type.model';

type EntityResponseType = HttpResponse<IParLicenceType>;
type EntityArrayResponseType = HttpResponse<IParLicenceType[]>;

@Injectable({ providedIn: 'root' })
export class ParLicenceTypeService {
    public resourceUrl = SERVER_API_URL + 'api/par-licence-types';

    constructor(private http: HttpClient) {}

    create(parLicenceType: IParLicenceType): Observable<EntityResponseType> {
        return this.http.post<IParLicenceType>(this.resourceUrl, parLicenceType, { observe: 'response' });
    }

    update(parLicenceType: IParLicenceType): Observable<EntityResponseType> {
        return this.http.put<IParLicenceType>(this.resourceUrl, parLicenceType, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IParLicenceType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IParLicenceType[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
