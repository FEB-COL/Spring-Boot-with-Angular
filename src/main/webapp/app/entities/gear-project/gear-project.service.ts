import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearProject } from 'app/shared/model/gear-project.model';

type EntityResponseType = HttpResponse<IGearProject>;
type EntityArrayResponseType = HttpResponse<IGearProject[]>;

@Injectable({ providedIn: 'root' })
export class GearProjectService {
    public resourceUrl = SERVER_API_URL + 'api/gear-projects';

    constructor(private http: HttpClient) {}

    create(gearProject: IGearProject): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearProject);
        return this.http
            .post<IGearProject>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(gearProject: IGearProject): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearProject);
        return this.http
            .put<IGearProject>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IGearProject>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IGearProject[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(gearProject: IGearProject): IGearProject {
        const copy: IGearProject = Object.assign({}, gearProject, {
            startDate: gearProject.startDate != null && gearProject.startDate.isValid() ? gearProject.startDate.format(DATE_FORMAT) : null,
            endDate: gearProject.endDate != null && gearProject.endDate.isValid() ? gearProject.endDate.format(DATE_FORMAT) : null,
            creationDate:
                gearProject.creationDate != null && gearProject.creationDate.isValid()
                    ? gearProject.creationDate.format(DATE_FORMAT)
                    : null,
            lastModifiedDate:
                gearProject.lastModifiedDate != null && gearProject.lastModifiedDate.isValid()
                    ? gearProject.lastModifiedDate.format(DATE_FORMAT)
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
            res.body.forEach((gearProject: IGearProject) => {
                gearProject.startDate = gearProject.startDate != null ? moment(gearProject.startDate) : null;
                gearProject.endDate = gearProject.endDate != null ? moment(gearProject.endDate) : null;
                gearProject.creationDate = gearProject.creationDate != null ? moment(gearProject.creationDate) : null;
                gearProject.lastModifiedDate = gearProject.lastModifiedDate != null ? moment(gearProject.lastModifiedDate) : null;
            });
        }
        return res;
    }
}
