import { randomUUID } from 'crypto';
import { Plan } from './plan.entity';
import { MembershipNotActiveException, UsageLimitExceededException } from '../exceptions/membership.exceptions';

export type MembershipStatus = 'Active' | 'Expired' | 'Frozen';

export interface MembershipProps {
    id?: string;
    memberId: string;
    planId: string;
    startDate: Date;
    endDate: Date;
    status?: MembershipStatus;
    attendanceHistory?: Date[];
}

export class Membership {
    public readonly id: string;
    public readonly memberId: string;
    public readonly planId: string;
    private startDate: Date;
    private endDate: Date;
    private status: MembershipStatus;
    private attendanceHistory: Date[];

    private constructor(props: MembershipProps) {
        this.id = props.id || randomUUID();
        this.memberId = props.memberId;
        this.planId = props.planId;
        this.startDate = props.startDate;
        this.endDate = props.endDate;
        this.status = props.status || 'Active';
        this.attendanceHistory = props.attendanceHistory || [];
    }

    public static create(props: { memberId: string, plan: Plan, startDate?: Date }): Membership {
        const startDate = props.startDate || new Date();
        const endDate = this.calculateEndDate(startDate, props.plan);

        return new Membership({
            memberId: props.memberId,
            planId: props.plan.id,
            startDate,
            endDate,
        });
    }

    // Getters
    getMemberId(): string { return this.memberId; }
    getPlanId(): string { return this.planId; }
    getStartDate(): Date { return this.startDate; }
    getEndDate(): Date { return this.endDate; }
    getStatus(): MembershipStatus { return this.status; }
    getAttendanceHistory(): Date[] { return this.attendanceHistory; }

    // Lógica de Negocio
    public recordUsage(plan: Plan): void {
        if (this.status !== 'Active') {
            throw new MembershipNotActiveException();
        }

        const policy = plan.getUsagePolicy();

        if (policy.type === 'unlimited') {
            this.attendanceHistory.push(new Date());
            return;
        }

        if (policy.type === 'limited_by_week') {
            const today = new Date();
            const startOfWeek = this.getStartOfWeek(today);

            const usesThisWeek = this.attendanceHistory.filter(date => date >= startOfWeek).length;

            if (usesThisWeek >= policy.usesPerWeek!) {
                throw new UsageLimitExceededException();
            }

            this.attendanceHistory.push(new Date());
        }
    }

    // Métodos de ayuda privados
    private static calculateEndDate(startDate: Date, plan: Plan): Date {
        const endDate = new Date(startDate);
        const unit = plan.getDurationUnit();
        const value = plan.getDurationValue();

        if (unit === 'days') endDate.setDate(endDate.getDate() + value);
        if (unit === 'months') endDate.setMonth(endDate.getMonth() + value);
        if (unit === 'years') endDate.setFullYear(endDate.getFullYear() + value);

        return endDate;
    }

    private getStartOfWeek(date: Date): Date {
        const d = new Date(date);
        const day = d.getDay(); // Domingo = 0, Lunes = 1, ...
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Ajusta para que Lunes sea el primer día
        d.setDate(diff);
        d.setHours(0, 0, 0, 0); // Establece la hora al inicio del día
        return d;
    }
}