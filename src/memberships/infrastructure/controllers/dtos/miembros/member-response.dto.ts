import { ApiProperty } from '@nestjs/swagger';
import { MemberStatus } from 'src/memberships/domain/entities/member.entity';

export class MemberResponseDto {
    @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' })
    id: string;

    @ApiProperty({ example: 'Pedro' })
    firstName: string;

    @ApiProperty({ example: 'Pascal' })
    lastName: string;

    @ApiProperty({ example: 'pedro.pascal@example.com' })
    email: string;

    @ApiProperty({ example: '2025-10-02T02:09:32.000Z' })
    joinDate: Date;

    @ApiProperty({ example: 'Active', enum: ['Active', 'Inactive'] })
    status: MemberStatus;
}