import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GeargatewayGearDomainModule } from './gear-domain/gear-domain.module';
import { GeargatewayGearDocumentTypeModule } from './gear-document-type/gear-document-type.module';
import { GeargatewayGearCustomFieldTemplateModule } from './gear-custom-field-template/gear-custom-field-template.module';
import { GeargatewayGearDecisionModule } from './gear-decision/gear-decision.module';
import { GeargatewayGearCriteriaModule } from './gear-criteria/gear-criteria.module';
import { GeargatewayGearOptionModule } from './gear-option/gear-option.module';
import { GeargatewayGearValueChainCategoryModule } from './gear-value-chain-category/gear-value-chain-category.module';
import { GeargatewayGearValueChainProcessModule } from './gear-value-chain-process/gear-value-chain-process.module';
import { GeargatewayGearValueChainMacroprocessModule } from './gear-value-chain-macroprocess/gear-value-chain-macroprocess.module';
import { GeargatewayGearInformationSystemsModule } from './gear-information-systems/gear-information-systems.module';
import { GeargatewayGearSystemsFunctionalityModule } from './gear-systems-functionality/gear-systems-functionality.module';
import { GeargatewayGearProcessInfoSystemModule } from './gear-process-info-system/gear-process-info-system.module';
import { GeargatewayGearGoalsStrategyAEModule } from './gear-goals-strategy-ae/gear-goals-strategy-ae.module';
import { GeargatewayGearSmartStrategyAEModule } from './gear-smart-strategy-ae/gear-smart-strategy-ae.module';
import { GeargatewayParCoinTypeModule } from './par-coin-type/par-coin-type.module';
import { GeargatewayParSystemTypeModule } from './par-system-type/par-system-type.module';
import { GeargatewayParLicenceTypeModule } from './par-licence-type/par-licence-type.module';
import { GeargatewayPruebaModule } from './prueba/prueba.module';
import { GeargatewayAlfrescoSiteModule } from './alfresco-site/alfresco-site.module';
import { GeargatewayAlfrescoNodePropertiesModule } from './alfresco-node-properties/alfresco-node-properties.module';
import { GeargatewayAfrescoNodeModule } from './afresco-node/afresco-node.module';
import { GeargatewayGearDiagnosisTypeModule } from './gear-diagnosis-type/gear-diagnosis-type.module';
import { GeargatewayGearDiagnosisModule } from './gear-diagnosis/gear-diagnosis.module';
import { GeargatewayGearDiagQuestionModule } from './gear-diag-question/gear-diag-question.module';
import { GeargatewayGearDiagAnswerModule } from './gear-diag-answer/gear-diag-answer.module';
import { GeargatewayGearAmbitModule } from './gear-ambit/gear-ambit.module';
import { GearDiagramaModule } from 'app/entities/diagrama-estrategia/diagrama-estrategia.module';

import { GeargatewayGearPortfolioModule } from 'app/entities/gear-portfolio/gear-portfolio.module';
import { GeargatewayGearProjectModule } from 'app/entities/gear-project/gear-project.module';
import { GeargatewayGearIterationModule } from 'app/entities/gear-iteration/gear-iteration.module';
import { GeargatewayGearProjectRiskModule } from 'app/entities/gear-project-risk/gear-project-risk.module';
import { GeargatewayGearRiskLogModule } from 'app/entities/gear-risk-log/gear-risk-log.module';
import { GeargatewayGestorDocumentalModule } from 'app/entities/gear-gestor-documental/gear-gestor-documental.module';
import { GearGestionUsuariosModule } from 'app/entities/gear-gestion-usuarios/gear-gestion-usuarios.module';
import { GeargatewayGearOrganizationalUnitModule } from 'app/entities/gear-organizational-unit/gear-organizational-unit.module';
import { GeargatewayGearSurveyModule } from 'app/entities/gear-survey/gear-survey.module';
import { GeargatewayGearLibraryModule } from 'app/entities/gear-library/gear-library.module';
import { GeargatewayGearWikiModule } from 'app/entities/gear-wiki/gear-wiki.module';

@NgModule({
    // prettier-ignore
    imports: [
        GeargatewayGearDomainModule,
        GeargatewayGearDocumentTypeModule,
        GeargatewayGearCustomFieldTemplateModule,
        GeargatewayGearDecisionModule,
        GeargatewayGearCriteriaModule,
        GeargatewayGearOptionModule,
        GeargatewayParCoinTypeModule,
        GeargatewayParSystemTypeModule,
        GeargatewayParLicenceTypeModule,
        GeargatewayPruebaModule,
        GeargatewayGearValueChainCategoryModule,
        GeargatewayGearValueChainProcessModule,
        GeargatewayGearValueChainMacroprocessModule,
        GeargatewayGearInformationSystemsModule,
        GeargatewayGearSystemsFunctionalityModule,
        GeargatewayGearProcessInfoSystemModule,
        GeargatewayGearGoalsStrategyAEModule,
        GeargatewayGearSmartStrategyAEModule,
        GeargatewayAlfrescoSiteModule,
        GeargatewayAlfrescoNodePropertiesModule,
        GeargatewayAfrescoNodeModule,

        GeargatewayGearDiagnosisTypeModule,
        GeargatewayGearDiagnosisModule,
        GeargatewayGearDiagQuestionModule,
        GeargatewayGearDiagAnswerModule,
        GeargatewayGearAmbitModule,
        GearDiagramaModule,

        GeargatewayGearPortfolioModule,
        GeargatewayGearProjectModule,
        GeargatewayGearIterationModule,
        GeargatewayGearProjectRiskModule,
        GeargatewayGearRiskLogModule,

        GeargatewayGestorDocumentalModule,
        //configuracion de usuarios
        GearGestionUsuariosModule,

        // Configuracion de unidades
        GeargatewayGearOrganizationalUnitModule,

        // configuracion Encuestas
        GeargatewayGearSurveyModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */

        // Configuracion Biblioteca Documentos
        GeargatewayGearLibraryModule,

        // Configuracion Wikis
        GeargatewayGearWikiModule

    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeargatewayEntityModule {}
