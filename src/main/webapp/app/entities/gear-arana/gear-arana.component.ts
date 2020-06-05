import { Component, OnInit } from '@angular/core';
import { GearDiagnosisService } from 'app/entities/gear-diagnosis';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IGearDiagnosis } from 'app/shared/model/gear-diagnosis.model';
import * as $ from 'jquery';
/** Implementacion de la ara;a dinamica OJO*/
import * as Plotly from 'plotly.js/dist/plotly.js';
import { Config, Data, Layout } from 'plotly.js/dist/plotly.js';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

@Component({
    selector: 'jhi-gear-arana',
    templateUrl: './gear-arana.component.html',
    styles: []
})
//este componente es para la creacion de la arana para esto lo mejor es realziar:
// la siguiente consulta para los diagnositicos y despues mirar se lo graficamos por medio de flowarrow
export class GearAranaComponent implements OnInit {
    //definicion de variables
    //Nueva Configuracion de Arana con Dinamismo
    gearDiagnoses: IGearDiagnosis[];
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
    constructor(private gearDiagnosisService: GearDiagnosisService, private jhiAlertService: JhiAlertService) {}
    ngOnInit() {
        this.loadArana();
    }
    loadArana() {
        this.gearDiagnosisService.query().subscribe(
            (res: HttpResponse<IGearDiagnosis[]>) => {
                this.gearDiagnoses = res.body;
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
