import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartData } from 'chart.js';
import * as moment from 'moment';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { AdvancedPieChartWidgetOptions } from '../../shared/widgets/advanced-pie-chart-widget/advanced-pie-chart-widget-options.interface';
import { AudienceOverviewWidgetOptions } from '../../shared/widgets/audience-overview-widget/audience-overview-widget-options.interface';
import { BarChartWidgetOptions } from '../../shared/widgets/bar-chart-widget/bar-chart-widget-options.interface';
import { DonutChartWidgetOptions } from '../../shared/widgets/donut-chart-widget/donut-chart-widget-options.interface';
import { LineChartWidgetOptions } from '../../shared/widgets/line-chart-widget/line-chart-widget-options.interface';
import {
    RealtimeUsersWidgetData,
    RealtimeUsersWidgetPages
} from '../../shared/widgets/realtime-users-widget/realtime-users-widget.interface';
import { RecentSalesWidgetOptions } from '../../shared/widgets/recent-sales-widget/recent-sales-widget-options.interface';
import { SalesSummaryWidgetOptions } from '../../shared/widgets/sales-summary-widget/sales-summary-widget-options.interface';
import { DashboardService } from './dashboard.service';
import { Principal, Account } from 'app/core';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

/** Importar jquery*/
import * as $ from 'jquery';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IGearDiagAnswer } from 'app/shared/model/gear-diag-answer.model';
import { GearDiagAnswerService } from 'app/entities/gear-diag-answer';
import { IGearDiagnosis } from 'app/shared/model/gear-diagnosis.model';
import { GearDiagnosisService } from 'app/entities/gear-diagnosis';
import { GearGestionUsuariosService } from './../../entities/gear-gestion-usuarios/gear-gestion-usuarios.service';
import { IGearOrganizationalUnit } from 'app/shared/model/gear-organizational-unit.model';
import { IGearUser } from 'app/shared/model/gear-user.model';

/** Implementacion Sweetalert  */
import swal from 'sweetalert2';

/** Implementacion de la ara;a dinamica OJO*/
import * as Plotly from 'plotly.js/dist/plotly.js';
import { Config, Data, Layout } from 'plotly.js/dist/plotly.js';

@Component({
    selector: 'jhi-fury-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    // =============== Start Variable para Unidad Organizacional LocalStorage ==========
    gearUsers: IGearUser;
    idUnitOrganizational: any;
    idUserCount: any;
    // =============== Start Variable para Unidad Organizacional LocalStorage ==========

    // =================== Start Variables Arana ==============================
    valuesArray: number[];
    hexagons: any;

    /** colores de acuerdo al nivel de madurez */
    levelZero: any;
    levelOne: any;
    levelTwo: any;
    levelThree: any;
    levelFour: any;
    levelFive: any;

    gearDiagAnswers: IGearDiagAnswer[];
    // =================== End Variables Arana ==============================

    // variable para la cuenta
    currentAccount: any;
    account: Account;

    private static isInitialLoad = true;
    salesData$: Observable<ChartData>;
    totalSalesOptions: BarChartWidgetOptions = {
        title: 'Uso del Servidor',
        gain: 16.3,
        subTitle: 'compared to last month',
        background: '#5C6BC0',
        color: '#FFFFFF'
    };

    visitsData$: Observable<ChartData>;
    totalVisitsOptions: LineChartWidgetOptions = {
        title: 'Visitas',
        gain: 42.5,
        subTitle: 'Durante el Ultimo Mes',
        background: '#00BCD4',
        color: '#FFFFFF'
    };

    clicksData$: Observable<ChartData>;
    totalClicksOptions: LineChartWidgetOptions = {
        title: 'Datos',
        gain: -6.1,
        subTitle: 'Durante el Ultimo Mes',
        background: '#66BB6A',
        color: '#FFFFFF'
    };

    conversionsData$: Observable<ChartData>;
    conversionsOptions: LineChartWidgetOptions = {
        title: 'Diagnosticos',
        gain: 10.4,
        subTitle: 'Durante el Ultimo Mes',
        background: '#009688',
        color: '#FFFFFF'
    };

    salesSummaryData$: Observable<ChartData>;
    salesSummaryOptions: SalesSummaryWidgetOptions = {
        title: 'Sales Summary',
        subTitle: 'Compare Sales by Time',
        gain: 37.2
    };

    top5CategoriesData$: Observable<ChartData>;
    top5CategoriesOptions: DonutChartWidgetOptions = {
        title: 'Top Categories',
        subTitle: 'Compare Sales by Category'
    };

    audienceOverviewOptions: AudienceOverviewWidgetOptions[] = [];

    private _realtimeUsersDataSubject = new ReplaySubject<RealtimeUsersWidgetData>(30);
    realtimeUsersData$: Observable<RealtimeUsersWidgetData> = this._realtimeUsersDataSubject.asObservable();
    private _realtimeUsersPagesSubject = new ReplaySubject<RealtimeUsersWidgetPages[]>(1);
    realtimeUsersPages$: Observable<RealtimeUsersWidgetPages[]> = this._realtimeUsersPagesSubject.asObservable();

    recentSalesData$: Observable<ChartData>;
    recentSalesOptions: RecentSalesWidgetOptions = {
        title: 'Recent Sales',
        subTitle: 'See who bought what in realtime'
    };
    recentSalesTableOptions = {
        pageSize: 5,
        columns: [
            { name: 'Product', property: 'name', visible: true, isModelProperty: true },
            { name: '$ Price', property: 'price', visible: true, isModelProperty: true },
            { name: 'Time ago', property: 'timestamp', visible: true, isModelProperty: true }
        ]
    };
    recentSalesTableData$: Observable<any[]>;

    advancedPieChartOptions: AdvancedPieChartWidgetOptions = {
        title: 'Sales by country',
        subTitle: 'Top 3 countries sold 34% more items this month\n'
    };
    advancedPieChartData$: Observable<ChartData>;

    //configuracion de la arana
    gearDiagnoses: IGearDiagnosis[];

    //Nueva Configuracion de Arana con Dinamismo
    verde: any;
    verdeclaro: any;
    amarillo: any;
    naranja: any;
    naranjaclaro: any;
    rojo: any;

    aranaData: any;
    aranaLayout: any;
    r: number[]; //valores de cada entidad
    t: string[]; // nombre de cada entidad
    //Fin de la configuracion de la arana Dinamica
    constructor(
        private gearDiagnosisService: GearDiagnosisService,
        private dashboardService: DashboardService,
        private router: Router,
        private principal: Principal,
        private eventManager: JhiEventManager,
        private gearDiagAnswerService: GearDiagAnswerService,
        private jhiAlertService: JhiAlertService,
        private gestionUsuariosService: GearGestionUsuariosService
    ) {
        /**
         * Edge wrong drawing fix
         * Navigate anywhere and on Promise right back
         */
        if (/Edge/.test(navigator.userAgent)) {
            if (DashboardComponent.isInitialLoad) {
                this.router.navigate(['/apps/chat']).then(() => {
                    this.router.navigate(['/']);
                });

                DashboardComponent.isInitialLoad = false;
            }
        }
    }

    /**
     * Needed for the Layout
     */
    private _gap = 16;
    gap = `${this._gap}px`;

    col(colAmount: number) {
        return `1 1 calc(${100 / colAmount}% - ${this._gap - this._gap / colAmount}px)`;
    }

    /**
     * Everything implemented here is purely for Demo-Demonstration and can be removed and replaced with your implementation
     */
    ngOnInit() {
        /** Funcion para traer cuenta*/
        this.principal
            .identity()
            .then(account => {
                this.currentAccount = account;
                console.log('Cuenta', account);

                /** validar que perfil tiene el usuario logueado */
                if (this.currentAccount['authorities'][0] != 'ROLE_ADMIN') {
                    this.idUserCount = this.currentAccount.id;
                    console.log('Id de cuenta', this.idUserCount);

                    /** Consultar en GearUsers el usuario logueado con la relacion de Unidad Organizacional */
                    this.gestionUsuariosService.find(this.idUserCount).subscribe(
                        (res: HttpResponse<IGearUser>) => {
                            this.gearUsers = res.body;

                            /** se pasa el id de unidad Organizacional asociada al usuario logueado para setear al LocalStorage*/
                            this.chaneUnit(this.gearUsers.gearOrganizationalUnitId);

                            console.log('VALOR DE USUSARIO', this.gearUsers);
                        },
                        (res: HttpErrorResponse) => this.onError(res.message)
                    );
                } else {
                    swal({
                        position: 'center',
                        type: 'warning',
                        text: 'Selecciione una Unidad Organizacional por favor!',
                        showConfirmButton: true
                    });
                }
            })
            .catch(err => {
                console.log('Something went wrong: ' + err.message);
                this.router.navigate(['']);
            });

        this.salesData$ = this.dashboardService.getSales();
        this.visitsData$ = this.dashboardService.getVisits();
        this.clicksData$ = this.dashboardService.getClicks();
        this.conversionsData$ = this.dashboardService.getConversions();
        this.salesSummaryData$ = this.dashboardService.getSalesSummary();
        this.top5CategoriesData$ = this.dashboardService.getTop5Categories();

        // Audience Overview Widget
        this.dashboardService.getAudienceOverviewUsers().subscribe(response => {
            this.audienceOverviewOptions.push({
                label: 'Users',
                data: response
            } as AudienceOverviewWidgetOptions);
        });
        this.dashboardService.getAudienceOverviewSessions().subscribe(response => {
            this.audienceOverviewOptions.push({
                label: 'Sessions',
                data: response
            } as AudienceOverviewWidgetOptions);
        });
        this.dashboardService.getAudienceOverviewBounceRate().subscribe(response => {
            const property: AudienceOverviewWidgetOptions = {
                label: 'Bounce Rate',
                data: response
            };

            // Calculate Bounce Rate Average
            const data = response.datasets[0].data as number[];
            property.sum = `${(data.reduce((sum, x) => sum + x) / data.length).toFixed(2)}%`;

            this.audienceOverviewOptions.push(property);
        });

        this.dashboardService.getAudienceOverviewSessionDuration().subscribe(response => {
            const property: AudienceOverviewWidgetOptions = {
                label: 'Session Duration',
                data: response
            };

            // Calculate Average Session Duration and Format to Human Readable Format
            const data = response.datasets[0].data as number[];
            const averageSeconds = (data.reduce((sum, x) => sum + x) / data.length).toFixed(0);
            property.sum = `${averageSeconds} sec`;

            this.audienceOverviewOptions.push(property);
        });

        // Prefill realtimeUsersData with 30 random values
        for (let i = 0; i < 30; i++) {
            this._realtimeUsersDataSubject.next({
                label: moment().fromNow(),
                value: Math.round(Math.random() * (100 - 10) + 10)
            } as RealtimeUsersWidgetData);
        }

        // Simulate incoming values for Realtime Users Widget
        setInterval(() => {
            this._realtimeUsersDataSubject.next({
                label: moment().fromNow(),
                value: Math.round(Math.random() * (100 - 10) + 10)
            } as RealtimeUsersWidgetData);
        }, 5000);

        // Prefill realtimeUsersPages with 3 random values
        const demoPages = [];
        const demoPagesPossibleValues = [
            '/components',
            '/tables/all-in-one-table',
            '/apps/inbox',
            '/apps/chat',
            '/dashboard',
            '/login',
            '/register',
            '/apps/calendar',
            '/forms/form-elements'
        ];
        for (let i = 0; i < 3; i++) {
            const nextPossibleValue = demoPagesPossibleValues[+Math.round(Math.random() * (demoPagesPossibleValues.length - 1))];
            if (demoPages.indexOf(nextPossibleValue) === -1) {
                demoPages.push(nextPossibleValue);
            }

            this._realtimeUsersPagesSubject.next(
                demoPages.map(pages => {
                    return { page: pages } as RealtimeUsersWidgetPages;
                })
            );
        }

        // Simulate incoming values for Realtime Users Widget
        setInterval(() => {
            const nextPossibleValue = demoPagesPossibleValues[+Math.round(Math.random() * (demoPagesPossibleValues.length - 1))];
            if (demoPages.indexOf(nextPossibleValue) === -1) {
                demoPages.push(nextPossibleValue);
            }

            if (demoPages.length > Math.random() * (5 - 1) + 1) {
                demoPages.splice(Math.round(Math.random() * demoPages.length), 1);
            }

            this._realtimeUsersPagesSubject.next(
                demoPages.map(pages => {
                    return { page: pages } as RealtimeUsersWidgetPages;
                })
            );
        }, 5000);

        this.recentSalesTableData$ = this.dashboardService.getRecentSalesTableData();
        this.recentSalesData$ = this.dashboardService.getRecentSalesData();

        this.advancedPieChartData$ = this.dashboardService.getAdvancedPieChartData();
        /** Identificacion de Usuarios para la parte */
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();

        /** fin de la parte de usuarios */

        // =================== Start Grafica arana ==================================
        /**  Valores aleatorios  para pintar el hexagono */
        this.hexagons = ['99'];

        /** colores de acuerdo al nivel de madurez */
        this.levelZero = 'rgb(237, 28, 36)';
        this.levelOne = 'rgb(255, 127, 39)';
        this.levelTwo = 'rgb(255, 201, 14)';
        this.levelThree = 'rgb(255, 242, 0)';
        this.levelFour = 'rgb(181, 230, 29)';
        this.levelFive = 'rgb(34, 177, 76)';

        // valores de los arreglos
        this.valuesArray = [1, 2, 3, 4, 5, 6];
        console.log('Arreglos', this.valuesArray);

        // this.update(0, 1); // sevicios tecnologicos
        // this.update(1, 2); //  Gobierno
        // this.update(2, 3); // informacion
        // this.update(3, 4); // sistemas de informacion
        // this.update(4, 4); // servicos tecnologicos
        // this.update(5, 5); // uso y aprovacion

        this.loadArana();

        this.gearDiagAnswerService.query().subscribe(
            (res: HttpResponse<IGearDiagAnswer[]>) => {
                this.gearDiagAnswers = res.body;
                console.log('Mostrar las respuestas Inicio', this.gearDiagAnswers);
                let promedio = 0;
                let result;
                if (this.gearDiagAnswers.length > 1) {
                    for (let i = 0; i < this.gearDiagAnswers.length; i++) {
                        promedio = this.gearDiagAnswers[i].answer + promedio;

                        console.log('VALOR DEL PROMEDIO', promedio);
                    }
                    result = promedio / this.gearDiagAnswers.length;
                    console.log('RESULTADO', result);
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        // =================== end Grafica arana ==================================
    }

    /** Funcion para Asignar la variable al LocalStorage*/
    chaneUnit(idUnit) {
        console.log('VALORRRRRRRRRR ID UNIDAD DASHBOARD', idUnit);

        /** Asignar a variable el id de la Unidad */
        let key1 = idUnit;

        /** Asignar variable al localStorage */
        localStorage.setItem('key1', JSON.stringify(key1));
    }

    loadArana() {
        this.gearDiagnosisService.query().subscribe(
            (res: HttpResponse<IGearDiagnosis[]>) => {
                this.gearDiagnoses = res.body;
                console.log('Carga de Arana', this.gearDiagnoses);

                //esta es la formula antigua del nivel de madures que se utilizaba con la ara;a antigua
                // for (let i = 0; i < 6; i++) {
                //     //this.gearDiagnoses.length; i++){
                //     console.log('resultado de diagnosico 1 por 1', this.gearDiagnoses[i]);
                //     if (i < this.gearDiagnoses.length) {
                //         if (this.gearDiagnoses[i].levelMaturity != null) {
                //             this.update(i, this.gearDiagnoses[i].levelMaturity);
                //         } else {
                //             this.update(i, 0);
                //         }
                //     } else {
                //         this.update(i, 0);
                //     }
                // }
                // revizion de entidades que tenemos evuluadas en el diagnositico para el carge de la ara;a OJO
                this.r = [];
                this.t = [];
                let rVerde = [];
                let rVerdeClaro = [];
                let rAmarillo = [];
                let rNaranjaclaro = [];
                let rNaranja = [];
                let rRojo = [];
                for (let i = 0; i < this.gearDiagnoses.length; i++) {
                    //Acontinuacion a plicamos una regla de 3 para pasa de valos 1 a 5 a valores de 5 a 30
                    //tenga encuante que la regla dice 30*(valor a combertir)/ 5 => resumen 6*(valor a comvertir
                    this.r.push(6 * this.gearDiagnoses[i].levelMaturity);
                    this.t.push(this.gearDiagnoses[i].name);
                    if (this.r[i] >= 30) {
                        rVerde.push(30);
                    } else {
                        rVerde.push(0);
                    }

                    if (this.r[i] >= 25) {
                        rVerdeClaro.push(25);
                    } else {
                        rVerdeClaro.push(0);
                    }

                    if (this.r[i] >= 20) {
                        rAmarillo.push(20);
                    } else {
                        rAmarillo.push(0);
                    }

                    if (this.r[i] >= 15) {
                        rNaranjaclaro.push(15);
                    } else {
                        rNaranjaclaro.push(0);
                    }

                    if (this.r[i] >= 10) {
                        rNaranja.push(10);
                    } else {
                        rNaranja.push(0);
                    }

                    if (this.r[i] >= 5) {
                        rRojo.push(5);
                    } else {
                        rRojo.push(0);
                    }
                }
                //esto es una arreglo para cuando tengamos menos de  4 entidadaes
                if (rVerde.length < 4) {
                    rVerde.push(0);
                    rVerde.push(0);
                }
                if (rVerdeClaro.length < 4) {
                    rVerdeClaro.push(0);
                    rVerdeClaro.push(0);
                }
                if (rAmarillo.length < 4) {
                    rAmarillo.push(0);
                    rAmarillo.push(0);
                }
                if (rNaranjaclaro.length < 4) {
                    rNaranjaclaro.push(0);
                    rNaranjaclaro.push(0);
                }
                if (rNaranja.length < 4) {
                    rNaranja.push(0);
                    rNaranja.push(0);
                }
                if (rRojo.length < 4) {
                    rRojo.push(0);
                    rRojo.push(0);
                }

                if (this.r.length < 4) {
                    this.r.push(0);
                    this.r.push(0);
                }
                console.log('valor de r', this.r);
                console.log('valor de t', this.t);

                console.log('valor de rVerde', rVerde);
                console.log('valor de rVerdeClaro', rVerdeClaro);
                console.log('valor de rAmarillo', rAmarillo);
                console.log('valor de rNaranjaClaro', rNaranjaclaro);
                console.log('valor de rNaranja', rNaranja);
                console.log('valor de rRojo', rRojo);

                this.verde = {
                    r: rVerde,
                    t: this.t, //['Información', 'Sistemas de \n información', 'Estrategia TI', 'Uso y Apropiación', 'Gobierno TI','Servicios Tecnológicos','Negocio'],
                    name: 'Optimizado',
                    marker: { color: 'rgb(0,204,102)' },
                    type: 'area'
                };

                this.verdeclaro = {
                    r: rVerdeClaro, //[0, 25, 25, 0, 0, 0, 0],
                    t: this.t, //['Información', 'Sistemas de \n información', 'Estrategia TI', 'Uso y Apropiación', 'Gobierno TI','Servicios Tecnológicos','Negocio'],
                    name: 'Controlado/Med.',
                    marker: { color: 'rgb(128,255,0)' },
                    type: 'area'
                };

                this.amarillo = {
                    r: rAmarillo, //[20, 20, 20, 20 , 0, 20, 20],
                    t: this.t, //['Información', 'Sistemas de \n información', 'Estrategia TI', 'Uso y Apropiación', 'Gobierno TI','Servicios Tecnológicos','Negocio'],
                    name: 'Definido',
                    marker: { color: 'rgb(2255, 255, 0)' },
                    type: 'area'
                };

                this.naranjaclaro = {
                    r: rNaranjaclaro, //[0, 15, 15, 15, 15, 0, 15],
                    t: this.t, //['Información', 'Sistemas de \n información', 'Estrategia TI', 'Uso y Apropiación', 'Gobierno TI','Servicios Tecnológicos','Negocio'],
                    name: 'Gestionado',
                    marker: { color: 'rgb(255,178,102)' },
                    type: 'area'
                };

                this.naranja = {
                    r: rNaranja, //[0, 10, 10, 10, 10, 10, 10],
                    t: this.t, //['Información', 'Sistemas de \n información', 'Estrategia TI', 'Uso y Apropiación', 'Gobierno TI','Servicios Tecnológicos','Negocio'],
                    name: 'Inicial',
                    marker: { color: 'rgb(255,128,0)' },
                    type: 'area'
                };

                this.rojo = {
                    r: rRojo, //[0, 5, 5, 5, 5, 5, 5],
                    t: this.t, //['Información', 'Sistemas de \n información', 'Estrategia TI', 'Uso y Apropiación', 'Gobierno TI','Servicios Tecnológicos','Negocio'],
                    name: 'Entendimiento de AE',
                    marker: { color: 'rgb(255,0,0)' },
                    type: 'area'
                };
                this.aranaData = [this.verde, this.verdeclaro, this.amarillo, this.naranjaclaro, this.naranja, this.rojo];

                this.aranaLayout = {
                    title: 'Evaluación del estado de madurez',
                    font: { size: 10 },
                    legend: { font: { size: 11 } },
                    radialaxis: false, //{ ticksuffix: '%' },
                    orientation: 270,
                    showlegend: true,
                    mode: 'lines',
                    angularaxis: { nticks: 6 }
                };
                // Plotly.newPlot('myDiv', this.data, this.layout, { showSendToCloud: true });

                Plotly.newPlot('myDiv', this.aranaData, this.aranaLayout, { showSendToCloud: true });
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    changeColorToComplete(selector) {
        $(selector).css('border-bottom-color', this.levelZero);
    }

    /**  funcion para rrecorrer el arreglo con paramentros de hexagono y arr */
    setHexagon(hexagon, arr) {
        for (let i = 0; i < arr.length; i++) {
            this.setHexagonDomain(hexagon, i, arr[i]);
        }
    }

    /** Pintar los colores en el hexagono de acuerdo al nivel */
    setHexagonDomain(hexagon, domainIndex, value) {
        for (let i = 0; i <= 5; i++) {
            // contiene el nivel que se va a colorear.concateneado el hexagono el dominio y el nivel
            let selector = '#pyramid-container' + hexagon + '-' + domainIndex + ' .pyramid-level-' + (i + 1);

            if (i <= value) {
                /** Asignación del color deacuerdo al nivel */
                if (i === 0) {
                    console.log('Nivel cero');
                    $(selector).css('border-bottom-color', this.levelZero);
                } else if (i === 1) {
                    console.log('Nivel uno');
                    $(selector).css('border-bottom-color', this.levelOne);
                } else if (i === 2) {
                    console.log('Nivel Dos');
                    $(selector).css('border-bottom-color', this.levelTwo);
                } else if (i === 3) {
                    console.log('Nivel Tres');
                    $(selector).css('border-bottom-color', this.levelThree);
                } else if (i === 4) {
                    console.log('Nivel Cuatro');
                    $(selector).css('border-bottom-color', this.levelFour);
                } else {
                    console.log('Nivel Cinco');
                    $(selector).css('border-bottom-color', this.levelFive);
                }
            } else {
                $(selector).css('border-bottom-color', '');
            }
        }
    }

    /** funciçon para actualizar valores del Hexagono. */
    update(i, val) {
        this.valuesArray[i] = val;
        this.setHexagon('1', this.valuesArray);
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
