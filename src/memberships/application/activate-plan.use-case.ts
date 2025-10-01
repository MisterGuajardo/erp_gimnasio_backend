import { Injectable, Inject } from '@nestjs/common';
import { PlanRepository } from '../domain/repositories/plan.repository';
import { PlanNotFoundException } from '../domain/exceptions/plan.exceptions';

@Injectable()
export class ActivatePlanUseCase {
    constructor(
        @Inject(PlanRepository)
        private readonly planRepository: PlanRepository,
    ) { }

    async execute(command: { id: string }): Promise<void> {
        const plan = await this.planRepository.findById(command.id);

        if (!plan) {
            throw new PlanNotFoundException(`Plan con ID ${command.id} no encontrado.`);
        }

        plan.activate();

        await this.planRepository.save(plan);
    }
}