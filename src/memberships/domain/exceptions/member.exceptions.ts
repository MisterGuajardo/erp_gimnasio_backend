import { DomainException } from './plan.exceptions';

export class InvalidMemberNameException extends DomainException {
    constructor(message: string = "El nombre y/o apellido del miembro no son válidos.") {
        super(message);
    }
}

export class InvalidMemberEmailException extends DomainException {
    constructor(message: string = "El formato del email no es válido.") {
        super(message);
    }
}

export class MemberEmailAlreadyExistsException extends DomainException {
    constructor(message: string = "El email proporcionado ya está registrado.") {
        super(message);
    }
}