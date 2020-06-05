import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAfrescoNode } from 'app/shared/model/afresco-node.model';

type EntityResponseType = HttpResponse<IAfrescoNode>;
type EntityArrayResponseType = HttpResponse<IAfrescoNode[]>;

@Injectable({ providedIn: 'root' })
export class AfrescoNodeService {
    public resourceUrl = SERVER_API_URL + 'api/afresco-nodes';

    constructor(private http: HttpClient) {}

    create(afrescoNode: IAfrescoNode): Observable<EntityResponseType> {
        return this.http.post<IAfrescoNode>(this.resourceUrl, afrescoNode, { observe: 'response' });
    }

    update(afrescoNode: IAfrescoNode): Observable<EntityResponseType> {
        return this.http.put<IAfrescoNode>(this.resourceUrl, afrescoNode, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAfrescoNode>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAfrescoNode[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
