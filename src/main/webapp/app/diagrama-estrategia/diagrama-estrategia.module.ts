import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiagramaEstrategiaComponent } from './diagrama-estrategia.component';

const routes: Routes = [
    {
        path: '',
        component: DiagramaEstrategiaComponent
    },
    {
        path: '**',
        component: DiagramaEstrategiaComponent
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
