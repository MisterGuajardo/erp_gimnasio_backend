import { Module } from '@nestjs/common';
import { WelcomeEmailListener } from './listeners/welcome-email.service';

@Module({
    providers: [WelcomeEmailListener],
})
export class NotificationsModule { }