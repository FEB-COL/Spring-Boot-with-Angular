/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { GearInformationSystemsService } from 'app/entities/gear-information-systems/gear-information-systems.service';
import { IGearInformationSystems, GearInformationSystems } from 'app/shared/model/gear-information-systems.model';

describe('Service Tests', () => {
    describe('GearInformationSystems Service', () => {
        let injector: TestBed;
        let service: GearInformationSystemsService;
        let httpMock: HttpTestingController;
        let elemDefault: IGearInformationSystems;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(GearInformationSystemsService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new GearInformationSystems(
                0,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                currentDate,
                currentDate,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                0,
                0,
                currentDate,
                currentDate
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        acquisitionDate: currentDate.format(DATE_FORMAT),
                        startDate: currentDate.format(DATE_FORMAT),
                        creationDate: currentDate.format(DATE_FORMAT),
                        modifyDate: currentDate.format(DATE_FORMAT)
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

            it('should create a GearInformationSystems', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        acquisitionDate: currentDate.format(DATE_FORMAT),
                        startDate: currentDate.format(DATE_FORMAT),
                        creationDate: currentDate.format(DATE_FORMAT),
                        modifyDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        acquisitionDate: currentDate,
                        startDate: currentDate,
                        creationDate: currentDate,
                        modifyDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new GearInformationSystems(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a GearInformationSystems', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        description: 'BBBBBB',
                        version: 'BBBBBB',
                        acquisitionDate: currentDate.format(DATE_FORMAT),
                        startDate: currentDate.format(DATE_FORMAT),
                        responsible: 'BBBBBB',
                        responsibleEmail: 'BBBBBB',
                        provider: 'BBBBBB',
                        initialCost: 1,
                        mainteinanceCost: 1,
                        creationDate: currentDate.format(DATE_FORMAT),
                        modifyDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        acquisitionDate: currentDate,
                        startDate: currentDate,
                        creationDate: currentDate,
                        modifyDate: currentDate
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

            it('should return a list of GearInformationSystems', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        description: 'BBBBBB',
                        version: 'BBBBBB',
                        acquisitionDate: currentDate.format(DATE_FORMAT),
                        startDate: currentDate.format(DATE_FORMAT),
                        responsible: 'BBBBBB',
                        responsibleEmail: 'BBBBBB',
                        provider: 'BBBBBB',
                        initialCost: 1,
                        mainteinanceCost: 1,
                        creationDate: currentDate.format(DATE_FORMAT),
                        modifyDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        acquisitionDate: currentDate,
                        startDate: currentDate,
                        creationDate: currentDate,
                        modifyDate: currentDate
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

            it('should delete a GearInformationSystems', async () => {
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
