/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { GearLibraryService } from 'app/entities/gear-library/gear-library.service';
import { IGearLibrary, GearLibrary } from 'app/shared/model/gear-library.model';

describe('Service Tests', () => {
    describe('GearLibrary Service', () => {
        let injector: TestBed;
        let service: GearLibraryService;
        let httpMock: HttpTestingController;
        let elemDefault: IGearLibrary;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(GearLibraryService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new GearLibrary(
                0,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                false,
                false,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                0,
                0
            );
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

            it('should create a GearLibrary', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new GearLibrary(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a GearLibrary', async () => {
                const returnedFromService = Object.assign(
                    {
                        idFile: 'BBBBBB',
                        documentName: 'BBBBBB',
                        documentDomain: 'BBBBBB',
                        documentTitle: 'BBBBBB',
                        documentType: 'BBBBBB',
                        documentDescription: 'BBBBBB',
                        documentIsCopy: true,
                        documentIsDraft: true,
                        labelField: 'BBBBBB',
                        typeField: 'BBBBBB',
                        propertieName: 'BBBBBB',
                        documentIdAlfresco: 'BBBBBB',
                        folderIdAlfresco: 'BBBBBB',
                        nameFolderAlfresco: 'BBBBBB',
                        siteIdAlfresco: 'BBBBBB',
                        nameSiteAlfresco: 'BBBBBB',
                        valueField: 'BBBBBB',
                        customFieldId: 1,
                        templateId: 1
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

            it('should return a list of GearLibrary', async () => {
                const returnedFromService = Object.assign(
                    {
                        idFile: 'BBBBBB',
                        documentName: 'BBBBBB',
                        documentDomain: 'BBBBBB',
                        documentTitle: 'BBBBBB',
                        documentType: 'BBBBBB',
                        documentDescription: 'BBBBBB',
                        documentIsCopy: true,
                        documentIsDraft: true,
                        labelField: 'BBBBBB',
                        typeField: 'BBBBBB',
                        propertieName: 'BBBBBB',
                        documentIdAlfresco: 'BBBBBB',
                        folderIdAlfresco: 'BBBBBB',
                        nameFolderAlfresco: 'BBBBBB',
                        siteIdAlfresco: 'BBBBBB',
                        nameSiteAlfresco: 'BBBBBB',
                        valueField: 'BBBBBB',
                        customFieldId: 1,
                        templateId: 1
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

            it('should delete a GearLibrary', async () => {
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
