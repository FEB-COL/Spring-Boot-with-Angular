import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearRiskLog } from 'app/shared/model/gear-risk-log.model';

type EntityResponseType = HttpResponse<IGearRiskLog>;
type EntityArrayResponseType = HttpResponse<IGearRiskLog[]>;

@Injectable({ providedIn: 'root' })
export class GearRiskLogService {
    public resourceUrl = SERVER_API_URL + 'api/gear-risk-logs';

    constructor(private http: HttpClient) {}

    create(gearRiskLog: IGearRiskLog): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearRiskLog);
        return this.http
            .post<IGearRiskLog>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(gearRiskLog: IGearRiskLog): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearRiskLog);
        return this.http
            .put<IGearRiskLog>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IGearRiskLog>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IGearRiskLog[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(gearRiskLog: IGearRiskLog): IGearRiskLog {
        const copy: IGearRiskLog = Object.assign({}, gearRiskLog, {
            date: gearRiskLog.date != null && gearRiskLog.date.isValid() ? gearRiskLog.date.format(DATE_FORMAT) : null,
            creationDate:
                gearRiskLog.creationDate != null && gearRiskLog.creationDate.isValid()
                    ? gearRiskLog.creationDate.format(DATE_FORMAT)
                    : null,
            lastModifiedDate:
                gearRiskLog.lastModifiedDate != null && gearRiskLog.lastModifiedDate.isValid()
                    ? gearRiskLog.lastModifiedDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.date = res.body.date != null ? moment(res.body.date) : null;
            res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
            res.body.lastModifiedDate = res.body.lastModifiedDate != null ? moment(res.body.lastModifiedDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((gearRiskLog: IGearRiskLog) => {
                gearRiskLog.date = gearRiskLog.date != null ? moment(gearRiskLog.date) : null;
                gearRiskLog.creationDate = gearRiskLog.creationDate != null ? moment(gearRiskLog.creationDate) : null;
                gearRiskLog.lastModifiedDate = gearRiskLog.lastModifiedDate != null ? moment(gearRiskLog.lastModifiedDate) : null;
            });
        }
        return res;
    }
}
