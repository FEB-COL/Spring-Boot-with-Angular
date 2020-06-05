import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IGearSmartStrategyAE } from 'app/shared/model/gear-smart-strategy-ae.model';
import { GearSmartStrategyAEService } from './gear-smart-strategy-ae.service';
import { IGearGoalsStrategyAE } from 'app/shared/model/gear-goals-strategy-ae.model';
import { GearGoalsStrategyAEService } from 'app/entities/gear-goals-strategy-ae';

//import {Network} from "vis";
import { Network, DataSet, Node, Edge, IdType } from 'vis';
import $ from 'jquery';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'jhi-gear-smart-strategy-ae-update',
    templateUrl: './gear-smart-strategy-ae-update.component.html'
})
export class GearSmartStrategyAEUpdateComponent implements OnInit {
    gearSmartStrategyAE: IGearSmartStrategyAE;
    //geartraersmart: IGearSmartStrategyAE [];
    isSaving: boolean;

    geargoalsstrategyaes: IGearGoalsStrategyAE[];

    //para relacionar por nombre
    geargoalsstrategyaestemporal: any;
    //fin

    //Variables de la funcion Diagrama
    nodesGoalReport = [];
    edgesGoalReport = [];
    goals: IGearGoalsStrategyAE[];
    smart: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private gearSmartStrategyAEService: GearSmartStrategyAEService,
        private gearGoalsStrategyAEService: GearGoalsStrategyAEService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gearSmartStrategyAE }) => {
            console.log('Busacando otra', gearSmartStrategyAE);
            this.gearSmartStrategyAE = gearSmartStrategyAE;
            this.smart = gearSmartStrategyAE;
        });
        this.gearGoalsStrategyAEService.query().subscribe(
            //informacion de estrategia
            (res: HttpResponse<IGearGoalsStrategyAE[]>) => {
                //Cargar la info de goal
                console.log('Bucando relacion', res);
                this.geargoalsstrategyaes = res.body;
                this.goals = res.body;
                console.log('Bucando relacion2', this.goals);
                this.traervalores();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        //PRUEBAS CNSOLE LOG
        //llamar valores para diagrama
        //alert("Hola funciona por favor ");
        //this.traervalores();
        console.log('buscando jason 1', this.goals);
        console.log('buscando jason 2', this.smart);
        //alert(this.goals)
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        //para relacionar por nombre y ID
        console.log('Consulta de ID y NAME', this.geargoalsstrategyaestemporal);
        this.gearSmartStrategyAE.geargoalsstrategyaeId = this.geargoalsstrategyaestemporal['id'];
        console.log('Consulta de ID NUMERO 1', this.gearSmartStrategyAE.geargoalsstrategyaeId);
        this.gearSmartStrategyAE.geargoalsstrategyaeName = this.geargoalsstrategyaestemporal['name'];
        console.log('Consulta de NAME NUMERO 2', this.gearSmartStrategyAE.geargoalsstrategyaeName);
        //fin
        if (this.gearSmartStrategyAE.id !== undefined) {
            this.subscribeToSaveResponse(this.gearSmartStrategyAEService.update(this.gearSmartStrategyAE));
        } else {
            this.subscribeToSaveResponse(this.gearSmartStrategyAEService.create(this.gearSmartStrategyAE));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGearSmartStrategyAE>>) {
        result.subscribe((res: HttpResponse<IGearSmartStrategyAE>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackGearGoalsStrategyAEById(index: number, item: IGearGoalsStrategyAE) {
        return item.id;
    }

    //funcion diagrama :

    traervalores() {
        // cargar valores para el diagrama
        var dataJson = this.goals;
        console.log('Jason 1 pruena', this.goals);
        // console.log("buscando jason 1", this.goals);
        var dataJson2 = this.smart; //smartbody
        console.log('Jason 2 pruena', this.smart);

        for (let i = 0; i < this.goals.length; i++) {
            //inica For
            this.nodesGoalReport.push({ id: this.goals[i].id, label: this.goals[i].name, group: 'goalNode' }); //Arma  un Json
        } // Fin for
        //this.nodesGoalReport.push({id: goal.id, label: goal.name, group: 'goalNode'}); //Arma  un Json

        for (let i = 0; i < this.smart.length; i++) {
            //inica for
            this.nodesGoalReport.push({ id: this.smart[i].id, label: this.smart[i].name, group: 'smartNode' });
            this.edgesGoalReport.push({
                from: this.smart[i].gearsmartstrategyaes,
                color: { color: '#1E88E5' },
                to: this.smart.id,
                arrows: 'to'
            });
        } //fin for

        //Funcion draw

        this.drawNodes();

        //this.nodesGoalReport.push({id: smart.id, label: smart.name, group: 'smartNode'});
        //this.edgesGoalReport.push({from: goal.id, color: {color:'#1E88E5'} ,  to: smart.id, arrows:'to'});
    } //Cierra funcion traer

    drawNodes() {
        // create a network
        var container = document.getElementById('goals-smart-portfolio-diagram');
        var data = {
            nodes: this.nodesGoalReport,
            edges: this.edgesGoalReport
        };
        var options = {
            nodes: {
                shape: 'dot',
                size: 20,
                font: {
                    size: 14,
                    color: '#777777'
                },
                borderWidth: 2
            },
            edges: {
                width: 2
            },
            groups: {
                diamonds: {
                    color: { background: 'red', border: 'white' },
                    shape: 'diamond'
                },
                dotsWithLabel: {
                    label: "I'm a dot!",
                    shape: 'dot',
                    color: 'cyan'
                },
                mints: { color: 'rgb(0,255,140)' },
                iconRoot: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf1d1',
                        size: 50,
                        color: '#009688'
                    }
                },
                goalNode: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf1d1',
                        size: 50,
                        color: '#FFB300'
                    }
                },
                smartNode: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf140',
                        size: 50,
                        color: '#1E88E5'
                    }
                },
                portfolio: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf12e',
                        size: 50,
                        color: '#009688'
                    }
                },
                source: {
                    color: { border: 'white' }
                }
            }
        };
        var network = new Network(container, data, options);
    }

    //
} //cierra clase
