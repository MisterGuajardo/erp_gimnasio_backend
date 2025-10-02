import { Inject, Injectable } from '@nestjs/common';
import { Member } from '../../domain/entities/member.entity';
import { MemberRepository } from '../../domain/repositories/member.repository';
import { MemberResponseDto } from '../../infrastructure/controllers/dtos/miembros/member-response.dto';

@Injectable()
export class FindAllMembersUseCase {
    constructor(
        @Inject(MemberRepository)
        private readonly memberRepo: MemberRepository
    ) { }

    /**
     * Ejecuta el caso de uso para encontrar todos los miembros.
     * @returns Una promesa que resuelve a un arreglo de DTOs de respuesta de miembro.
     */
    async execute(): Promise<MemberResponseDto[]> {
        const members = await this.memberRepo.findAll();
        return members.map(member => this.toResponseDto(member));
    }

    /**
     * Mapea una entidad de dominio `Member` a un `MemberResponseDto`.
     * @param member La entidad de dominio.
     * @returns El DTO de respuesta.
     */
    private toResponseDto(member: Member): MemberResponseDto {
        return {
            id: member.id,
            firstName: member.getFirstName(),
            lastName: member.getLastName(),
            email: member.getEmail(),
            joinDate: member.getJoinDate(),
            status: member.getStatus(),
        };
    }
}