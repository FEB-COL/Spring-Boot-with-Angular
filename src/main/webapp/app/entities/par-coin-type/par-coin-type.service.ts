import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IParCoinType } from 'app/shared/model/par-coin-type.model';

type EntityResponseType = HttpResponse<IParCoinType>;
type EntityArrayResponseType = HttpResponse<IParCoinType[]>;

@Injectable({ providedIn: 'root' })
export class ParCoinTypeService {
    public resourceUrl = SERVER_API_URL + 'api/par-coin-types';

    constructor(private http: HttpClient) {}

    create(parCoinType: IParCoinType): Observable<EntityResponseType> {
        return this.http.post<IParCoinType>(this.resourceUrl, parCoinType, { observe: 'response' });
    }

    update(parCoinType: IParCoinType): Observable<EntityResponseType> {
        return this.http.put<IParCoinType>(this.resourceUrl, parCoinType, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IParCoinType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IParCoinType[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
