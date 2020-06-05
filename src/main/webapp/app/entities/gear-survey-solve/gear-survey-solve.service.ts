import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearSurveySolve } from 'app/shared/model/gear-survey-solve.model';

type EntityResponseType = HttpResponse<IGearSurveySolve>;
type EntityArrayResponseType = HttpResponse<IGearSurveySolve[]>;

@Injectable({ providedIn: 'root' })
export class GearSurveySolveService {
    public resourceUrl = SERVER_API_URL + 'api/gear-survey-solves';

    constructor(private http: HttpClient) {}

    create(gearSurveySolve: IGearSurveySolve): Observable<EntityResponseType> {
        return this.http.post<IGearSurveySolve>(this.resourceUrl, gearSurveySolve, { observe: 'response' });
    }

    update(gearSurveySolve: IGearSurveySolve): Observable<EntityResponseType> {
        return this.http.put<IGearSurveySolve>(this.resourceUrl, gearSurveySolve, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGearSurveySolve>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGearSurveySolve[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
