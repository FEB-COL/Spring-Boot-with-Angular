import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearInformationSystems } from 'app/shared/model/gear-information-systems.model';

type EntityResponseType = HttpResponse<IGearInformationSystems>;
type EntityArrayResponseType = HttpResponse<IGearInformationSystems[]>;

@Injectable({ providedIn: 'root' })
export class GearInformationSystemsService {
    public resourceUrl = SERVER_API_URL + 'api/gear-information-systems';

    constructor(private http: HttpClient) {}

    create(gearInformationSystems: IGearInformationSystems): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearInformationSystems);
        return this.http
            .post<IGearInformationSystems>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(gearInformationSystems: IGearInformationSystems): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearInformationSystems);
        return this.http
            .put<IGearInformationSystems>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IGearInformationSystems>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }
    //36-38 en system-funtionality

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IGearInformationSystems[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    /**
     * Filtrado de sistemas de Informacion por Unidad Organizacional
     * @param organizationalUnitId
     */
    informationSystemByUnitId(organizationalUnitId: number): Observable<any> {
        return this.http.get(`${this.resourceUrl}/${organizationalUnitId}/consult`);
    }

    protected convertDateFromClient(gearInformationSystems: IGearInformationSystems): IGearInformationSystems {
        const copy: IGearInformationSystems = Object.assign({}, gearInformationSystems, {
            acquisitionDate:
                gearInformationSystems.acquisitionDate != null && gearInformationSystems.acquisitionDate.isValid()
                    ? gearInformationSystems.acquisitionDate.format(DATE_FORMAT)
                    : null,
            startDate:
                gearInformationSystems.startDate != null && gearInformationSystems.startDate.isValid()
                    ? gearInformationSystems.startDate.format(DATE_FORMAT)
                    : null,
            creationDate:
                gearInformationSystems.creationDate != null && gearInformationSystems.creationDate.isValid()
                    ? gearInformationSystems.creationDate.format(DATE_FORMAT)
                    : null,
            modifyDate:
                gearInformationSystems.modifyDate != null && gearInformationSystems.modifyDate.isValid()
                    ? gearInformationSystems.modifyDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.acquisitionDate = res.body.acquisitionDate != null ? moment(res.body.acquisitionDate) : null;
            res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
            res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
            res.body.modifyDate = res.body.modifyDate != null ? moment(res.body.modifyDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((gearInformationSystems: IGearInformationSystems) => {
                gearInformationSystems.acquisitionDate =
                    gearInformationSystems.acquisitionDate != null ? moment(gearInformationSystems.acquisitionDate) : null;
                gearInformationSystems.startDate =
                    gearInformationSystems.startDate != null ? moment(gearInformationSystems.startDate) : null;
                gearInformationSystems.creationDate =
                    gearInformationSystems.creationDate != null ? moment(gearInformationSystems.creationDate) : null;
                gearInformationSystems.modifyDate =
                    gearInformationSystems.modifyDate != null ? moment(gearInformationSystems.modifyDate) : null;
            });
        }
        return res;
    }
}
