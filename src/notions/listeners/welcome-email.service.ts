import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MemberRegisteredEvent } from 'src/memberships/domain/events/member-registered.event';

@Injectable()
export class WelcomeEmailListener {
    private readonly logger = new Logger(WelcomeEmailListener.name);

    @OnEvent('member.registered')
    handleMemberRegisteredEvent(event: MemberRegisteredEvent) {
        // Aquí iría la lógica para enviar un email de verdad.
        // Por ahora, solo mostraremos un log para probar que funciona.
        this.logger.log(`EVENTO RECIBIDO: 'member.registered'.`);
        this.logger.log(`Enviando email de bienvenida a ${event.email} (ID: ${event.memberId})...`);

        // Ejemplo de lógica futura:
        // await this.emailService.sendWelcomeEmail(event.email, event.fullName);
    }
}