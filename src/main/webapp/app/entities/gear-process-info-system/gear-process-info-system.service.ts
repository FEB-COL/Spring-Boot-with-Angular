import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearProcessInfoSystem } from 'app/shared/model/gear-process-info-system.model';

type EntityResponseType = HttpResponse<IGearProcessInfoSystem>;
type EntityArrayResponseType = HttpResponse<IGearProcessInfoSystem[]>;

@Injectable({ providedIn: 'root' })
export class GearProcessInfoSystemService {
    public resourceUrl = SERVER_API_URL + 'api/gear-process-info-systems';

    constructor(private http: HttpClient) {}

    create(gearProcessInfoSystem: IGearProcessInfoSystem): Observable<EntityResponseType> {
        return this.http.post<IGearProcessInfoSystem>(this.resourceUrl, gearProcessInfoSystem, { observe: 'response' });
    }

    update(gearProcessInfoSystem: IGearProcessInfoSystem): Observable<EntityResponseType> {
        return this.http.put<IGearProcessInfoSystem>(this.resourceUrl, gearProcessInfoSystem, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGearProcessInfoSystem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGearProcessInfoSystem[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
