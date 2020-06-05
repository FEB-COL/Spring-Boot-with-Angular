/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { GearFilesService } from 'app/entities/gear-files/gear-files.service';
import { IGearFiles, GearFiles } from 'app/shared/model/gear-files.model';

describe('Service Tests', () => {
    describe('GearFiles Service', () => {
        let injector: TestBed;
        let service: GearFilesService;
        let httpMock: HttpTestingController;
        let elemDefault: IGearFiles;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(GearFilesService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new GearFiles(
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

            it('should create a GearFiles', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new GearFiles(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a GearFiles', async () => {
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

            it('should return a list of GearFiles', async () => {
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

            it('should delete a GearFiles', async () => {
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
