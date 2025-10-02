import { Inject, Injectable } from '@nestjs/common';
import { MemberNotFoundException } from '../../domain/exceptions/member.exceptions';
import { MemberRepository } from '../../domain/repositories/member.repository';

@Injectable()
export class DeactivateMemberUseCase {
    constructor(
        @Inject(MemberRepository)
        private readonly memberRepo: MemberRepository
    ) { }

    /**
     * Ejecuta el caso de uso para desactivar un miembro (borrado lógico).
     * @param command El comando con el ID del miembro a desactivar.
     */
    async execute(command: { id: string }): Promise<void> {
        // 1. Buscar la entidad existente.
        const member = await this.memberRepo.findById(command.id);

        // 2. Si no se encuentra, lanzar la excepción de dominio.
        if (!member) {
            throw new MemberNotFoundException(`Miembro con ID ${command.id} no encontrado.`);
        }

        // 3. Delegar la acción de negocio a la entidad de dominio.
        member.deactivate();

        // 4. Persistir el estado actualizado de la entidad.
        await this.memberRepo.save(member);
    }
}