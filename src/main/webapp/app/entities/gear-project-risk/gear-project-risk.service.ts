import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearProjectRisk } from 'app/shared/model/gear-project-risk.model';

type EntityResponseType = HttpResponse<IGearProjectRisk>;
type EntityArrayResponseType = HttpResponse<IGearProjectRisk[]>;

@Injectable({ providedIn: 'root' })
export class GearProjectRiskService {
    public resourceUrl = SERVER_API_URL + 'api/gear-project-risks';

    constructor(private http: HttpClient) {}

    create(gearProjectRisk: IGearProjectRisk): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearProjectRisk);
        return this.http
            .post<IGearProjectRisk>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(gearProjectRisk: IGearProjectRisk): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearProjectRisk);
        return this.http
            .put<IGearProjectRisk>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IGearProjectRisk>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IGearProjectRisk[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(gearProjectRisk: IGearProjectRisk): IGearProjectRisk {
        const copy: IGearProjectRisk = Object.assign({}, gearProjectRisk, {
            firstImpactDate:
                gearProjectRisk.firstImpactDate != null && gearProjectRisk.firstImpactDate.isValid()
                    ? gearProjectRisk.firstImpactDate.format(DATE_FORMAT)
                    : null,
            expectedCloseDate:
                gearProjectRisk.expectedCloseDate != null && gearProjectRisk.expectedCloseDate.isValid()
                    ? gearProjectRisk.expectedCloseDate.format(DATE_FORMAT)
                    : null,
            creationDate:
                gearProjectRisk.creationDate != null && gearProjectRisk.creationDate.isValid()
                    ? gearProjectRisk.creationDate.format(DATE_FORMAT)
                    : null,
            lastModifiedDate:
                gearProjectRisk.lastModifiedDate != null && gearProjectRisk.lastModifiedDate.isValid()
                    ? gearProjectRisk.lastModifiedDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.firstImpactDate = res.body.firstImpactDate != null ? moment(res.body.firstImpactDate) : null;
            res.body.expectedCloseDate = res.body.expectedCloseDate != null ? moment(res.body.expectedCloseDate) : null;
            res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
            res.body.lastModifiedDate = res.body.lastModifiedDate != null ? moment(res.body.lastModifiedDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((gearProjectRisk: IGearProjectRisk) => {
                gearProjectRisk.firstImpactDate = gearProjectRisk.firstImpactDate != null ? moment(gearProjectRisk.firstImpactDate) : null;
                gearProjectRisk.expectedCloseDate =
                    gearProjectRisk.expectedCloseDate != null ? moment(gearProjectRisk.expectedCloseDate) : null;
                gearProjectRisk.creationDate = gearProjectRisk.creationDate != null ? moment(gearProjectRisk.creationDate) : null;
                gearProjectRisk.lastModifiedDate =
                    gearProjectRisk.lastModifiedDate != null ? moment(gearProjectRisk.lastModifiedDate) : null;
            });
        }
        return res;
    }
}
