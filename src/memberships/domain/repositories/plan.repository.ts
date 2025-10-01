// src/memberships/domain/repositories/plan.repository.ts

import { Plan } from '../entities/plan.entity';

export abstract class PlanRepository {
    /**
     * Guarda o actualiza un plan en la persistencia.
     * @param plan La entidad del plan a persistir.
     */
    abstract save(plan: Plan): Promise<void>;

    /**
     * Busca un plan por su identificador único.
     * @param id El ID del plan.
     * @returns La entidad del plan o null si no se encuentra.
     */
    abstract findById(id: string): Promise<Plan | null>;

    /**
     * Devuelve todos los planes existentes.
     * @returns Un arreglo de todas las entidades de planes.
     */
    abstract findAll(): Promise<Plan[]>;

    // Podríamos añadir más adelante:
    // abstract findByName(name: string): Promise<Plan | null>;
    // abstract delete(id: string): Promise<void>; // Para borrado físico si se necesitara
}