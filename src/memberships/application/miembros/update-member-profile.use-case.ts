import { Inject, Injectable } from '@nestjs/common';
import { MemberNotFoundException } from '../../domain/exceptions/member.exceptions';
import { MemberRepository } from '../../domain/repositories/member.repository';

/**
 * Define la estructura de datos que el caso de uso espera recibir.
 */
export interface UpdateMemberCommand {
    id: string;
    firstName?: string;
    lastName?: string;
}

@Injectable()
export class UpdateMemberProfileUseCase {
    constructor(
        @Inject(MemberRepository)
        private readonly memberRepo: MemberRepository
    ) { }

    /**
     * Ejecuta el caso de uso para actualizar el perfil de un miembro.
     * @param command El comando con el ID del miembro y los datos a actualizar.
     */
    async execute(command: UpdateMemberCommand): Promise<void> {
        // 1. Buscar la entidad existente usando el repositorio.
        const member = await this.memberRepo.findById(command.id);

        // 2. Si no se encuentra, lanzar una excepción de dominio.
        if (!member) {
            throw new MemberNotFoundException(`Miembro con ID ${command.id} no encontrado.`);
        }

        // 3. Delegar la lógica de actualización a la entidad de dominio.
        //    La entidad se encarga de validar los nuevos datos.
        member.updateProfile({
            firstName: command.firstName,
            lastName: command.lastName
        });

        // 4. Persistir la entidad actualizada.
        await this.memberRepo.save(member);
    }
}