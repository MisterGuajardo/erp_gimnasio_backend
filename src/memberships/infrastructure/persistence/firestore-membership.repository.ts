import { Inject, Injectable, Logger } from '@nestjs/common';
import { Firestore, DocumentData } from 'firebase-admin/firestore';
import { FIRESTORE_PROVIDER } from 'src/firebase/firebase.module';
import { Membership } from 'src/memberships/domain/entities/membership.entity';
import { MembershipRepository } from 'src/memberships/domain/repositories/membership.repository';

@Injectable()
export class FirestoreMembershipRepository extends MembershipRepository {
    private readonly collectionName = 'memberships';
    private readonly logger = new Logger(FirestoreMembershipRepository.name);

    constructor(@Inject(FIRESTORE_PROVIDER) private readonly firestore: Firestore) {
        super();
    }

    private toPersistence(membership: Membership): any {
        return {
            id: membership.id,
            memberId: membership.getMemberId(),
            planId: membership.getPlanId(),
            startDate: membership.getStartDate(),
            endDate: membership.getEndDate(),
            status: membership.getStatus(),
            attendanceHistory: membership.getAttendanceHistory(),
        };
    }

    private toDomain(data: DocumentData): Membership {
        return Membership.fromPrimitives({
            id: data.id,
            memberId: data.memberId,
            planId: data.planId,
            startDate: data.startDate.toDate(),
            endDate: data.endDate.toDate(),
            status: data.status,
            attendanceHistory: Array.isArray(data.attendanceHistory)
                ? data.attendanceHistory.map((t: any) => t.toDate())
                : [],
        });
    }

    async save(membership: Membership): Promise<void> {
        const membershipData = this.toPersistence(membership);
        await this.firestore
            .collection(this.collectionName)
            .doc(membership.id)
            .set(membershipData);
        this.logger.log(`Membresía guardada con ID: ${membership.id}`);
    }

    async findById(id: string): Promise<Membership | null> {
        const doc = await this.firestore.collection(this.collectionName).doc(id).get();
        if (!doc.exists) {
            return null;
        }
        const data = doc.data();
        if (!data) {
            return null;
        }
        return this.toDomain(data);
    }

    async findActiveByMemberId(memberId: string): Promise<Membership | null> {
        const snapshot = await this.firestore.collection(this.collectionName)
            .where('memberId', '==', memberId)
            .where('status', '==', 'Active')
            .limit(1).get();

        if (snapshot.empty) {
            return null;
        }

        const data = snapshot.docs[0].data();
        if (!data) return null;

        return this.toDomain(data);
    }
}