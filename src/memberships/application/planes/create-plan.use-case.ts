import { Injectable, Inject } from '@nestjs/common';
import { Plan } from '../../domain/entities/plan.entity';
import { PlanRepository } from '../../domain/repositories/plan.repository';
import { CreatePlanDto } from 'src/memberships/infrastructure/controllers/dtos/planes/create-plan.dto';
import { UsagePolicy } from 'src/memberships/domain/value-objects/usage-policy.vo';
import { InvalidCommandInputException } from 'src/common/application/exceptions/application.exceptions';

// Definimos una interfaz para los datos de entrada, es más limpio que usar la entidad directamente.
export type CreatePlanCommand = CreatePlanDto;

@Injectable()
export class CreatePlanUseCase {
    constructor(
        @Inject(PlanRepository)
        private readonly planRepository: PlanRepository,
    ) { }

    async execute(command: CreatePlanCommand): Promise<void> {
        let usagePolicyVO: UsagePolicy;

        if (command.usagePolicy.type === 'unlimited') {
            usagePolicyVO = UsagePolicy.unlimited();
        } else {
            if (typeof command.usagePolicy.usesPerWeek !== 'number') {
                throw new InvalidCommandInputException('usesPerWeek es requerido para el tipo limited_by_week');
            }
            usagePolicyVO = UsagePolicy.limitedByWeek(command.usagePolicy.usesPerWeek);
        }

        const plan = Plan.create({
            name: command.name,
            description: command.description,
            price: command.price,
            durationValue: command.durationValue,
            durationUnit: command.durationUnit,
            usagePolicy: usagePolicyVO,
            isActive: true,
        });

        await this.planRepository.save(plan);
    }
}