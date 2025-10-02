import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import {
    DomainException,
    InvalidPlanDurationException,
    InvalidPlanNameException,
    InvalidPlanPriceException,
    PlanNotFoundException
} from 'src/memberships/domain/exceptions/plan.exceptions';
import { InvalidCommandInputException, TransactionFailedException } from '../application/exceptions/application.exceptions';

@Catch(DomainException) // Atrapa todas las excepciones que hereden de DomainException
export class DomainExceptionFilter implements ExceptionFilter {
    catch(exception: DomainException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = 500; // Por defecto Internal Server Error

        // Mapea excepciones específicas a códigos de estado HTTP
        if (
            exception instanceof InvalidPlanNameException ||
            exception instanceof InvalidPlanPriceException ||
            exception instanceof InvalidPlanDurationException
        ) {
            status = 400; // Bad Request
        }

        if (exception instanceof PlanNotFoundException) {
            status = 404; // Not Found
        }

        else if (exception instanceof InvalidCommandInputException) {
            status = 400;
        }

        else if (exception instanceof TransactionFailedException) status = 500;
        
        response
            .status(status)
            .json({
                statusCode: status,
                message: exception.message,
                error: exception.name,
                timestamp: new Date().toISOString(),
            });
    }
}