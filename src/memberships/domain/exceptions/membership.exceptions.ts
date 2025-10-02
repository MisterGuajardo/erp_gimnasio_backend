import { DomainException } from './plan.exceptions';

export class UsageLimitExceededException extends DomainException {
    constructor(message: string = "Límite de asistencias semanales alcanzado.") {
        super(message);
    }
}

export class MembershipNotActiveException extends DomainException {
    constructor(message: string = "La membresía no se encuentra activa.") {
        super(message);
    }
}