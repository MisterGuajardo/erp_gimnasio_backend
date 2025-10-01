import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, Min, IsIn, IsBoolean } from 'class-validator';
import { PlanDurationUnit } from 'src/memberships/domain/entities/plan.entity';

export class UpdatePlanDto {
    @ApiProperty({
        description: 'El nuevo nombre del plan.',
        example: 'Plan Mensual Gold',
        required: false, // <-- Indica que es opcional
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({
        description: 'La nueva descripción del plan.',
        example: 'Acceso a todas las áreas excepto clases premium.',
        required: false,
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: 'El nuevo precio del plan.', example: 50000, required: false })
    @IsOptional()
    @IsNumber()
    @Min(0.01)
    price?: number;

    @ApiProperty({ description: 'El nuevo valor numérico de la duración.', example: 3, required: false })
    @IsOptional()
    @IsNumber()
    @Min(1)
    durationValue?: number;

    @ApiProperty({ description: 'La nueva unidad de tiempo para la duración.', enum: ['days', 'months', 'years'], example: 'months', required: false })
    @IsOptional()
    @IsIn(['days', 'months', 'years'])
    durationUnit?: PlanDurationUnit;

    @ApiProperty({ description: 'Establece si el plan está activo o inactivo.', example: false, required: false })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}