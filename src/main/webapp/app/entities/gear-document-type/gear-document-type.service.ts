import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearDocumentType } from 'app/shared/model/gear-document-type.model';

type EntityResponseType = HttpResponse<IGearDocumentType>;
type EntityArrayResponseType = HttpResponse<IGearDocumentType[]>;

@Injectable({ providedIn: 'root' })
export class GearDocumentTypeService {
    public resourceUrl = SERVER_API_URL + 'api/gear-document-types';

    constructor(private http: HttpClient) {}

    create(gearDocumentType: IGearDocumentType): Observable<EntityResponseType> {
        return this.http.post<IGearDocumentType>(this.resourceUrl, gearDocumentType, { observe: 'response' });
    }

    update(gearDocumentType: IGearDocumentType): Observable<EntityResponseType> {
        return this.http.put<IGearDocumentType>(this.resourceUrl, gearDocumentType, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGearDocumentType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGearDocumentType[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
