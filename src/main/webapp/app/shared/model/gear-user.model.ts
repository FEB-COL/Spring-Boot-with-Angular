import { Moment } from 'moment';
import { IGearSurveySolve } from 'app/shared/model//gear-survey-solve.model';

export interface IGearUser {
    id?: number;
    name?: string;
    password?: string;
    email?: string;
    avatar?: string;
    profile?: string;
    state?: boolean;
    idAlfresco?: string;
    loginAttempts?: number;
    lastUpdatePasswordDate?: Moment;
    passwordResetKey?: string;
    pin?: number;
    gearOrganizationalUnitName?: string;
    gearOrganizationalUnitId?: number;
    gearSurveySolves?: IGearSurveySolve[];
}

export class GearUser implements IGearUser {
    constructor(
        public id?: number,
        public name?: string,
        public password?: string,
        public email?: string,
        public avatar?: string,
        public profile?: string,
        public state?: boolean,
        public idAlfresco?: string,
        public loginAttempts?: number,
        public lastUpdatePasswordDate?: Moment,
        public passwordResetKey?: string,
        public pin?: number,
        public gearOrganizationalUnitName?: string,
        public gearOrganizationalUnitId?: number,
        public gearSurveySolves?: IGearSurveySolve[]
    ) {
        this.state = this.state || false;
    }
}
