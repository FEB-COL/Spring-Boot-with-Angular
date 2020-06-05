/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { GearDomainService } from 'app/entities/gear-domain/gear-domain.service';
import { IGearDomain, GearDomain } from 'app/shared/model/gear-domain.model';

describe('Service Tests', () => {
    describe('GearDomain Service', () => {
        let injector: TestBed;
        let service: GearDomainService;
        let httpMock: HttpTestingController;
        let elemDefault: IGearDomain;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(GearDomainService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new GearDomain(0, 'AAAAAAA', 'AAAAAAA', 0, 'AAAAAAA', 'AAAAAAA', 0, 0, 0, 0, 0, 0, 0);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a GearDomain', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new GearDomain(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a GearDomain', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        domainId: 'BBBBBB',
                        companyId: 1,
                        companyDescription: 'BBBBBB',
                        siteId: 'BBBBBB',
                        jhiStorage: 1,
                        storageUsed: 1,
                        levelMaturity: 1,
                        totalWiki: 1,
                        totalFileFinalVersion: 1,
                        totalFileDraft: 1,
                        totalFileUpload: 1
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of GearDomain', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        domainId: 'BBBBBB',
                        companyId: 1,
                        companyDescription: 'BBBBBB',
                        siteId: 'BBBBBB',
                        jhiStorage: 1,
                        storageUsed: 1,
                        levelMaturity: 1,
                        totalWiki: 1,
                        totalFileFinalVersion: 1,
                        totalFileDraft: 1,
                        totalFileUpload: 1
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
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

            it('should delete a GearDomain', async () => {
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
