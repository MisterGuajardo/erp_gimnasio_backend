import { ApiProperty } from '@nestjs/swagger';
import { PlanDurationUnit } from "src/memberships/domain/entities/plan.entity";
import { UsagePolicyType } from 'src/memberships/domain/value-objects/usage-policy.vo';

class UsagePolicyResponse {
    @ApiProperty({ enum: ['unlimited', 'limited_by_week'] })
    type: UsagePolicyType;

    @ApiProperty({ required: false })
    usesPerWeek?: number;
}

export class PlanResponseDto {
    @ApiProperty({ description: 'El ID único del plan (UUID).', example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' })
    id: string;

    @ApiProperty({ description: 'El nombre del plan.', example: 'Plan Mensual Premium' })
    name: string;

    @ApiProperty({ description: 'Descripción detallada del plan.', example: 'Acceso ilimitado a todas las áreas.' })
    description: string;

    @ApiProperty({ description: 'El precio del plan.', example: 45000 })
    price: number;

    @ApiProperty({ description: 'Valor numérico de la duración.', example: 1 })
    durationValue: number;

    @ApiProperty({ description: 'Unidad de tiempo de la duración.', enum: ['days', 'months', 'years'], example: 'months' })
    durationUnit: PlanDurationUnit;

    @ApiProperty({ description: 'Indica si el plan está activo y puede ser vendido.', example: true })
    isActive: boolean;

    @ApiProperty({
        description: 'La política de uso asociada al plan.',
        type: UsagePolicyResponse,
        examples: [
            { type: 'unlimited' },
            { type: 'limited_by_week', usesPerWeek: 3 }
        ]
    })
    usagePolicy: UsagePolicyResponse;
}