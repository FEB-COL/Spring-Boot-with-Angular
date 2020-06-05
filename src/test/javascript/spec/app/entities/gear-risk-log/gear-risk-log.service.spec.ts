/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { GearRiskLogService } from 'app/entities/gear-risk-log/gear-risk-log.service';
import { IGearRiskLog, GearRiskLog } from 'app/shared/model/gear-risk-log.model';

describe('Service Tests', () => {
    describe('GearRiskLog Service', () => {
        let injector: TestBed;
        let service: GearRiskLogService;
        let httpMock: HttpTestingController;
        let elemDefault: IGearRiskLog;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(GearRiskLogService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new GearRiskLog(0, 'AAAAAAA', currentDate, 'AAAAAAA', currentDate, 'AAAAAAA', currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        date: currentDate.format(DATE_FORMAT),
                        creationDate: currentDate.format(DATE_FORMAT),
                        lastModifiedDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a GearRiskLog', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        date: currentDate.format(DATE_FORMAT),
                        creationDate: currentDate.format(DATE_FORMAT),
                        lastModifiedDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        date: currentDate,
                        creationDate: currentDate,
                        lastModifiedDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new GearRiskLog(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a GearRiskLog', async () => {
                const returnedFromService = Object.assign(
                    {
                        log: 'BBBBBB',
                        date: currentDate.format(DATE_FORMAT),
                        createdBy: 'BBBBBB',
                        creationDate: currentDate.format(DATE_FORMAT),
                        lastModifiedBy: 'BBBBBB',
                        lastModifiedDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        date: currentDate,
                        creationDate: currentDate,
                        lastModifiedDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of GearRiskLog', async () => {
                const returnedFromService = Object.assign(
                    {
                        log: 'BBBBBB',
                        date: currentDate.format(DATE_FORMAT),
                        createdBy: 'BBBBBB',
                        creationDate: currentDate.format(DATE_FORMAT),
                        lastModifiedBy: 'BBBBBB',
                        lastModifiedDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        date: currentDate,
                        creationDate: currentDate,
                        lastModifiedDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a GearRiskLog', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
