import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearPortfolio } from 'app/shared/model/gear-portfolio.model';

type EntityResponseType = HttpResponse<IGearPortfolio>;
type EntityArrayResponseType = HttpResponse<IGearPortfolio[]>;

@Injectable({ providedIn: 'root' })
export class GearPortfolioService {
    public resourceUrl = SERVER_API_URL + 'api/gear-portfolios';

    constructor(private http: HttpClient) {}

    create(gearPortfolio: IGearPortfolio): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearPortfolio);
        return this.http
            .post<IGearPortfolio>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(gearPortfolio: IGearPortfolio): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearPortfolio);
        return this.http
            .put<IGearPortfolio>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IGearPortfolio>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IGearPortfolio[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    /**
     * Filtrado de portafolios por Unidad Organizacional
     * @param organizationalUnitId
     */
    portfolioByUnitId(organizationalUnitId: number): Observable<any> {
        return this.http.get(`${this.resourceUrl}/${organizationalUnitId}/consult`);
    }

    protected convertDateFromClient(gearPortfolio: IGearPortfolio): IGearPortfolio {
        const copy: IGearPortfolio = Object.assign({}, gearPortfolio, {
            startDate:
                gearPortfolio.startDate != null && gearPortfolio.startDate.isValid() ? gearPortfolio.startDate.format(DATE_FORMAT) : null,
            creationDate:
                gearPortfolio.creationDate != null && gearPortfolio.creationDate.isValid()
                    ? gearPortfolio.creationDate.format(DATE_FORMAT)
                    : null,
            lastModifiedDate:
                gearPortfolio.lastModifiedDate != null && gearPortfolio.lastModifiedDate.isValid()
                    ? gearPortfolio.lastModifiedDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
            res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
            res.body.lastModifiedDate = res.body.lastModifiedDate != null ? moment(res.body.lastModifiedDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((gearPortfolio: IGearPortfolio) => {
                gearPortfolio.startDate = gearPortfolio.startDate != null ? moment(gearPortfolio.startDate) : null;
                gearPortfolio.creationDate = gearPortfolio.creationDate != null ? moment(gearPortfolio.creationDate) : null;
                gearPortfolio.lastModifiedDate = gearPortfolio.lastModifiedDate != null ? moment(gearPortfolio.lastModifiedDate) : null;
            });
        }
        return res;
    }
}
