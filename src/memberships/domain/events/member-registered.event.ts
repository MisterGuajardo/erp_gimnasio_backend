export class MemberRegisteredEvent {
  constructor(
    public readonly memberId: string,
    public readonly email: string,
    public readonly fullName: string,
  ) {}
}