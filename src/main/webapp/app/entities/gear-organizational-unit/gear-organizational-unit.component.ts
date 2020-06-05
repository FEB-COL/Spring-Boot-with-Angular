import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearOrganizationalUnit } from 'app/shared/model/gear-organizational-unit.model';
import { Principal } from 'app/core';
import { GearOrganizationalUnitService } from './gear-organizational-unit.service';
import { Router } from '@angular/router';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

/** Coponentes necesarios para agregar el thema de la tabla*/
import { ListColumn } from '../../shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

/** Importacion de Modal Create */
import { UnitCreateUpdateComponent } from './modalsUnits/unit-create-update.component';

/** Implementacion Sweetalert  */
import swal from 'sweetalert2';

@Component({
    selector: 'jhi-gear-organizational-unit',
    templateUrl: './gear-organizational-unit.component.html',
    styleUrls: ['./gear-organizational-unit.component.scss']
})
export class GearOrganizationalUnitComponent implements OnInit, AfterViewInit, OnDestroy {
    /** toma los  datos para pasarlos al html */
    dataSource: MatTableDataSource<IGearOrganizationalUnit>;

    gearOrganizationalUnits: IGearOrganizationalUnit[];
    currentAccount: any;
    eventSubscriber: Subscription;
    isSaving: boolean; // Variables para la creacion-Eliminacion y Edicion

    /** Variables que utilizar el theme */
    subject$: ReplaySubject<IGearOrganizationalUnit[]> = new ReplaySubject<IGearOrganizationalUnit[]>(1); // esta es la variable de carga de cada pagina
    data$: Observable<IGearOrganizationalUnit[]> = this.subject$.asObservable(); // esta es la varialbe de carga de cada dato, listo para visualizar

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

    constructor(
        private gearOrganizationalUnitService: GearOrganizationalUnitService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        private dialog: MatDialog //Componente Necesario para la parte de Login
    ) {}

    loadAll() {
        this.gearOrganizationalUnitService.query().subscribe(
            (res: HttpResponse<IGearOrganizationalUnit[]>) => {
                this.gearOrganizationalUnits = res.body;

                // cargar el arreglo a la variable typeSystems ,
                const units = this.gearOrganizationalUnits;

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(units);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                console.log('Domain traido de BD', this.gearOrganizationalUnits);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
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
        this.registerChangeInGearOrganizationalUnits();
    }

    /** Funciones Necesarias que Funcionan con el thema Fury */
    get visibleColumns() {
        return this.columns.filter(column => column.visible).map(column => column.property);
    }

    ngAfterViewInit() {
        //Con el llamado esta Funcion Cargamos los datos y los datos de pagina y sort que necesitamos para la tabla
        this.loadAll();
    }

    // ======= start Funcion para el filtrado ===========
    onFilterChange(value) {
        if (!this.dataSource) {
            return;
        }
        value = value.trim();
        value = value.toLowerCase();
        this.dataSource.filter = value;
    }
    // ======= End Funcion para el filtrado ===========

    /** End Funciones */

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGearOrganizationalUnits() {
        this.eventSubscriber = this.eventManager.subscribe('gearOrganizationalUnitListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    // ======== Start Funciones necesario para la creacion ==============

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearOrganizationalUnit>>) {
        result.subscribe(
            (res: HttpResponse<IGearOrganizationalUnit>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }
    // ======== End  Funciones necesario para la creacion  ==============

    // ========= start Para la craecion de Tipo de Sistema OJO ===================
    createUnit() {
        this.dialog
            .open(UnitCreateUpdateComponent)
            .afterClosed()
            .subscribe((gearUnit: IGearOrganizationalUnit) => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearUnit) {
                    console.log('entro en la creacion');

                    // ====== start Funcion de Creacion de document type ========

                    this.subscribeToSaveResponse(this.gearOrganizationalUnitService.create(gearUnit));
                    console.log('elementos de Dominios', this.gearOrganizationalUnitService);
                    // ======== End  de creacion de document type ==============

                    // Carga de Tabla reflesca los valores
                    this.loadAll();
                    // Reflesca la tabla en el Tipo Documento
                    this.subject$.next(this.gearOrganizationalUnits);
                    this.ngOnInit();
                    this.loadAll();
                    swal({
                        position: 'center',
                        type: 'success',
                        title: 'Creada',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            });
    }
    // ========= start Para la Tipo de Sistema OJO ===================

    // ========= Start Funcion se actuliza el componente =============
    updateUnit(gearUnit) {
        this.dialog
            .open(UnitCreateUpdateComponent, {
                data: gearUnit
            })
            .afterClosed()
            .subscribe(gearUnit => {
                /**
                 * Unit is the updated unit (if the user pressed Save - otherwise it's null)
                 */
                if (gearUnit) {
                    /**
                     * Here we are updating our local array.
                     * You would probably make an HTTP request here.
                     */
                    this.subscribeToSaveResponse(this.gearOrganizationalUnitService.update(gearUnit));

                    const index = this.gearOrganizationalUnits.findIndex(existingCustomer => existingCustomer.id === gearUnit.id);
                    // Actulizacion de la tabla
                    this.gearOrganizationalUnits[index] = gearUnit;
                    this.loadAll();
                    this.subject$.next(this.gearOrganizationalUnits);
                    this.ngOnInit();
                    this.loadAll();
                    swal({
                        position: 'center',
                        type: 'success',
                        title: 'Actualizada',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            });
    }
    // ========= End Funcion se actuliza el componente =============

    // ========= Start Funcion Eliminar el componente =============
    deleteUnit(gearUnit) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        if (gearUnit) {
            this.gearOrganizationalUnitService.delete(gearUnit.id).subscribe(response => {
                this.eventManager.broadcast({
                    name: 'gearDomainListModification',
                    content: 'Deleted an gearDomain'
                });
            });
            this.gearOrganizationalUnits.splice(
                this.gearOrganizationalUnits.findIndex(existingCustomer => existingCustomer.id === gearUnit.id),
                1
            );
            this.subject$.next(this.gearOrganizationalUnits);
            this.ngOnInit();
            this.loadAll();
            swal({
                position: 'center',
                type: 'success',
                title: 'Eliminada',
                showConfirmButton: false,
                timer: 2000
            });
        }
    }
    // ========= End Funcion Eliminar el componente =============

    // listDomains(id, name) {
    //     this.router.navigate(['/domains'], { queryParams: { idUnit: id, nameUnit: name } });
    // }

    // listUsers(id, name) {
    //     this.router.navigate(['/gestor-usuarios'], { queryParams: { idUnit: id, nameUnit: name } });
    // }
}
