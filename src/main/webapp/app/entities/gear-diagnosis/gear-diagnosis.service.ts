import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearDiagnosis } from 'app/shared/model/gear-diagnosis.model';

type EntityResponseType = HttpResponse<IGearDiagnosis>;
type EntityArrayResponseType = HttpResponse<IGearDiagnosis[]>;

@Injectable({ providedIn: 'root' })
export class GearDiagnosisService {
    public resourceUrl = SERVER_API_URL + 'api/gear-diagnoses';

    constructor(private http: HttpClient) {}

    create(gearDiagnosis: IGearDiagnosis): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearDiagnosis);
        return this.http
            .post<IGearDiagnosis>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(gearDiagnosis: IGearDiagnosis): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearDiagnosis);
        return this.http
            .put<IGearDiagnosis>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IGearDiagnosis>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IGearDiagnosis[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(gearDiagnosis: IGearDiagnosis): IGearDiagnosis {
        const copy: IGearDiagnosis = Object.assign({}, gearDiagnosis, {
            creationDate:
                gearDiagnosis.creationDate != null && gearDiagnosis.creationDate.isValid()
                    ? gearDiagnosis.creationDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((gearDiagnosis: IGearDiagnosis) => {
                gearDiagnosis.creationDate = gearDiagnosis.creationDate != null ? moment(gearDiagnosis.creationDate) : null;
            });
        }
        return res;
    }
}
