import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsOptional, Min, ValidateIf } from 'class-validator';
import { UsagePolicyType } from 'src/memberships/domain/value-objects/usage-policy.vo';

export class UsagePolicyDto {
    @ApiProperty({
        description: "El tipo de política de uso ('unlimited' o 'limited_by_week').",
        enum: ['unlimited', 'limited_by_week'],
        example: 'limited_by_week',
    })
    @IsIn(['unlimited', 'limited_by_week'])
    type: UsagePolicyType;

    @ApiProperty({
        description: "El número de usos por semana. Requerido solo si el tipo es 'limited_by_week'.",
        example: 3,
        required: false,
    })
    // Esta validación es condicional: solo se aplica si el tipo es 'limited_by_week'
    @ValidateIf(o => o.type === 'limited_by_week')
    @IsNotEmpty({ message: 'usesPerWeek es requerido para el tipo limited_by_week' })
    @IsNumber()
    @Min(1)
    @Type(() => Number) // Transforma el input a número si es necesario
    usesPerWeek?: number;
}