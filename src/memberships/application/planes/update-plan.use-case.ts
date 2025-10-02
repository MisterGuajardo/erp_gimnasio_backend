import { Injectable, Inject } from '@nestjs/common';
import { PlanRepository } from '../../domain/repositories/plan.repository';
import { PlanDurationUnit } from '../../domain/entities/plan.entity';
import { PlanNotFoundException } from '../../domain/exceptions/plan.exceptions';

// Opcional: crea PlanNotFoundException en plan.exceptions.ts
// export class PlanNotFoundException extends DomainException { ... }

export interface UpdatePlanCommand {
    id: string;
    name?: string;
    description?: string;
    price?: number;
    durationValue?: number;
    durationUnit?: PlanDurationUnit;
    isActive?: boolean;
}

@Injectable()
export class UpdatePlanUseCase {
    constructor(
        @Inject(PlanRepository)
        private readonly planRepository: PlanRepository,
    ) { }

    async execute(command: UpdatePlanCommand): Promise<void> {
        // 1. Buscar la entidad existente
        const plan = await this.planRepository.findById(command.id);

        if (!plan) {
            // 2. Si no existe, lanzamos un error de dominio específico
            throw new PlanNotFoundException(`Plan con ID ${command.id} no encontrado.`);
        }

        // 3. Aplicar los cambios llamando a los métodos de la entidad
        if (command.name !== undefined) plan.changeName(command.name);
        if (command.description !== undefined) plan.changeDescription(command.description);
        if (command.price !== undefined) plan.changePrice(command.price);
        if (command.durationValue !== undefined && command.durationUnit !== undefined) {
            plan.changeDuration(command.durationValue, command.durationUnit);
        }
        if (command.isActive === true) plan.activate();
        if (command.isActive === false) plan.deactivate();

        // 4. Persistir la entidad actualizada
        await this.planRepository.save(plan);
    }
}