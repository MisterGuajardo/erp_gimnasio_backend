import { Inject, Injectable } from '@nestjs/common';
import { MemberRepository } from '../../domain/repositories/member.repository';
import { MemberNotFoundException } from '../../domain/exceptions/member.exceptions';
import { MemberResponseDto } from '../../infrastructure/controllers/dtos/miembros/member-response.dto';
import { Member } from '../../domain/entities/member.entity';

@Injectable()
export class FindMemberByIdUseCase {
    constructor(@Inject(MemberRepository) private readonly memberRepo: MemberRepository) { }

    async execute(command: { id: string }): Promise<MemberResponseDto> {
        const member = await this.memberRepo.findById(command.id);
        if (!member) throw new MemberNotFoundException();
        return this.toResponseDto(member);
    }

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