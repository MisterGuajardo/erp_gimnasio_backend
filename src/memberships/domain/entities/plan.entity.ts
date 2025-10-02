import { randomUUID } from 'crypto';
import {
    InvalidPlanDurationException,
    InvalidPlanNameException,
    InvalidPlanPriceException
} from '../exceptions/plan.exceptions';
import { UsagePolicy } from '../value-objects/usage-policy.vo';

export type PlanDurationUnit = 'days' | 'months' | 'years';

export interface PlanProps {
    id?: string;
    name: string;
    description: string;
    price: number;
    durationValue: number;
    durationUnit: PlanDurationUnit;
    usagePolicy: UsagePolicy;
    isActive: boolean;
}

export class Plan {
    public readonly id: string;
    private name: string;
    private description: string;
    private price: number;
    private durationValue: number;
    private durationUnit: PlanDurationUnit;
    private usagePolicy: UsagePolicy;
    private isActive: boolean;

    private constructor(props: PlanProps) {
        this.id = props.id || randomUUID();
        this.name = props.name;
        this.description = props.description;
        this.price = props.price;
        this.durationValue = props.durationValue;
        this.durationUnit = props.durationUnit;
        this.isActive = props.isActive;
        this.usagePolicy = props.usagePolicy;

        this.validate();
    }

    public static create(props: PlanProps): Plan {
        return new Plan(props);
    }

    getName(): string { return this.name; }
    getDescription(): string { return this.description; }
    getPrice(): number { return this.price; }
    getDurationValue(): number { return this.durationValue; }
    getDurationUnit(): PlanDurationUnit { return this.durationUnit; }
    getIsActive(): boolean { return this.isActive; }
    getUsagePolicy(): UsagePolicy { return this.usagePolicy; }

    public deactivate(): void { this.isActive = false; }
    public activate(): void { this.isActive = true; }

    public changePrice(newPrice: number): void {
        if (newPrice <= 0) {
            throw new InvalidPlanPriceException();
        }
        this.price = newPrice;
    }

    public changeName(newName: string): void {
        if (!newName || newName.trim().length === 0) {
            throw new InvalidPlanNameException("El nuevo nombre del plan no puede estar vacío.");
        }
        this.name = newName;
    }

    public changeDescription(newDescription: string): void {
        this.description = newDescription;
    }

    public changeDuration(newValue: number, newUnit: PlanDurationUnit): void {
        if (newValue <= 0) {
            throw new InvalidPlanDurationException("La nueva duración no puede ser menor a 0.");
        }
        this.durationValue = newValue;
        this.durationUnit = newUnit;
    }

    private validate(): void {
        if (!this.name || this.name.trim().length === 0) {
            throw new InvalidPlanNameException();
        }
        if (this.price <= 0) {
            throw new InvalidPlanPriceException();
        }
        if (this.durationValue <= 0) {
            throw new InvalidPlanDurationException();
        }
    }
}