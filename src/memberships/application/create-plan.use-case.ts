// src/memberships/application/create-plan.use-case.ts

import { Injectable, Inject } from '@nestjs/common';
import { Plan, PlanProps } from '../domain/entities/plan.entity';
import { PlanRepository } from '../domain/repositories/plan.repository';

// Definimos una interfaz para los datos de entrada, es más limpio que usar la entidad directamente.
export type CreatePlanCommand = Omit<PlanProps, 'id' | 'isActive'>;

@Injectable()
export class CreatePlanUseCase {
    constructor(
        @Inject(PlanRepository)
        private readonly planRepository: PlanRepository,
    ) { }

    async execute(command: CreatePlanCommand): Promise<void> {

        const plan = Plan.create({
            ...command,
            isActive: true,
        });

        await this.planRepository.save(plan);
    }
}