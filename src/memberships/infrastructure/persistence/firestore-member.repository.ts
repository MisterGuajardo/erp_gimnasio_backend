import { Inject, Injectable, Logger } from '@nestjs/common';
import { Firestore, DocumentData } from 'firebase-admin/firestore';
import { FIRESTORE_PROVIDER } from 'src/firebase/firebase.module';
import { Member } from 'src/memberships/domain/entities/member.entity';
import { MemberRepository } from 'src/memberships/domain/repositories/member.repository';

@Injectable()
export class FirestoreMemberRepository extends MemberRepository {
    private readonly collectionName = 'members';
    private readonly logger = new Logger(FirestoreMemberRepository.name);

    constructor(
        @Inject(FIRESTORE_PROVIDER)
        private readonly firestore: Firestore,
    ) {
        super();
    }

    // ---- MÉTODOS DE MAPEO (TRADUCCIÓN) ----

    private toPersistence(member: Member): any {
        return {
            id: member.id,
            firstName: member.getFirstName(),
            lastName: member.getLastName(),
            email: member.getEmail(),
            joinDate: member.getJoinDate(), // Guardamos como Timestamp de Firestore
            status: member.getStatus(),
        };
    }

    private toDomain(data: DocumentData): Member {
        return Member.create({
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            joinDate: data.joinDate.toDate(), // Convertimos de Timestamp a Date
            status: data.status,
        });
    }

    // ---- IMPLEMENTACIÓN DE LOS MÉTODOS DEL CONTRATO ----

    async save(member: Member): Promise<void> {
        const memberData = this.toPersistence(member);
        await this.firestore
            .collection(this.collectionName)
            .doc(member.id)
            .set(memberData);
        this.logger.log(`Miembro guardado con ID: ${member.id}`);
    }

    async findById(id: string): Promise<Member | null> {
        const doc = await this.firestore.collection(this.collectionName).doc(id).get();
        if (!doc.exists) {
            return null;
        }
        const data = doc.data();
        if (!data) return null;
        return this.toDomain(data);
    }

    async findByEmail(email: string): Promise<Member | null> {
        const snapshot = await this.firestore
            .collection(this.collectionName)
            .where('email', '==', email)
            .limit(1) // Solo necesitamos un resultado
            .get();

        if (snapshot.empty) {
            return null;
        }

        const doc = snapshot.docs[0];
        const data = doc.data();
        if (!data) return null;

        return this.toDomain(data);
    }

    async findAll(): Promise<Member[]> {
        const snapshot = await this.firestore.collection(this.collectionName).get();
        if (snapshot.empty) {
            return [];
        }

        const members: Member[] = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data) {
                members.push(this.toDomain(data));
            }
        });
        return members;
    }
}