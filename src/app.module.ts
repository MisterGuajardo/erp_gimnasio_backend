import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { ConfigModule } from '@nestjs/config';
import { MembershipsModule } from './memberships/memberships.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationsModule } from './notions/notifications.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    FirebaseModule,
    MembershipsModule,
    NotificationsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
