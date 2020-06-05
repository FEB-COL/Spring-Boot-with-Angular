import { IGearDiagnosis } from 'app/shared/model//gear-diagnosis.model';

export interface IGearDiagnosisType {
    id?: number;
    name?: string;
    description?: string;
    gearDiagnoses?: IGearDiagnosis[];
}

export class GearDiagnosisType implements IGearDiagnosisType {
    constructor(public id?: number, public name?: string, public description?: string, public gearDiagnoses?: IGearDiagnosis[]) {}
}
