
// Podemos crear una clase base para identificar errores de la capa de aplicación
export class ApplicationException extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

// Un error específico para cuando los datos de entrada a un caso de uso son inválidos
export class InvalidCommandInputException extends ApplicationException {
    constructor(message: string) {
        super(message);
    }
}