import { Module, Logger, InternalServerErrorException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { Firestore } from 'firebase-admin/firestore';

export const FIRESTORE_PROVIDER = 'FIRESTORE_PROVIDER';

@Module({
    providers: [
        {
            provide: FIRESTORE_PROVIDER,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const logger = new Logger('FirebaseModule');
                try {
                    const firebaseConfig = {
                        projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
                        clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
                        privateKey: configService
                            .get<string>('FIREBASE_PRIVATE_KEY')
                            ?.replace(/\\n/g, '\n'),
                    };

                    if (!firebaseConfig.projectId || !firebaseConfig.clientEmail || !firebaseConfig.privateKey) {
                        throw new Error('Las credenciales de Firebase no están configuradas en el .env');
                    }

                    if (admin.apps.length === 0) {
                        admin.initializeApp({
                            credential: admin.credential.cert(firebaseConfig),
                        });
                    }

                    const firestore: Firestore = admin.firestore();

                    logger.log('Conexión con Firebase establecida correctamente.');

                    return firestore;
                } catch (error) {
                    logger.error('Error al inicializar la conexión con Firebase:', error.stack);
                    throw new InternalServerErrorException(error);
                }
            }
        }
    ],
    exports: [FIRESTORE_PROVIDER]
})
export class FirebaseModule { }
