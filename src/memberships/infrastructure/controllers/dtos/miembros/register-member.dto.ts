import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RegisterMemberDto {
    @ApiProperty({
        description: 'El primer nombre del miembro.',
        example: 'Pedro',
    })
    @IsString({ message: 'El nombre debe ser un texto.' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
    firstName: string;

    @ApiProperty({
        description: 'El apellido del miembro.',
        example: 'Pascal',
    })
    @IsString({ message: 'El apellido debe ser un texto.' })
    @IsNotEmpty({ message: 'El apellido no puede estar vacío.' })
    lastName: string;

    @ApiProperty({
        description: 'El correo electrónico único del miembro.',
        example: 'pedro.pascal@example.com',
    })
    @IsEmail({}, { message: 'El formato del correo electrónico no es válido.' })
    email: string;

    @ApiProperty({
        description: 'El ID (UUID) del plan al que se está inscribiendo el miembro.',
        example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    })
    @IsUUID('4', { message: 'El ID del plan debe ser un UUID válido.' })
    planId: string;
}