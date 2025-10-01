import { Injectable, Inject } from '@nestjs/common';
import { Plan } from '../domain/entities/plan.entity';
import { PlanRepository } from '../domain/repositories/plan.repository';
import { PlanResponseDto } from '../infrastructure/controllers/dtos/plan-response.dto';

@Injectable()
export class FindAllPlansUseCase {
    constructor(
        @Inject(PlanRepository)
        private readonly planRepository: PlanRepository,
    ) { }

    async execute(): Promise<PlanResponseDto[]> {
        const plans = await this.planRepository.findAll();
        return plans.map(plan => this.toResponseDto(plan));
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