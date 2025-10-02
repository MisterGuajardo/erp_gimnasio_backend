import { Module } from '@nestjs/common';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { PlanRepository } from './domain/repositories/plan.repository';
import { FirestorePlanRepository } from './infrastructure/persistence/firestore-plan.repository';
import { MembershipsController } from './infrastructure/controllers/plans.controller';
import { CreatePlanUseCase } from './application/planes/create-plan.use-case';
import { UpdatePlanUseCase } from './application/planes/update-plan.use-case';
import { DeactivatePlanUseCase } from './application/planes/deactivate-plan.use-case';
import { ActivatePlanUseCase } from './application/planes/activate-plan.use-case';
import { FindAllPlansUseCase } from './application/planes/find-all-plans.use-case';
import { FindOnePlanUseCase } from './application/planes/find-one-plan.use-case';
import { MemberRepository } from './domain/repositories/member.repository';
import { FirestoreMemberRepository } from './infrastructure/persistence/firestore-member.repository';

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
        {
            provide: MemberRepository,
            useClass: FirestoreMemberRepository,
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
