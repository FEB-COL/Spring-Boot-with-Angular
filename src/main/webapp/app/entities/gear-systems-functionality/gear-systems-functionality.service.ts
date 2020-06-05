import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGearSystemsFunctionality } from 'app/shared/model/gear-systems-functionality.model';

type EntityResponseType = HttpResponse<IGearSystemsFunctionality>;
type EntityArrayResponseType = HttpResponse<IGearSystemsFunctionality[]>;

@Injectable({ providedIn: 'root' })
export class GearSystemsFunctionalityService {
    public resourceUrl = SERVER_API_URL + 'api/gear-systems-functionalities';

    constructor(private http: HttpClient) {}

    create(gearSystemsFunctionality: IGearSystemsFunctionality): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearSystemsFunctionality);
        return this.http
            .post<IGearSystemsFunctionality>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(gearSystemsFunctionality: IGearSystemsFunctionality): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gearSystemsFunctionality);
        return this.http
            .put<IGearSystemsFunctionality>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        //base de datos con spring!
        console.log('mensaje de find', id);
        const result = this.http
            .get<IGearSystemsFunctionality>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
        console.log('PRUEBAAAAAA DE FIND', result);
        //var gearInformationSystems = result.gearInformationSystems
        return result;
    }
    //GIFuntionality> result= result2.name

    /*
          find(id: number): Observable<EntityResponseType> { //base de datos con spring!
        console.log("mensaje de find" ,id);
        return this.http
            .get<IGearSystemsFunctionality>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }
    */

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        console.log('mensaje de find 2', req);
        const result1 = this.http
            .get<IGearSystemsFunctionality[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
        console.log('PRUEBA QUERRY', result1);
        return result1;
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(gearSystemsFunctionality: IGearSystemsFunctionality): IGearSystemsFunctionality {
        const copy: IGearSystemsFunctionality = Object.assign({}, gearSystemsFunctionality, {
            creationDate:
                gearSystemsFunctionality.creationDate != null && gearSystemsFunctionality.creationDate.isValid()
                    ? gearSystemsFunctionality.creationDate.format(DATE_FORMAT)
                    : null,
            modifyDate:
                gearSystemsFunctionality.modifyDate != null && gearSystemsFunctionality.modifyDate.isValid()
                    ? gearSystemsFunctionality.modifyDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
            res.body.modifyDate = res.body.modifyDate != null ? moment(res.body.modifyDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((gearSystemsFunctionality: IGearSystemsFunctionality) => {
                gearSystemsFunctionality.creationDate =
                    gearSystemsFunctionality.creationDate != null ? moment(gearSystemsFunctionality.creationDate) : null;
                gearSystemsFunctionality.modifyDate =
                    gearSystemsFunctionality.modifyDate != null ? moment(gearSystemsFunctionality.modifyDate) : null;
            });
        }
        return res;
    }
}
