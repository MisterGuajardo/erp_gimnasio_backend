export class DomainException extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class InvalidPlanNameException extends DomainException {
    constructor(message: string = "El nombre del plan no puede estar vacío.") {
        super(message);
    }
}

export class InvalidPlanPriceException extends DomainException {
    constructor(message: string = "El precio debe ser un valor positivo.") {
        super(message);
    }
}

export class InvalidPlanDurationException extends DomainException {
    constructor(message: string = "La duración debe ser un valor positivo.") {
        super(message);
    }
}

export class PlanNotFoundException extends DomainException {
    constructor(message: string = "El plan especificado no fue encontrado.") {
        super(message);
    }
}