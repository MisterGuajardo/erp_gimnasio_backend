export type UsagePolicyType = 'unlimited' | 'limited_by_week';

export class UsagePolicy {
    public readonly type: UsagePolicyType;
    public readonly usesPerWeek?: number;

    private constructor(type: UsagePolicyType, usesPerWeek?: number) {
        this.type = type;
        this.usesPerWeek = usesPerWeek;
        this.validate();
    }

    public static unlimited(): UsagePolicy {
        return new UsagePolicy('unlimited');
    }

    public static limitedByWeek(uses: number): UsagePolicy {
        if (uses <= 0) {
            throw new Error("El número de usos por semana debe ser positivo.");
        }
        return new UsagePolicy('limited_by_week', uses);
    }

    private validate(): void {
        if (this.type === 'limited_by_week' && (!this.usesPerWeek || this.usesPerWeek <= 0)) {
            throw new Error("Se debe especificar un número válido de usos para una política semanal.");
        }
    }

    // Método para serializar el objeto para la persistencia
    public toPrimitives(): any {
        if (this.type === 'unlimited') {
            return { type: 'unlimited' };
        }
        return { type: 'limited_by_week', usesPerWeek: this.usesPerWeek };
    }
}