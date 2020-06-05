import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearValueChainProcess } from 'app/shared/model/gear-value-chain-process.model';

type EntityResponseType = HttpResponse<IGearValueChainProcess>;
type EntityArrayResponseType = HttpResponse<IGearValueChainProcess[]>;

@Injectable({ providedIn: 'root' })
export class GearValueChainProcessService {
    public resourceUrl = SERVER_API_URL + 'api/gear-value-chain-processes';

    constructor(private http: HttpClient) {}

    create(gearValueChainProcess: IGearValueChainProcess): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearValueChainProcess);
        return this.http
            .post<IGearValueChainProcess>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(gearValueChainProcess: IGearValueChainProcess): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearValueChainProcess);
        return this.http
            .put<IGearValueChainProcess>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IGearValueChainProcess>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IGearValueChainProcess[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(gearValueChainProcess: IGearValueChainProcess): IGearValueChainProcess {
        const copy: IGearValueChainProcess = Object.assign({}, gearValueChainProcess, {
            creationDate:
                gearValueChainProcess.creationDate != null && gearValueChainProcess.creationDate.isValid()
                    ? gearValueChainProcess.creationDate.format(DATE_FORMAT)
                    : null,
            lastUpdate:
                gearValueChainProcess.lastUpdate != null && gearValueChainProcess.lastUpdate.isValid()
                    ? gearValueChainProcess.lastUpdate.format(DATE_FORMAT)
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
            res.body.forEach((gearValueChainProcess: IGearValueChainProcess) => {
                gearValueChainProcess.creationDate =
                    gearValueChainProcess.creationDate != null ? moment(gearValueChainProcess.creationDate) : null;
                gearValueChainProcess.lastUpdate =
                    gearValueChainProcess.lastUpdate != null ? moment(gearValueChainProcess.lastUpdate) : null;
            });
        }
        return res;
    }
}
