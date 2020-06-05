import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearValueChainCategory } from 'app/shared/model/gear-value-chain-category.model';

type EntityResponseType = HttpResponse<IGearValueChainCategory>;
type EntityArrayResponseType = HttpResponse<IGearValueChainCategory[]>;

@Injectable({ providedIn: 'root' })
export class GearValueChainCategoryService {
    public resourceUrl = SERVER_API_URL + 'api/gear-value-chain-categories';

    constructor(private http: HttpClient) {}

    create(gearValueChainCategory: IGearValueChainCategory): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearValueChainCategory);
        return this.http
            .post<IGearValueChainCategory>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(gearValueChainCategory: IGearValueChainCategory): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearValueChainCategory);
        return this.http
            .put<IGearValueChainCategory>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IGearValueChainCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IGearValueChainCategory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    /**
     * Filtrado de Categorias por Unidad Organizacional
     * @param organizationalUnitId
     */
    categoryByUnitId(organizationalUnitId: number): Observable<any> {
        return this.http.get(`${this.resourceUrl}/${organizationalUnitId}/consult`);
    }

    protected convertDateFromClient(gearValueChainCategory: IGearValueChainCategory): IGearValueChainCategory {
        const copy: IGearValueChainCategory = Object.assign({}, gearValueChainCategory, {
            creationDate:
                gearValueChainCategory.creationDate != null && gearValueChainCategory.creationDate.isValid()
                    ? gearValueChainCategory.creationDate.format(DATE_FORMAT)
                    : null,
            lastUpdate:
                gearValueChainCategory.lastUpdate != null && gearValueChainCategory.lastUpdate.isValid()
                    ? gearValueChainCategory.lastUpdate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
            res.body.lastUpdate = res.body.lastUpdate != null ? moment(res.body.lastUpdate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((gearValueChainCategory: IGearValueChainCategory) => {
                gearValueChainCategory.creationDate =
                    gearValueChainCategory.creationDate != null ? moment(gearValueChainCategory.creationDate) : null;
                gearValueChainCategory.lastUpdate =
                    gearValueChainCategory.lastUpdate != null ? moment(gearValueChainCategory.lastUpdate) : null;
            });
        }
        return res;
    }
}
