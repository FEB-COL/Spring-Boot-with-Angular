/**
 * app routing => para declarar las rutas de manera general
 */
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { LoginModule } from 'app/pages/custom-pages/login/login.module';
import { LoginComponent } from 'app/pages/custom-pages/login/login.component';
import { LayoutComponent } from './core/layout/layout.component';
import { GearDomainComponent } from 'app/entities/gear-domain/gear-domain.component';
import { GearDocumentTypeComponent } from 'app/entities/gear-document-type/gear-document-type.component';
import { GearCustomFieldTemplateComponent } from 'app/entities/gear-custom-field-template/gear-custom-field-template.component';
import { GearDecisionComponent } from 'app/entities/gear-decision/gear-decision.component';
import { UserRouteAccessService } from 'app/core';
import { TestComponent } from 'app/pages/test/test.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ParCoinTypeComponent } from 'app/entities/par-coin-type/par-coin-type.component';
import { ParLicenceTypeComponent } from 'app/entities/par-licence-type/par-licence-type.component';
import { ParSystemTypeComponent } from 'app/entities/par-system-type/par-system-type.component';
import { GearValueChainCategoryComponent } from 'app/entities/gear-value-chain-category/gear-value-chain-category.component';
import { GearValueChainMacroprocessComponent } from 'app/entities/gear-value-chain-macroprocess/gear-value-chain-macroprocess.component';
import { GearValueChainProcessComponent } from 'app/entities/gear-value-chain-process/gear-value-chain-process.component';
import { GearInformationSystemsComponent } from 'app/entities/gear-information-systems/gear-information-systems.component';
import { GearSystemsFunctionalityComponent } from 'app/entities/gear-systems-functionality/gear-systems-functionality.component';
import { GearGoalsStrategyAEComponent } from 'app/entities/gear-goals-strategy-ae/gear-goals-strategy-ae.component';
import { GearSmartStrategyAEComponent } from 'app/entities/gear-smart-strategy-ae/gear-smart-strategy-ae.component';
import { PruebaComponent } from 'app/entities/prueba/prueba.component';
import { HomeComponent } from 'app/home';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { GearDiagnosisComponent } from 'app/entities/gear-diagnosis';
import { GearDiagQuestionComponent } from 'app/entities/gear-diag-question';
import { GearDiagAnswerComponent } from 'app/entities/gear-diag-answer';
import { DiagramaEstrategiaComponent } from './entities/diagrama-estrategia/diagrama-estrategia.component';
import { GearSurveySaveComponent } from './entities/gear-survey/gear-survey-save.component';
import { GearSurveyListComponent } from './entities/gear-survey/gear-survey-list.component';
import { GearSurveySolveComponent } from './entities/gear-survey/gear-survey-solve.component';
import { GearPortfolioComponent } from 'app/entities/gear-portfolio';
import { GearProjectComponent } from 'app/entities/gear-project';
import { GearIterationComponent } from 'app/entities/gear-iteration';
import { GearProjectRiskComponent } from 'app/entities/gear-project-risk';
import { GearRiskLogComponent } from 'app/entities/gear-risk-log';
import { GearGestorDocumentalComponent } from 'app/entities/gear-gestor-documental';
import { GearCriteriaComponent } from 'app/entities/gear-criteria';
import { GearOptionComponent } from 'app/entities/gear-option';
import { GearGestionUsuariosComponent } from 'app/entities/gear-gestion-usuarios';
import { GearOrganizationalUnitComponent } from 'app/entities/gear-organizational-unit';
import { GearLibraryComponent } from 'app/entities/gear-library';
import { GearWikiComponent } from 'app/entities/gear-wiki';

const routes: Routes = [
    // ruta para el login.
    {
        path: 'login',
        component: LoginComponent
    },
    // ruta para Dassboard
    {
        path: '',
        component: LayoutComponent,
        canActivate: [UserRouteAccessService],
        children: [
            /** ============ Start Ruta Dashboard ============== */
            {
                path: '',
                loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule',
                pathMatch: 'full'
            },
            /** ============ End Ruta Dashboard ============== */

            /** ============ Start Rutas Admin Dominios ============== */
            {
                path: 'domains',
                component: GearDomainComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL']
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'document-types',
                component: GearDocumentTypeComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL']
                },
                canActivate: [UserRouteAccessService]
            },

            /** ============ Start Ruta Plantillas  ============== */
            {
                path: 'templates',
                component: GearCustomFieldTemplateComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL']
                },
                canActivate: [UserRouteAccessService]
            },
            /** ============ End Rutas Plantillas ============== */

            /** ============ Start Ruta Decisiones  ============== */
            {
                path: 'decisions',
                component: GearDecisionComponent
            },
            {
                path: 'criteria',
                component: GearCriteriaComponent
            },
            {
                path: 'options',
                component: GearOptionComponent
            },
            /** ============ End Ruta Decisiones  ============== */

            /** ============ Start Rutas Generalidades ============== */
            {
                path: 'cointypes',
                component: ParCoinTypeComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER']
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'licencetypes',
                component: ParLicenceTypeComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER']
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'systemtypes',
                component: ParSystemTypeComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER']
                },
                canActivate: [UserRouteAccessService]
            },
            /** ============ End Rutas Generalidades ============== */

            /** ============ Start Rutas Procesos ============== */
            {
                path: 'categories',
                component: GearValueChainCategoryComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL', 'ROLE_USER']
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'macroprocesses',
                component: GearValueChainMacroprocessComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL', 'ROLE_USER']
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'processes',
                component: GearValueChainProcessComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL', 'ROLE_USER']
                },
                canActivate: [UserRouteAccessService]
            },
            /** ============ End Rutas Procesos ============== */

            /** ============ Start Rutas Sistemas de informacion ============== */
            {
                path: 'informationsystems',
                component: GearInformationSystemsComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL', 'ROLE_USER']
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'funcionalities',
                component: GearSystemsFunctionalityComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL', 'ROLE_USER']
                },
                canActivate: [UserRouteAccessService]
            },
            /** ============ End Rutas Sistemas de informacion ============== */

            /** ============ Start Rutas Estrategias ============== */
            {
                path: 'goals',
                component: GearGoalsStrategyAEComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL', 'ROLE_USER']
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'smarts',
                component: GearSmartStrategyAEComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL', 'ROLE_USER']
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'diagram',
                component: DiagramaEstrategiaComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL', 'ROLE_USER']
                },
                canActivate: [UserRouteAccessService]
            },
            /** ============ End Rutas Estrategias ============== */

            /** ============ Start Rutas Diagnosticos ============== */
            {
                path: 'diagnosis',
                component: GearDiagnosisComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL', 'ROLE_USER']
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'diagQuestion',
                component: GearDiagQuestionComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL', 'ROLE_USER']
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'diagAnswer',
                component: GearDiagAnswerComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL', 'ROLE_USER']
                },
                canActivate: [UserRouteAccessService]
            },

            /** ============ End Rutas Diagnosticos ============== */

            /** ============ Start Rutas Encuestas ============== */
            {
                path: 'surveys',
                component: GearSurveyListComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL', 'ROLE_USER']
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'surveys/create/:id',
                component: GearSurveySaveComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL', 'ROLE_USER']
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'surveys/create',
                component: GearSurveySaveComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL', 'ROLE_USER']
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'surveys/solve/:id',
                component: GearSurveySolveComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL', 'ROLE_USER']
                },
                canActivate: [UserRouteAccessService]
            },

            /** ============ End Rutas Diagnosticos ============== */

            /** ============ Start Rutas Portafolios ============== */
            {
                path: 'portfolios',
                component: GearPortfolioComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL', 'ROLE_USER']
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'projects',
                component: GearProjectComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL', 'ROLE_USER']
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'iterations',
                component: GearIterationComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL', 'ROLE_USER']
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'riskProjects',
                component: GearProjectRiskComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL', 'ROLE_USER']
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'riskLogs',
                component: GearRiskLogComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL', 'ROLE_USER']
                },
                canActivate: [UserRouteAccessService]
            },

            /** ============ Start Rutas Gestión Documental.============== */
            {
                path: 'gestor-documental',
                component: GearGestorDocumentalComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL', 'ROLE_USER']
                },
                canActivate: [UserRouteAccessService]
            },
            /** ============ End Rutas Gestión Documental============== */

            /** ============ Start Rutas Gestión Usuarios============== */
            {
                path: 'gestor-usuarios',
                component: GearGestionUsuariosComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER']
                },
                canActivate: [UserRouteAccessService]
            },
            /** ============ End Rutas Gestión Usuarios============== */

            /** ============ Start Rutas Unidad Organizacional ============== */
            {
                path: 'unit-organizational',
                component: GearOrganizationalUnitComponent,
                data: {
                    authorities: ['ROLE_ADMIN']
                },
                canActivate: [UserRouteAccessService]
            },
            /** ============ End Rutas Unidad Organizacional ============== */

            /** ============ Start Rutas Prueba ============== */
            {
                path: 'prueba',
                component: PruebaComponent,
                data: {
                    authorities: ['ROLE_MANAGER']
                },
                canActivate: [UserRouteAccessService]
            },
            /** ============ End Rutas Prueba ============== */

            /** ============ Start Rutas Biblioteca de Documentos.============== */
            {
                path: 'gear-library',
                component: GearLibraryComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL', 'ROLE_USER']
                },
                canActivate: [UserRouteAccessService]
            },
            /** ============ End Rutas Gestión Documental============== */

            /** ============ Start Rutas Wiki.============== */
            {
                path: 'gear-wiki',
                component: GearWikiComponent,
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CONSUL', 'ROLE_USER']
                },
                canActivate: [UserRouteAccessService]
            }
            /** ============ End Rutas Wiki============== */
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules,
            useHash: true,
            enableTracing: DEBUG_INFO_ENABLED
        })
    ],
    exports: [RouterModule],
    providers: [UserRouteAccessService]
})
export class AppRoutingModule {}
// export class GeargatewayAppRoutingModule {}
