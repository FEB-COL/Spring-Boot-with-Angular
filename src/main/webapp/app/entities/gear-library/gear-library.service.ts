import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearLibrary } from 'app/shared/model/gear-library.model';

type EntityResponseType = HttpResponse<IGearLibrary>;
type EntityArrayResponseType = HttpResponse<IGearLibrary[]>;

@Injectable({ providedIn: 'root' })
export class GearLibraryService {
    public resourceUrl = SERVER_API_URL + 'api/gear-libraries';

    constructor(private http: HttpClient) {}

    create(gearLibrary: IGearLibrary): Observable<EntityResponseType> {
        return this.http.post<IGearLibrary>(this.resourceUrl, gearLibrary, { observe: 'response' });
    }

    update(gearLibrary: IGearLibrary): Observable<EntityResponseType> {
        return this.http.put<IGearLibrary>(this.resourceUrl, gearLibrary, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGearLibrary>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGearLibrary[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
