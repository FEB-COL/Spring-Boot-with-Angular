import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { IGearSmartStrategyAE } from 'app/shared/model/gear-smart-strategy-ae.model';
import { GearSmartStrategyAEService } from 'app/entities/gear-smart-strategy-ae';
import { IGearGoalsStrategyAE } from 'app/shared/model/gear-goals-strategy-ae.model';
import { GearGoalsStrategyAEService } from 'app/entities/gear-goals-strategy-ae';
// ======================================  Impostacion de Diagnosticos =================
import {
    VisEdges,
    VisNetworkData,
    VisNetworkOptions,
    VisNetworkService,
    VisNode,
    VisNodes
} from '../../../../../../node_modules/ngx-vis/components/network';
import { IGearDomain } from 'app/shared/model/gear-domain.model';
class ExampleNetworkData implements VisNetworkData {
    public nodes: VisNodes;
    public edges: VisEdges;
}
// ======================================  End Grafos ===================================

@Component({
    selector: 'jhi-diagrama-estrategia',
    templateUrl: './diagrama-estrategia.component.html',
    styleUrls: ['./diagrama.component.scss']
})
export class DiagramaEstrategiaComponent implements OnInit, OnDestroy {
    // =====Variable para los Graficacion de los Diagnosticos============
    visNetwork: string = 'networkId1';
    visNetworkData: ExampleNetworkData;
    visNetworkOptions: VisNetworkOptions;
    // ======================  End Grafos ===============================
    gearSmartStrategyAE: IGearSmartStrategyAE;
    isSaving: boolean;
    geargoalsstrategyaes: IGearGoalsStrategyAE[];
    //Variables de la funcion Diagrama
    goals: IGearGoalsStrategyAE[];
    smart: IGearSmartStrategyAE[];

    // ======================= Variables para el filtadro por Unidad ============
    idUnitLocalStorage: any = localStorage.getItem('key1');
    // ========================================================================

    constructor(
        private jhiAlertService: JhiAlertService,
        private gearSmartStrategyAEService: GearSmartStrategyAEService,
        private gearGoalsStrategyAEService: GearGoalsStrategyAEService,
        private visNetworkService: VisNetworkService // grafos
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.gearSmartStrategyAEService.query().subscribe(
            //informacion de estrategia
            (res: HttpResponse<IGearSmartStrategyAE[]>) => {
                //Cargar la info de goal
                this.geargoalsstrategyaes = res.body;
                this.smart = res.body;
                ////////////////////////////////////////////////////////////////////////////////
                ////Funcion de armado//////////
                ////////////////////////////////////////////////////////////////////////////////
                //la variable this.smart es la variable que tiene all la realacion de objetivo y estrategia
                console.log('valores de armardo XXXXXX', this.smart);
                //declaramos las varibles que vamos a utilizar para realizar el arreglo
                let auxEstrategia = [];
                let auxRelacion = [];
                //realizamos el recorrico de la variable para obtener todo los elementos que se van utilizar
                for (let i = 0; i < this.smart.length; i++) {
                    //cargamos todos los objetos que vamos a relacionar
                    auxEstrategia.push({ id: this.smart[i].id, label: this.smart[i].name, color: 'yellow' });
                    //cargamos todas las relaciones que vamos a utilizar
                    auxRelacion.push({ from: this.smart[i].id, to: this.smart[i].geargoalsstrategyaeId, color: { color: '#3c4146' } });
                }
                console.log('resultado de concatenar', auxEstrategia);
                //vamos a realizar el recorrido de todo el objeto para los objetivos que no esten repetido ojo --> que no esten repetidos
                for (let i = 0; i < this.smart.length; i++) {
                    //esta bandera nos ayuda para determinar que durante la comparacion no cargamos objetivos repetidos para ello la inicializamos en false
                    let bandera = false;
                    for (let a = 0; a < auxEstrategia.length; a++) {
                        //realizamos la comparacion y si esta carga la bandera en true para que nos indique que no debemos cargas en los elementos que guardamos
                        if (auxEstrategia[a].id === this.smart[i].geargoalsstrategyaeId) {
                            bandera = true;
                        }
                    }
                    //con ayuda de la bandera si es true no carga el objeto
                    if (!bandera) {
                        //carga el objeto si la bandera esta en false
                        auxEstrategia.push({ id: this.smart[i].geargoalsstrategyaeId, label: this.smart[i].geargoalsstrategyaeName });
                    }
                }
                //mostramos para la validacion ojo
                console.log('resultado de concatenar Estragia Todo', auxEstrategia);
                console.log('resultado de concatenar Relacion Todo', auxRelacion);

                // ================================ Grafos =================================
                // cargamos los datos armados en los elementos que grafica en diagnostico
                const nodes = new VisNodes(auxEstrategia);
                const edges = new VisEdges(auxRelacion);
                this.visNetworkData = { nodes, edges };
                this.visNetworkOptions = {};

                ////////////////////////////////////////////////////////////////////////////////
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////
    // =================================== Grafos ===========================================
    public addNode(): void {
        const newId = this.visNetworkData.nodes.getLength() + 1;
        this.visNetworkData.nodes.add({ id: newId.toString(), label: 'Node ' + newId, color: 'rgb(255,168,7)' });
        this.visNetworkService.fit(this.visNetwork);
    }

    public networkInitialized(): void {
        // now we can use the service to register on events
        this.visNetworkService.on(this.visNetwork, 'click');

        // open your console/dev tools to see the click params
        this.visNetworkService.click.subscribe((eventData: any[]) => {
            if (eventData[0] === this.visNetwork) {
                console.log(eventData[1]);
            }
        });
    }

    public ngOnDestroy(): void {
        this.visNetworkService.off(this.visNetwork, 'click');
    }
    // ================================ End Grafos =================================
}
