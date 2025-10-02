import { randomUUID } from 'crypto';
import { InvalidMemberEmailException, InvalidMemberNameException } from '../exceptions/member.exceptions';

export type MemberStatus = 'Active' | 'Inactive';

export interface MemberProps {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    joinDate?: Date;
    status?: MemberStatus;
}

export class Member {
    public readonly id: string;
    private firstName: string;
    private lastName: string;
    private email: string;
    private readonly joinDate: Date;
    private status: MemberStatus;

    private constructor(props: MemberProps) {
        this.id = props.id || randomUUID();
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.email = props.email;
        this.joinDate = props.joinDate || new Date(); // Se asigna al momento de la creación
        this.status = props.status || 'Active'; // Un miembro nuevo siempre está activo

        this.validate();
    }

    /**
     * Factory method para crear una instancia de Miembro de forma controlada.
     */
    public static create(props: MemberProps): Member {
        return new Member(props);
    }

    // Métodos para acceder a las propiedades (Getters)
    getFirstName(): string { return this.firstName; }
    getLastName(): string { return this.lastName; }
    getFullName(): string { return `${this.firstName} ${this.lastName}`; }
    getEmail(): string { return this.email; }
    getJoinDate(): Date { return this.joinDate; }
    getStatus(): MemberStatus { return this.status; }

    // --- Métodos que encapsulan lógica de negocio ---

    /**
     * Actualiza el perfil del miembro.
     */
    public updateProfile(data: { firstName?: string; lastName?: string }): void {
        this.firstName = data.firstName ?? this.firstName;
        this.lastName = data.lastName ?? this.lastName;
        this.validate(); // Re-validamos para asegurar que el nuevo estado sea consistente
    }

    /**
     * Desactiva al miembro en el sistema.
     */
    public deactivate(): void {
        this.status = 'Inactive';
    }

    /**
     * Reactiva a un miembro inactivo.
     */
    public reactivate(): void {
        this.status = 'Active';
    }

    /**
     * Método privado para asegurar que el estado de la entidad siempre sea válido.
     * Estas son las "invariantes" de la entidad.
     */
    private validate(): void {
        if (!this.firstName || this.firstName.trim().length < 2) {
            throw new InvalidMemberNameException("El nombre del miembro es requerido.");
        }
        if (!this.lastName || this.lastName.trim().length < 2) {
            throw new InvalidMemberNameException("El apellido del miembro es requerido.");
        }

        // Expresión regular simple para validar el formato del email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email)) {
            throw new InvalidMemberEmailException();
        }
    }
}