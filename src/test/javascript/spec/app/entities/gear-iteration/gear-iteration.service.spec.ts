/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { GearIterationService } from 'app/entities/gear-iteration/gear-iteration.service';
import { IGearIteration, GearIteration } from 'app/shared/model/gear-iteration.model';

describe('Service Tests', () => {
    describe('GearIteration Service', () => {
        let injector: TestBed;
        let service: GearIterationService;
        let httpMock: HttpTestingController;
        let elemDefault: IGearIteration;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(GearIterationService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new GearIteration(
                0,
                'AAAAAAA',
                'AAAAAAA',
                currentDate,
                currentDate,
                'AAAAAAA',
                currentDate,
                'AAAAAAA',
                currentDate
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        startDate: currentDate.format(DATE_FORMAT),
                        endDate: currentDate.format(DATE_FORMAT),
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

            it('should create a GearIteration', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        startDate: currentDate.format(DATE_FORMAT),
                        endDate: currentDate.format(DATE_FORMAT),
                        creationDate: currentDate.format(DATE_FORMAT),
                        lastModifiedDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        startDate: currentDate,
                        endDate: currentDate,
                        creationDate: currentDate,
                        lastModifiedDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new GearIteration(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a GearIteration', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        description: 'BBBBBB',
                        startDate: currentDate.format(DATE_FORMAT),
                        endDate: currentDate.format(DATE_FORMAT),
                        createdBy: 'BBBBBB',
                        creationDate: currentDate.format(DATE_FORMAT),
                        lastModifiedBy: 'BBBBBB',
                        lastModifiedDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        startDate: currentDate,
                        endDate: currentDate,
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

            it('should return a list of GearIteration', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        description: 'BBBBBB',
                        startDate: currentDate.format(DATE_FORMAT),
                        endDate: currentDate.format(DATE_FORMAT),
                        createdBy: 'BBBBBB',
                        creationDate: currentDate.format(DATE_FORMAT),
                        lastModifiedBy: 'BBBBBB',
                        lastModifiedDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        startDate: currentDate,
                        endDate: currentDate,
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

            it('should delete a GearIteration', async () => {
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
