import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearUser } from 'app/shared/model/gear-user.model';

type EntityResponseType = HttpResponse<IGearUser>;
type EntityArrayResponseType = HttpResponse<IGearUser[]>;

@Injectable({ providedIn: 'root' })
export class GearUserService {
    public resourceUrl = SERVER_API_URL + 'api/gear-users';

    constructor(private http: HttpClient) {}

    create(gearUser: IGearUser): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearUser);
        return this.http
            .post<IGearUser>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(gearUser: IGearUser): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearUser);
        return this.http
            .put<IGearUser>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IGearUser>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IGearUser[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(gearUser: IGearUser): IGearUser {
        const copy: IGearUser = Object.assign({}, gearUser, {
            lastUpdatePasswordDate:
                gearUser.lastUpdatePasswordDate != null && gearUser.lastUpdatePasswordDate.isValid()
                    ? gearUser.lastUpdatePasswordDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.lastUpdatePasswordDate = res.body.lastUpdatePasswordDate != null ? moment(res.body.lastUpdatePasswordDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((gearUser: IGearUser) => {
                gearUser.lastUpdatePasswordDate = gearUser.lastUpdatePasswordDate != null ? moment(gearUser.lastUpdatePasswordDate) : null;
            });
        }
        return res;
    }
}
