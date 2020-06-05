import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearFiles } from 'app/shared/model/gear-files.model';

type EntityResponseType = HttpResponse<IGearFiles>;
type EntityArrayResponseType = HttpResponse<IGearFiles[]>;

@Injectable({ providedIn: 'root' })
export class GearFilesService {
    public resourceUrl = SERVER_API_URL + 'api/gear-files';

    constructor(private http: HttpClient) {}

    create(gearFiles: IGearFiles): Observable<EntityResponseType> {
        return this.http.post<IGearFiles>(this.resourceUrl, gearFiles, { observe: 'response' });
    }

    update(gearFiles: IGearFiles): Observable<EntityResponseType> {
        return this.http.put<IGearFiles>(this.resourceUrl, gearFiles, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGearFiles>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGearFiles[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
