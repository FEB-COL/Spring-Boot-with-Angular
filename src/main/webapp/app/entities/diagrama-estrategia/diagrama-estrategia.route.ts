import { Injectable, NgModule } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, RouterModule } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GearValueChainCategory } from 'app/shared/model/gear-value-chain-category.model';
//import { GearValueChainCategoryService } from './diagrama-estrategia.service';
import { DiagramaEstrategiaComponent } from './diagrama-estrategia.component';
import { IGearValueChainCategory } from 'app/shared/model/gear-value-chain-category.model';

const routes: Routes = [
    {
        path: 'diagrama',
        component: DiagramaEstrategiaComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class gearDiagramaRoute {}
