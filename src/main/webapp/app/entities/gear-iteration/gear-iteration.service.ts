import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearIteration } from 'app/shared/model/gear-iteration.model';

type EntityResponseType = HttpResponse<IGearIteration>;
type EntityArrayResponseType = HttpResponse<IGearIteration[]>;

@Injectable({ providedIn: 'root' })
export class GearIterationService {
    public resourceUrl = SERVER_API_URL + 'api/gear-iterations';

    constructor(private http: HttpClient) {}

    create(gearIteration: IGearIteration): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearIteration);
        return this.http
            .post<IGearIteration>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(gearIteration: IGearIteration): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearIteration);
        return this.http
            .put<IGearIteration>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IGearIteration>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IGearIteration[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(gearIteration: IGearIteration): IGearIteration {
        const copy: IGearIteration = Object.assign({}, gearIteration, {
            startDate:
                gearIteration.startDate != null && gearIteration.startDate.isValid() ? gearIteration.startDate.format(DATE_FORMAT) : null,
            endDate: gearIteration.endDate != null && gearIteration.endDate.isValid() ? gearIteration.endDate.format(DATE_FORMAT) : null,
            creationDate:
                gearIteration.creationDate != null && gearIteration.creationDate.isValid()
                    ? gearIteration.creationDate.format(DATE_FORMAT)
                    : null,
            lastModifiedDate:
                gearIteration.lastModifiedDate != null && gearIteration.lastModifiedDate.isValid()
                    ? gearIteration.lastModifiedDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
            res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
            res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
            res.body.lastModifiedDate = res.body.lastModifiedDate != null ? moment(res.body.lastModifiedDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((gearIteration: IGearIteration) => {
                gearIteration.startDate = gearIteration.startDate != null ? moment(gearIteration.startDate) : null;
                gearIteration.endDate = gearIteration.endDate != null ? moment(gearIteration.endDate) : null;
                gearIteration.creationDate = gearIteration.creationDate != null ? moment(gearIteration.creationDate) : null;
                gearIteration.lastModifiedDate = gearIteration.lastModifiedDate != null ? moment(gearIteration.lastModifiedDate) : null;
            });
        }
        return res;
    }
}
