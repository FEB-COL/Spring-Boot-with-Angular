import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearValueChainMacroprocess } from 'app/shared/model/gear-value-chain-macroprocess.model';

type EntityResponseType = HttpResponse<IGearValueChainMacroprocess>;
type EntityArrayResponseType = HttpResponse<IGearValueChainMacroprocess[]>;

@Injectable({ providedIn: 'root' })
export class GearValueChainMacroprocessService {
    public resourceUrl = SERVER_API_URL + 'api/gear-value-chain-macroprocesses';

    constructor(private http: HttpClient) {}

    create(gearValueChainMacroprocess: IGearValueChainMacroprocess): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearValueChainMacroprocess);
        return this.http
            .post<IGearValueChainMacroprocess>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(gearValueChainMacroprocess: IGearValueChainMacroprocess): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearValueChainMacroprocess);
        return this.http
            .put<IGearValueChainMacroprocess>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IGearValueChainMacroprocess>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IGearValueChainMacroprocess[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(gearValueChainMacroprocess: IGearValueChainMacroprocess): IGearValueChainMacroprocess {
        const copy: IGearValueChainMacroprocess = Object.assign({}, gearValueChainMacroprocess, {
            creationDate:
                gearValueChainMacroprocess.creationDate != null && gearValueChainMacroprocess.creationDate.isValid()
                    ? gearValueChainMacroprocess.creationDate.format(DATE_FORMAT)
                    : null,
            lastUpdate:
                gearValueChainMacroprocess.lastUpdate != null && gearValueChainMacroprocess.lastUpdate.isValid()
                    ? gearValueChainMacroprocess.lastUpdate.format(DATE_FORMAT)
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
            res.body.forEach((gearValueChainMacroprocess: IGearValueChainMacroprocess) => {
                gearValueChainMacroprocess.creationDate =
                    gearValueChainMacroprocess.creationDate != null ? moment(gearValueChainMacroprocess.creationDate) : null;
                gearValueChainMacroprocess.lastUpdate =
                    gearValueChainMacroprocess.lastUpdate != null ? moment(gearValueChainMacroprocess.lastUpdate) : null;
            });
        }
        return res;
    }
}
