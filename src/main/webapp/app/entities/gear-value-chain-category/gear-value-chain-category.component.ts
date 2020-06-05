import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGearValueChainCategory } from 'app/shared/model/gear-value-chain-category.model';
import { Principal } from 'app/core';
import { GearValueChainCategoryService } from './gear-value-chain-category.service';
import { Router } from '@angular/router';
/** Coponentes necesarios para agregar el thema de la tabla*/
import { ListColumn } from '../../shared/list/list-column.model';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

/**  Consulta Macroprocesos */
import { GearValueChainMacroprocessService } from './../gear-value-chain-macroprocess/gear-value-chain-macroprocess.service';
import { IGearValueChainMacroprocess } from 'app/shared/model/gear-value-chain-macroprocess.model';

/** Importacion de Modal Create */
import { CategoryCreateUpdateComponent } from './modalsCategories/category-create-update.component';

/** Implementacion Sweetalert */
import swal from 'sweetalert2';

@Component({
    selector: 'jhi-gear-value-chain-category',
    templateUrl: './gear-value-chain-category.component.html',
    styleUrls: ['./gear-value-chai.component.scss']
    // styleUrls: ['style.css'] //este es el estilo viejo que utilizar jhipster por defecto
})
export class GearValueChainCategoryComponent implements OnInit, AfterViewInit, OnDestroy {
    // ============ Declaracion de Variables Generales =======================
    macroprocesses: IGearValueChainMacroprocess[];
    dataSource: MatTableDataSource<IGearValueChainCategory>;
    // gearValueChainCategories: IGearValueChainCategory[]; // variable para todas las categorias
    currentAccount: any;
    eventSubscriber: Subscription;

    // ======================= Variables para el filtadro por Unidad ============
    categoryByUnits: IGearValueChainCategory[];
    idUnitLocalStorage: any = localStorage.getItem('key1');
    // ========================================================================

    //Variables que utilizar el theme
    subject$: ReplaySubject<IGearValueChainCategory[]> = new ReplaySubject<IGearValueChainCategory[]>(1); // esta es la variable de carga de cada pagina
    data$: Observable<IGearValueChainCategory[]> = this.subject$.asObservable(); // esta es la varialbe de carga de cada dato, listo para visualizar

    //Edicion de la columnas que vamos a Visualizar
    //Cosa por destacar la propiedada isModelProperty es para que los datos que traemos del modelo concuerden con la columnas que vamos a mostrar
    @Input()
    columns: ListColumn[] = [
        { name: 'Id', property: 'id', visible: false, isModelProperty: true },
        { name: 'Nombre', property: 'name', visible: true, isModelProperty: true },
        { name: 'Descripción\n', property: 'decription', visible: true, isModelProperty: true },
        { name: 'Color', property: 'color', visible: true, isModelProperty: true },
        { name: 'Fecha de creación', property: 'creationDate', visible: true, isModelProperty: true },
        { name: 'Fecha de Modificación', property: 'lastUpdate', visible: true, isModelProperty: true },
        { name: 'Acciones', property: 'actions', visible: true }
    ] as ListColumn[];
    pageSize = 10;
    @ViewChild(MatPaginator)
    paginator: MatPaginator;
    @ViewChild(MatSort)
    sort: MatSort;

    /**
     * Variables para la creacion-Eliminacion y Edicion de Dominio
     */

    isSaving: boolean;

    constructor(
        private gearValueChainCategoryService: GearValueChainCategoryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        //Componente Necesario para la parte de Login
        private dialog: MatDialog,
        private macroprocessService: GearValueChainMacroprocessService
    ) {}

    // ====== Con esta funcion se Realiza la carga de datos en una estructura que la tabla entienda OJO
    loadAll() {
        // // ============================== Categorias Generales======================================
        // this.gearValueChainCategoryService.query().subscribe(
        //     (res: HttpResponse<IGearValueChainCategory[]>) => {
        //         this.gearValueChainCategories = res.body;
        //
        //         // cargar el arreglo a la variable Categories ,
        //         const categories = this.gearValueChainCategories;
        //         // Assign the data to the data source for the table to render
        //         this.dataSource = new MatTableDataSource(categories);
        //         this.dataSource.paginator = this.paginator;
        //         this.dataSource.sort = this.sort;
        //     },
        //     (res: HttpErrorResponse) => this.onError(res.message)
        // );
        // // ============================== Categorias Generales======================================

        // ============================== Dominios por Unidad Organizacional ======================================
        this.gearValueChainCategoryService.categoryByUnitId(this.idUnitLocalStorage).subscribe(res => {
            this.categoryByUnits = res;

            // Assign the data to the data source for the table to render
            this.dataSource = new MatTableDataSource(this.categoryByUnits);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            console.log('RESULTADOooooo', this.categoryByUnits);
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
        //Con el llamado esta Funcion Cargamos los datos y los datos de pagina y sort que necesitamos para la tabla
        this.loadAll();
    }

    // ========= start Para la craecion de Domonios OJO ===================
    createCategory() {
        this.dialog
            .open(CategoryCreateUpdateComponent)
            .afterClosed()
            .subscribe((gearCategory: IGearValueChainCategory) => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearCategory) {
                    // ====== start Funcion de Creacion de document type ========

                    // // start Guardar Color
                    // const temp = "red";
                    // gearCategory.color=temp;

                    this.subscribeToSaveResponse(this.gearValueChainCategoryService.create(gearCategory));
                    // ======== End  de creacion de document type ==============

                    // Reflesca la tabla en el Tipo Documento
                    this.subject$.next(this.categoryByUnits);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Guardado', showConfirmButton: false, timer: 2000 });
                }
            });
    }
    // ========= start Para la craecion de Domonios OJO ===================

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

    /**
     * End Funciones
     */

    // =========  start Funcion para cargar la visualizacion de la pagina ==========
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
        this.registerChangeInGearValueChainCategories();
    }
    // =========  End  Funcion para cargar la visualizacion de la pagina ==========

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGearValueChainCategories() {
        this.eventSubscriber = this.eventManager.subscribe('gearValueChainCategoryListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    // ======== Start Funciones necesario para la creacion de Dominio ==============

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearValueChainCategory>>) {
        result.subscribe(
            (res: HttpResponse<IGearValueChainCategory>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }
    // ======== End  Funciones necesario para la creacion de Dominio ==============

    // ========= Start Funcion se actuliza el componente =============
    updateCategory(gearCategory) {
        this.dialog
            .open(CategoryCreateUpdateComponent, {
                data: gearCategory
            })
            .afterClosed()
            .subscribe(gearCategory => {
                /**
                 * Customer is the updated customer (if the user pressed Save - otherwise it's null)
                 */
                if (gearCategory) {
                    /**
                     * Here we are updating our local array.
                     * You would probably make an HTTP request here.
                     */
                    this.subscribeToSaveResponse(this.gearValueChainCategoryService.update(gearCategory));

                    const index = this.categoryByUnits.findIndex(existingCustomer => existingCustomer.id === gearCategory.id);
                    // Actulizacion de la tabla
                    this.categoryByUnits[index] = gearCategory;
                    this.loadAll();
                    this.subject$.next(this.categoryByUnits);
                    this.ngOnInit();
                    this.loadAll();
                    swal({ position: 'center', type: 'success', title: 'Actualizado', showConfirmButton: false, timer: 2000 });
                }
            });
    }
    // ========= End Funcion se actuliza el componente =============

    // ========= Start Funcion Eliminar el componente =============

    deleteCategory(category) {
        let aux = false;
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        if (category) {
            this.macroprocessService.query().subscribe(
                (res: HttpResponse<IGearValueChainMacroprocess[]>) => {
                    this.macroprocesses = res.body;

                    //  ========== Recoorer tipo de documentos ============
                    for (let i = 0; i < this.macroprocesses.length; i++) {
                        if (this.macroprocesses[i].gearvaluechaincategoryId === category.id) {
                            aux = true;
                        }
                    }

                    if (!aux) {
                        this.gearValueChainCategoryService.delete(category.id).subscribe(response => {
                            this.eventManager.broadcast({
                                name: 'gearDomainListModification',
                                content: 'Deleted an gearDomain'
                            });
                            // this.activeModal.dismiss(true);
                        });
                        this.categoryByUnits.splice(
                            this.categoryByUnits.findIndex(existingCustomer => existingCustomer.id === category.id),
                            1
                        );
                        this.subject$.next(this.categoryByUnits);
                        this.ngOnInit();
                        this.loadAll();
                        swal({ position: 'center', type: 'success', title: 'Eliminado', showConfirmButton: false, timer: 2000 });
                    } else {
                        swal({
                            position: 'center',
                            type: 'warning',
                            text: 'No se puede Eliminar ' + category.name + ', tiene una dependencia',
                            showConfirmButton: true
                        });
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }
    // ========= End Funcion Eliminar el componente =============

    listMacroprocesses(id, name) {
        this.router.navigate(['/macroprocesses'], { queryParams: { idCategory: id, nameCategory: name } });
    }
}
