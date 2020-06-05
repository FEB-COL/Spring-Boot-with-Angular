import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearCustomFieldTemplate } from 'app/shared/model/gear-custom-field-template.model';

type EntityResponseType = HttpResponse<IGearCustomFieldTemplate>;
type EntityArrayResponseType = HttpResponse<IGearCustomFieldTemplate[]>;

@Injectable({ providedIn: 'root' })
export class GearCustomFieldTemplateService {
    public resourceUrl = SERVER_API_URL + 'api/gear-custom-field-templates';

    constructor(private http: HttpClient) {}

    create(gearCustomFieldTemplate: IGearCustomFieldTemplate): Observable<EntityResponseType> {
        return this.http.post<IGearCustomFieldTemplate>(this.resourceUrl, gearCustomFieldTemplate, { observe: 'response' });
    }

    update(gearCustomFieldTemplate: IGearCustomFieldTemplate): Observable<EntityResponseType> {
        return this.http.put<IGearCustomFieldTemplate>(this.resourceUrl, gearCustomFieldTemplate, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGearCustomFieldTemplate>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGearCustomFieldTemplate[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
