/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { GearProjectRiskService } from 'app/entities/gear-project-risk/gear-project-risk.service';
import { IGearProjectRisk, GearProjectRisk } from 'app/shared/model/gear-project-risk.model';

describe('Service Tests', () => {
    describe('GearProjectRisk Service', () => {
        let injector: TestBed;
        let service: GearProjectRiskService;
        let httpMock: HttpTestingController;
        let elemDefault: IGearProjectRisk;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(GearProjectRiskService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new GearProjectRisk(
                0,
                'AAAAAAA',
                0,
                0,
                'AAAAAAA',
                currentDate,
                'AAAAAAA',
                'AAAAAAA',
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
                        firstImpactDate: currentDate.format(DATE_FORMAT),
                        expectedCloseDate: currentDate.format(DATE_FORMAT),
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

            it('should create a GearProjectRisk', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        firstImpactDate: currentDate.format(DATE_FORMAT),
                        expectedCloseDate: currentDate.format(DATE_FORMAT),
                        creationDate: currentDate.format(DATE_FORMAT),
                        lastModifiedDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        firstImpactDate: currentDate,
                        expectedCloseDate: currentDate,
                        creationDate: currentDate,
                        lastModifiedDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new GearProjectRisk(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a GearProjectRisk', async () => {
                const returnedFromService = Object.assign(
                    {
                        status: 'BBBBBB',
                        impact: 1,
                        probability: 1,
                        description: 'BBBBBB',
                        firstImpactDate: currentDate.format(DATE_FORMAT),
                        mitigationStrategy: 'BBBBBB',
                        mitigationDescription: 'BBBBBB',
                        expectedCloseDate: currentDate.format(DATE_FORMAT),
                        createdBy: 'BBBBBB',
                        creationDate: currentDate.format(DATE_FORMAT),
                        lastModifiedBy: 'BBBBBB',
                        lastModifiedDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        firstImpactDate: currentDate,
                        expectedCloseDate: currentDate,
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

            it('should return a list of GearProjectRisk', async () => {
                const returnedFromService = Object.assign(
                    {
                        status: 'BBBBBB',
                        impact: 1,
                        probability: 1,
                        description: 'BBBBBB',
                        firstImpactDate: currentDate.format(DATE_FORMAT),
                        mitigationStrategy: 'BBBBBB',
                        mitigationDescription: 'BBBBBB',
                        expectedCloseDate: currentDate.format(DATE_FORMAT),
                        createdBy: 'BBBBBB',
                        creationDate: currentDate.format(DATE_FORMAT),
                        lastModifiedBy: 'BBBBBB',
                        lastModifiedDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        firstImpactDate: currentDate,
                        expectedCloseDate: currentDate,
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

            it('should delete a GearProjectRisk', async () => {
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
