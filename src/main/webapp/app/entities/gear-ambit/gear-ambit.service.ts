import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearAmbit } from 'app/shared/model/gear-ambit.model';

type EntityResponseType = HttpResponse<IGearAmbit>;
type EntityArrayResponseType = HttpResponse<IGearAmbit[]>;

@Injectable({ providedIn: 'root' })
export class GearAmbitService {
    public resourceUrl = SERVER_API_URL + 'api/gear-ambits';

    constructor(private http: HttpClient) {}

    create(gearAmbit: IGearAmbit): Observable<EntityResponseType> {
        return this.http.post<IGearAmbit>(this.resourceUrl, gearAmbit, { observe: 'response' });
    }

    update(gearAmbit: IGearAmbit): Observable<EntityResponseType> {
        return this.http.put<IGearAmbit>(this.resourceUrl, gearAmbit, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGearAmbit>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGearAmbit[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
