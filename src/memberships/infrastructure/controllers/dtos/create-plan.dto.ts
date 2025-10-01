import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min, IsIn } from 'class-validator';
import { PlanDurationUnit } from 'src/memberships/domain/entities/plan.entity';

export class CreatePlanDto {
    @ApiProperty({
        description: 'El nombre del plan.',
        example: 'Plan Mensual Premium',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Una descripción detallada del plan y sus beneficios.',
        example: 'Acceso ilimitado a todas las áreas y clases grupales.',
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: 'El precio del plan en la moneda local (ej: CLP).',
        example: 45000,
    })
    @IsNumber()
    @Min(0.01)
    price: number;

    @ApiProperty({
        description: 'El valor numérico de la duración del plan.',
        example: 1,
    })
    @IsNumber()
    @Min(1)
    durationValue: number;

    @ApiProperty({
        description: 'La unidad de tiempo para la duración del plan.',
        enum: ['days', 'months', 'years'],
        example: 'months',
    })
    @IsIn(['days', 'months', 'years'])
    durationUnit: PlanDurationUnit;
}