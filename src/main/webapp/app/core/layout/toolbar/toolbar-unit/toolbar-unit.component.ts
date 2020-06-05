import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { IGearOrganizationalUnit } from 'app/shared/model/gear-organizational-unit.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IGearUser } from 'app/shared/model/gear-user.model';
import { MatTableDataSource } from '@angular/material';
import { GearOrganizationalUnitService } from 'app/entities/gear-organizational-unit';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Principal } from 'app/core';
import { Router } from '@angular/router';

@Component({
    selector: 'fury-toolbar-unit',
    templateUrl: './toolbar-unit.component.html',
    styleUrls: ['./toolbar-unit.component.scss']
})
export class ToolbarUnitComponent implements OnInit {
    gearOrganizationals: IGearOrganizationalUnit[];
    idUnit = []; // se obtiene el arreglo de id's de las unidades organizacionales (sugerencia variables en plural)
    nameUnit: any = [];
    cambio: any;
    roleUnit = []; // para el vaor del rol del usuario en sesion

    constructor(
        private unitService: GearOrganizationalUnitService,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private router: Router
    ) {}

    loadAll() {
        console.log('Dentro de load ALl');
        this.unitService.query().subscribe(
            (res: HttpResponse<IGearOrganizationalUnit[]>) => {
                this.gearOrganizationals = res.body;

                /** Recorrer la variable de todas las unidades creadas */
                for (let i = 0; i < this.gearOrganizationals.length; i++) {
                    console.log('Ingreso al For @@@@######');
                    this.idUnit.push({ id: this.gearOrganizationals[i].id });
                    this.nameUnit.push({ name: this.gearOrganizationals[i].name });

                    console.log('RECORRIDO ID', this.idUnit[i].id);
                    console.log('RECORRIDO NAME', this.nameUnit[i].name);
                }

                /** Asignar a variables, toma la primera por defecto */
                let key1 = this.idUnit[0].id;

                /** Asignar variables al localStorage */
                localStorage.setItem('key1', JSON.stringify(key1));
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    /** Funcion de cambio */
    onChange(idUnit) {
        console.log('VALORRRRRRRRRR ID UNIDAD', idUnit);

        /** Asignar a variable el id de la Unidad */
        let key1 = idUnit;

        /** Asignar variable al localStorage */
        localStorage.setItem('key1', JSON.stringify(key1));

        /** Redireccionar a home para el cargue de  Unidad */
        this.router.navigate(['/']);
    }

    ngOnInit() {
        this.loadAll();
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
