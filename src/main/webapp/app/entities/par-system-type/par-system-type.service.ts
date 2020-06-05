import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IParSystemType } from 'app/shared/model/par-system-type.model';

type EntityResponseType = HttpResponse<IParSystemType>;
type EntityArrayResponseType = HttpResponse<IParSystemType[]>;

@Injectable({ providedIn: 'root' })
export class ParSystemTypeService {
    public resourceUrl = SERVER_API_URL + 'api/par-system-types';

    constructor(private http: HttpClient) {}

    create(parSystemType: IParSystemType): Observable<EntityResponseType> {
        return this.http.post<IParSystemType>(this.resourceUrl, parSystemType, { observe: 'response' });
    }

    update(parSystemType: IParSystemType): Observable<EntityResponseType> {
        return this.http.put<IParSystemType>(this.resourceUrl, parSystemType, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IParSystemType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IParSystemType[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
