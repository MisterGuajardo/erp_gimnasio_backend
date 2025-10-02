import { Injectable, Inject, Logger } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
import { MemberRepository } from '../../domain/repositories/member.repository';
import { PlanRepository } from '../../domain/repositories/plan.repository';
import { MemberEmailAlreadyExistsException } from '../../domain/exceptions/member.exceptions';
import { PlanNotFoundException } from '../../domain/exceptions/plan.exceptions';
import { Member } from '../../domain/entities/member.entity';
import { Membership } from '../../domain/entities/membership.entity';
import { RegisterMemberDto } from '../../infrastructure/controllers/dtos/miembros/register-member.dto';
import { FIRESTORE_PROVIDER } from 'src/firebase/firebase.module';
import { TransactionFailedException } from 'src/common/application/exceptions/application.exceptions';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MemberRegisteredEvent } from 'src/memberships/domain/events/member-registered.event';

@Injectable()
export class RegisterMemberUseCase {
    private readonly logger = new Logger(RegisterMemberUseCase.name);

    constructor(
        @Inject(MemberRepository) private readonly memberRepo: MemberRepository,
        @Inject(PlanRepository) private readonly planRepo: PlanRepository,
        @Inject(FIRESTORE_PROVIDER) private readonly firestore: Firestore,
        private readonly eventEmitter: EventEmitter2,
    ) { }

    async execute(command: RegisterMemberDto): Promise<void> {
        const existingMember = await this.memberRepo.findByEmail(command.email);
        if (existingMember) {
            throw new MemberEmailAlreadyExistsException();
        }

        const plan = await this.planRepo.findById(command.planId);
        if (!plan) {
            throw new PlanNotFoundException();
        }

        const member = Member.create({
            firstName: command.firstName,
            lastName: command.lastName,
            email: command.email,
        });

        const membership = Membership.create({
            memberId: member.id,
            plan: plan,
        });

        try {
            await this.firestore.runTransaction(async (transaction) => {
                const memberRef = this.firestore.collection('members').doc(member.id);
                const membershipRef = this.firestore.collection('memberships').doc(membership.id);

                const memberData = {
                    id: member.id,
                    firstName: member.getFirstName(),
                    lastName: member.getLastName(),
                    email: member.getEmail(),
                    joinDate: member.getJoinDate(),
                    status: member.getStatus(),
                };

                const membershipData = {
                    id: membership.id,
                    memberId: membership.getMemberId(),
                    planId: membership.getPlanId(),
                    startDate: membership.getStartDate(),
                    endDate: membership.getEndDate(),
                    status: membership.getStatus(),
                    attendanceHistory: membership.getAttendanceHistory(),
                };

                transaction.set(memberRef, memberData);
                transaction.set(membershipRef, membershipData);
            });

            this.logger.log(`Miembro ${member.id} y Membresía ${membership.id} creados exitosamente en transacción.`);

            const event = new MemberRegisteredEvent(
                member.id,
                member.getEmail(),
                member.getFullName(),
            );
            this.eventEmitter.emit('member.registered', event);

        } catch (error) {
            this.logger.error(`Falló la transacción para registrar al miembro ${command.email}:`, error.stack);
            throw new TransactionFailedException('Ocurrió un error al registrar al miembro. Por favor, intente de nuevo.');
        }

        // 4. (Futuro) Disparar un evento de dominio después de que la transacción fue exitosa
    }
}