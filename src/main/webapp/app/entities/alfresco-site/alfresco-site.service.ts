import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAlfrescoSite } from 'app/shared/model/alfresco-site.model';

type EntityResponseType = HttpResponse<IAlfrescoSite>;
type EntityArrayResponseType = HttpResponse<IAlfrescoSite[]>;

@Injectable({ providedIn: 'root' })
export class AlfrescoSiteService {
    public resourceUrl = SERVER_API_URL + 'api/alfresco-sites';

    constructor(private http: HttpClient) {}

    create(alfrescoSite: IAlfrescoSite): Observable<EntityResponseType> {
        return this.http.post<IAlfrescoSite>(this.resourceUrl, alfrescoSite, { observe: 'response' });
    }

    update(alfrescoSite: IAlfrescoSite): Observable<EntityResponseType> {
        return this.http.put<IAlfrescoSite>(this.resourceUrl, alfrescoSite, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAlfrescoSite>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAlfrescoSite[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
