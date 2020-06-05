import { IGearDomain } from 'app/shared/model//gear-domain.model';
import { IGearUser } from 'app/shared/model//gear-user.model';
import { IGearPortfolio } from 'app/shared/model//gear-portfolio.model';
import { IGearGoalsStrategyAE } from 'app/shared/model//gear-goals-strategy-ae.model';
import { IGearValueChainCategory } from 'app/shared/model//gear-value-chain-category.model';
import { IGearInformationSystems } from 'app/shared/model//gear-information-systems.model';
import { IGearSurvey } from 'app/shared/model//gear-survey.model';

export interface IGearOrganizationalUnit {
    id?: number;
    name?: string;
    nodeIdAlfresco?: string;
    siteId?: string;
    siteGuid?: string;
    lowercaseRestrictions?: number;
    uppercaseRestrictions?: number;
    specialCharactersRestrictions?: number;
    digitsRestrictions?: number;
    minimumLengthRestrictions?: number;
    maximumLengthRestriction?: number;
    regexCorreoRestriction?: string;
    maximumAttempsRestriction?: number;
    automaticLockEmail?: string;
    manualLockEmail?: string;
    resetPasswordEmail?: string;
    passwordExpiresDays?: number;
    gearDomains?: IGearDomain[];
    gearUsers?: IGearUser[];
    gearPortfolios?: IGearPortfolio[];
    gearGoalsStrategyAES?: IGearGoalsStrategyAE[];
    gearValueChainCategories?: IGearValueChainCategory[];
    gearInformationSystems?: IGearInformationSystems[];
    gearSurveys?: IGearSurvey[];
}

export class GearOrganizationalUnit implements IGearOrganizationalUnit {
    constructor(
        public id?: number,
        public name?: string,
        public nodeIdAlfresco?: string,
        public siteId?: string,
        public siteGuid?: string,
        public lowercaseRestrictions?: number,
        public uppercaseRestrictions?: number,
        public specialCharactersRestrictions?: number,
        public digitsRestrictions?: number,
        public minimumLengthRestrictions?: number,
        public maximumLengthRestriction?: number,
        public regexCorreoRestriction?: string,
        public maximumAttempsRestriction?: number,
        public automaticLockEmail?: string,
        public manualLockEmail?: string,
        public resetPasswordEmail?: string,
        public passwordExpiresDays?: number,
        public gearDomains?: IGearDomain[],
        public gearUsers?: IGearUser[],
        public gearPortfolios?: IGearPortfolio[],
        public gearGoalsStrategyAES?: IGearGoalsStrategyAE[],
        public gearValueChainCategories?: IGearValueChainCategory[],
        public gearInformationSystems?: IGearInformationSystems[],
        public gearSurveys?: IGearSurvey[]
    ) {}
}
