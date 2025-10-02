import { Injectable, Inject } from '@nestjs/common';
import { Plan } from '../../domain/entities/plan.entity';
import { PlanRepository } from '../../domain/repositories/plan.repository';
import { PlanNotFoundException } from '../../domain/exceptions/plan.exceptions';
import { PlanResponseDto } from '../../infrastructure/controllers/dtos/planes/plan-response.dto';

@Injectable()
export class FindOnePlanUseCase {
    constructor(
        @Inject(PlanRepository)
        private readonly planRepository: PlanRepository,
    ) { }

    async execute(command: { id: string }): Promise<PlanResponseDto> {
        const plan = await this.planRepository.findById(command.id);

        if (!plan) {
            throw new PlanNotFoundException(`Plan con ID ${command.id} no encontrado.`);
        }

        return this.toResponseDto(plan);
    }

    private toResponseDto(plan: Plan): PlanResponseDto {
        return {
            id: plan.id,
            name: plan.getName(),
            description: plan.getDescription(),
            price: plan.getPrice(),
            durationValue: plan.getDurationValue(),
            durationUnit: plan.getDurationUnit(),
            isActive: plan.getIsActive(),
        };
    }
}