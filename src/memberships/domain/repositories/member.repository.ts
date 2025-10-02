import { Member } from '../entities/member.entity';

export abstract class MemberRepository {
    /**
     * Guarda o actualiza un miembro en la persistencia.
     * @param member La entidad del miembro a persistir.
     */
    abstract save(member: Member): Promise<void>;

    /**
     * Busca un miembro por su identificador único (UUID).
     * @param id El ID del miembro.
     * @returns La entidad del miembro o null si no se encuentra.
     */
    abstract findById(id: string): Promise<Member | null>;

    /**
     * Busca un miembro por su dirección de email.
     * @param email El email del miembro a buscar.
     * @returns La entidad del miembro o null si no se encuentra.
     */
    abstract findByEmail(email: string): Promise<Member | null>;

    /**
     * Devuelve todos los miembros existentes.
     * @returns Un arreglo de todas las entidades de miembros.
     */
    abstract findAll(): Promise<Member[]>;
}