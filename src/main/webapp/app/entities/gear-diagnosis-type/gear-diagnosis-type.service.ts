import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearDiagnosisType } from 'app/shared/model/gear-diagnosis-type.model';

type EntityResponseType = HttpResponse<IGearDiagnosisType>;
type EntityArrayResponseType = HttpResponse<IGearDiagnosisType[]>;

@Injectable({ providedIn: 'root' })
export class GearDiagnosisTypeService {
    public resourceUrl = SERVER_API_URL + 'api/gear-diagnosis-types';

    constructor(private http: HttpClient) {}

    create(gearDiagnosisType: IGearDiagnosisType): Observable<EntityResponseType> {
        return this.http.post<IGearDiagnosisType>(this.resourceUrl, gearDiagnosisType, { observe: 'response' });
    }

    update(gearDiagnosisType: IGearDiagnosisType): Observable<EntityResponseType> {
        return this.http.put<IGearDiagnosisType>(this.resourceUrl, gearDiagnosisType, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGearDiagnosisType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGearDiagnosisType[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
