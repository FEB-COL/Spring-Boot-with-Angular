import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';

import { PruebaComponent } from './prueba.component';

export const pruebaRoute: Routes = [
    /** Ruta Vista Principal*/
    {
        path: 'prueba-ruta',
        component: PruebaComponent,
        canActivate: [UserRouteAccessService]
    }
];
