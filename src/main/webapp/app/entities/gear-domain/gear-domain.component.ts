import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearDomain } from 'app/shared/model/gear-domain.model';
import { Principal } from 'app/core';
import { GearDomainService } from './gear-domain.service';
import { Router } from '@angular/router';

/** Coponentes necesarios para agregar el thema de la tabla*/
import { ListColumn } from '../../shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

/**  consultar tipo de documerntos */
import { GearDocumentTypeService } from './../gear-document-type/gear-document-type.service';
import { IGearDocumentType } from 'app/shared/model/gear-document-type.model';

/** Importacion de Modal Create */
import { CustomerCreateUpdateComponent } from './modalsDomains/customer-create-update.component';

/** Implementacion Sweetalert  */
import swal from 'sweetalert2';

@Component({
    selector: 'jhi-gear-domain',
    templateUrl: './gear-domain.component.html',
    styleUrls: ['./gear-domain.component.scss']
})
export class GearDomainComponent implements OnInit, AfterViewInit, OnDestroy {
    // Variables para consulta tipo de documentos
    tipoDocumentos: IGearDocumentType[];
    dataSource: MatTableDataSource<IGearDomain>; // Array de la interface
    // gearDomains: IGearDomain[];
    currentAccount: any;
    eventSubscriber: Subscription;

    // ======================= Variables para el filtadro por Unidad ============
    domainsByUnits: IGearDomain[];
    idUnitLocalStorage: any = localStorage.getItem('key1');
    // ========================================================================

    // Variables que utilizar el theme
    subject$: ReplaySubject<IGearDomain[]> = new ReplaySubject<IGearDomain[]>(1); // esta es la variable de carga de cada pagina
    data$: Observable<IGearDomain[]> = this.subject$.asObservable(); // esta es la varialbe de carga de cada dato, listo para visualizar

    // Edicion de la columnas que vamos a Visualizar
    // Cosa por destacar la propiedada isModelProperty es para que los datos que traemos del modelo concuerden con la columnas que vamos a mostrar
    @Input()
    columns: ListColumn[] = [
        { name: 'Id', property: 'id', visible: false, isModelProperty: true },
        { name: 'Nombre', property: 'name', visible: true, isModelProperty: true },
        { name: 'Acciones', property: 'actions', visible: true }
    ] as ListColumn[];
    pageSize = 10;
    @ViewChild(MatPaginator)
    paginator: MatPaginator;
    @ViewChild(MatSort)
    sort: MatSort;

    // Variables para la creacion-Eliminacion y Edicion de Dominio
    isSaving: boolean;

    constructor(
        private gearDomainService: GearDomainService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        // Componente Necesario para la parte de Login
        private dialog: MatDialog,
        // tipo Docuemntos
        private documentTypeService: GearDocumentTypeService
    ) {}

    // Con esta funcion se Realiza la carga de datos en una estructura que la tabla entienda OJO
    loadAll() {
        console.log('Dentro de load ALl');

        // ============================== Dominios Generales======================================
        // this.gearDomainService.query().subscribe(
        //     (res: HttpResponse<IGearDomain[]>) => {
        //         this.gearDomains = res.body;
        //
        //         // cargar el arreglo a la variable
        //         const domains = this.gearDomains;
        //
        //         // Assign the data to the data source for the table to render
        //         this.dataSource = new MatTableDataSource(domains);
        //         this.dataSource.paginator = this.paginator;
        //         this.dataSource.sort = this.sort;
        //
        //         console.log('Domain traido de BD', this.gearDomains);
        //     },
        //     (res: HttpErrorResponse) => this.onError(res.message)
        // );
        // ============================== Dominios Generales======================================

        // ============================== Dominios por Unidad Organizacional ======================================
        this.gearDomainService.domainByUnitId(this.idUnitLocalStorage).subscribe(res => {
            this.domainsByUnits = res;

            // Assign the data to the data source for the table to render
            this.dataSource = new MatTableDataSource(this.domainsByUnits);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            console.log('RESULTADOooooo', this.domainsByUnits);
        });
        // ============================== Dominios por Unidad Organizacional======================================
    }

    /**
     * Funciones Necesarias que Funcionan con el thema Fury
     */
    get visibleColumns() {
        return this.columns.filter(column => column.visible).map(column => column.property);
    }

    ngAfterViewInit() {
        // Con el llamado esta Funcion Cargamos los datos y los datos de pagina y sort que necesitamos para la tabla
        this.loadAll();
    }

    // // Para la craecion de Domonios OJO
    createCustomer() {
        this.dialog
            .open(CustomerCreateUpdateComponent)
            .afterClosed()
            .subscribe((gearDomain: IGearDomain) => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearDomain) {
                    console.log('entro en la creacion');
                    console.log('lo que se guardara', gearDomain);

                    // Funcion de Creacion de Dominio
                    this.subscribeToSaveResponse(this.gearDomainService.create(gearDomain));
                    console.log('elementos de Dominios', this.domainsByUnits);
                    // Fin de creacion de dominio

                    this.subject$.next(this.domainsByUnits);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Guardado', showConfirmButton: false, timer: 2000 });
                }
            });
    }

    onFilterChange(value) {
        if (!this.dataSource) {
            return;
        }
        value = value.trim();
        value = value.toLowerCase();
        this.dataSource.filter = value;
    }

    /**
     * End Funciones
     */

    /** Funcion para cargar la visualizacion de la pagina*/
    ngOnInit() {
        console.log('ID LOCAL STORAGE', this.idUnitLocalStorage);

        console.log('Entra al NgOnINit Doma');
        this.principal
            .identity()
            .then(account => {
                this.currentAccount = account;
            })
            .catch(err => {
                console.log('Something went wrong: ' + err.message);
                this.router.navigate(['']);
            });
        this.loadAll();
        this.registerChangeInGearDomains();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGearDomains() {
        this.eventSubscriber = this.eventManager.subscribe('gearDomainListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    // =================== Funciones necesario para la creacion de Dominio  =======================
    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearDomain>>) {
        result.subscribe((res: HttpResponse<IGearDomain>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }

    // ====================== en esta Funcion se actuliza el componente ===============================

    updateCustomer(gearDomain) {
        this.dialog
            .open(CustomerCreateUpdateComponent, {
                data: gearDomain
            })
            .afterClosed()
            .subscribe(gearDomain => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearDomain) {
                    /**
                     * Here we are updating our local array.
                     * You would probably make an HTTP request here.
                     */
                    this.subscribeToSaveResponse(this.gearDomainService.update(gearDomain));

                    console.log('VALOR UNO @@@@', gearDomain);
                    console.log('VALOR DOS ####', this.domainsByUnits);

                    const index = this.domainsByUnits.findIndex(existingCustomer => existingCustomer.id == gearDomain.id);
                    // Actulizacion de la tabla
                    this.domainsByUnits[index] = gearDomain;
                    this.subject$.next(this.domainsByUnits);

                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Actualizado', showConfirmButton: false, timer: 2000 });
                }
            });
    }

    // ====================== en esta Funcion se actuliza el componente ===============================

    // ====================== en esta Funcion se Elimina el componente ===============================
    deleteCustomer(customer) {
        let aux = false;

        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        if (customer) {
            this.documentTypeService.query().subscribe(
                (res: HttpResponse<IGearDocumentType[]>) => {
                    this.tipoDocumentos = res.body;
                    console.log('Consultado tipo Documentos', this.tipoDocumentos);

                    // Recoorer tipo de documentos
                    for (let i = 0; i < this.tipoDocumentos.length; i++) {
                        if (this.tipoDocumentos[i].geardomainId === customer.id) {
                            aux = true;
                        }
                    }

                    if (!aux) {
                        console.log('CUMPLE PARA ELIMINAR ######', aux);

                        this.gearDomainService.delete(customer.id).subscribe(response => {
                            this.eventManager.broadcast({
                                name: 'gearDomainListModification',
                                content: 'Deleted an gearDomain'
                            });
                        });
                        this.domainsByUnits.splice(
                            this.domainsByUnits.findIndex(existingCustomer => existingCustomer.id === customer.id),
                            1
                        );
                        this.subject$.next(this.domainsByUnits);
                        this.ngOnInit();
                        this.loadAll();
                        swal({
                            position: 'center',
                            type: 'success',
                            title: 'Eliminado',
                            showConfirmButton: false,
                            timer: 2000
                        });
                    } else {
                        console.log('NO CUMPLE PARA ₵₵₵₵₵₵₵₵', aux);
                        swal({
                            position: 'center',
                            type: 'warning',
                            text: 'No se puede Eliminar ' + customer.name + ', tiene una dependencia',
                            showConfirmButton: true
                        });
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    // ====================== en esta Funcion se Elimina el componente ===============================

    /** Redireccionar vista para crear preguntas del diagnostico */
    listDocument(id, name) {
        console.log('Id Dominio ', id);
        console.log('Nombre Dominio ', name);
        this.router.navigate(['/document-types'], { queryParams: { idDomain: id, nameDomain: name } });
    }
}
