import { Inject, Injectable } from '@nestjs/common';
import { Firestore, DocumentData } from 'firebase-admin/firestore';
import { FIRESTORE_PROVIDER } from 'src/firebase/firebase.module';
import { Plan } from 'src/memberships/domain/entities/plan.entity';
import { PlanRepository } from 'src/memberships/domain/repositories/plan.repository';

@Injectable()
export class FirestorePlanRepository extends PlanRepository {
    // El nombre de la colección en Firestore
    private readonly collectionName = 'plans';

    constructor(
        @Inject(FIRESTORE_PROVIDER)
        private readonly firestore: Firestore,
    ) {
        super();
    }

    // ---- MÉTODOS DE MAPEO (TRADUCCIÓN) ----

    /**
     * Convierte una entidad Plan a un objeto plano para Firestore.
     */
    private toPersistence(plan: Plan): any {
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

    /**
     * Convierte datos crudos de Firestore a una entidad Plan.
     */
    private toDomain(data: DocumentData): Plan {
        return Plan.create({
            id: data.id,
            name: data.name,
            description: data.description,
            price: data.price,
            durationValue: data.durationValue,
            durationUnit: data.durationUnit,
            isActive: data.isActive,
        });
    }

    // ---- IMPLEMENTACIÓN DE LOS MÉTODOS DEL CONTRATO ----

    async save(plan: Plan): Promise<void> {
        const planData = this.toPersistence(plan);
        await this.firestore
            .collection(this.collectionName)
            .doc(plan.id)
            .set(planData);
    }

    async findById(id: string): Promise<Plan | null> {
        const doc = await this.firestore
            .collection(this.collectionName)
            .doc(id)
            .get();

        if (!doc.exists) {
            return null;
        }

        const data = doc.data();
        if (!data) {
            return null;
        }

        return this.toDomain(data);
    }

    async findAll(): Promise<Plan[]> {
        const snapshot = await this.firestore.collection(this.collectionName).get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs
            .map((doc) => this.toDomain(doc.data()))
            .filter(Boolean);
    }
}