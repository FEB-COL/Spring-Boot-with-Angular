import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAlfrescoNodeProperties } from 'app/shared/model/alfresco-node-properties.model';

type EntityResponseType = HttpResponse<IAlfrescoNodeProperties>;
type EntityArrayResponseType = HttpResponse<IAlfrescoNodeProperties[]>;

@Injectable({ providedIn: 'root' })
export class AlfrescoNodePropertiesService {
    public resourceUrl = SERVER_API_URL + 'api/alfresco-node-properties';

    constructor(private http: HttpClient) {}

    create(alfrescoNodeProperties: IAlfrescoNodeProperties): Observable<EntityResponseType> {
        return this.http.post<IAlfrescoNodeProperties>(this.resourceUrl, alfrescoNodeProperties, { observe: 'response' });
    }

    update(alfrescoNodeProperties: IAlfrescoNodeProperties): Observable<EntityResponseType> {
        return this.http.put<IAlfrescoNodeProperties>(this.resourceUrl, alfrescoNodeProperties, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAlfrescoNodeProperties>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAlfrescoNodeProperties[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
