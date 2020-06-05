import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearWiki } from 'app/shared/model/gear-wiki.model';

type EntityResponseType = HttpResponse<IGearWiki>;
type EntityArrayResponseType = HttpResponse<IGearWiki[]>;

@Injectable({ providedIn: 'root' })
export class GearWikiService {
    public resourceUrl = SERVER_API_URL + 'api/gear-wikis';

    constructor(private http: HttpClient) {}

    create(gearWiki: IGearWiki): Observable<EntityResponseType> {
        return this.http.post<IGearWiki>(this.resourceUrl, gearWiki, { observe: 'response' });
    }

    update(gearWiki: IGearWiki): Observable<EntityResponseType> {
        return this.http.put<IGearWiki>(this.resourceUrl, gearWiki, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGearWiki>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGearWiki[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
