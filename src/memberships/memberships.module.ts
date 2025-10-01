import { Module } from '@nestjs/common';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { PlanRepository } from './domain/repositories/plan.repository';
import { FirestorePlanRepository } from './infrastructure/persistence/firestore-plan.repository';
import { MembershipsController } from './infrastructure/controllers/memberships.controller';
import { CreatePlanUseCase } from './application/create-plan.use-case';
import { UpdatePlanUseCase } from './application/update-plan.use-case';
import { DeactivatePlanUseCase } from './application/deactivate-plan.use-case';
import { ActivatePlanUseCase } from './application/activate-plan.use-case';
import { FindAllPlansUseCase } from './application/find-all-plans.use-case';
import { FindOnePlanUseCase } from './application/find-one-plan.use-case';

@Module({
    imports: [
        FirebaseModule,
    ],
    controllers: [MembershipsController],
    providers: [
        {
            provide: PlanRepository,
            useClass: FirestorePlanRepository,
        },
        CreatePlanUseCase,
        UpdatePlanUseCase,
        DeactivatePlanUseCase,
        ActivatePlanUseCase,
        FindAllPlansUseCase,
        FindOnePlanUseCase,
    ],
})
export class MembershipsModule { }
