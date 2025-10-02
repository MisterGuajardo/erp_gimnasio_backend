import { Membership } from '../entities/membership.entity';

export abstract class MembershipRepository {
    abstract save(membership: Membership): Promise<void>;
    abstract findById(id: string): Promise<Membership | null>;
    abstract findActiveByMemberId(memberId: string): Promise<Membership | null>;
}