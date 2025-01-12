import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.status || 500;

    response.status(status).json({
      statusCode: status,
      message: exception.message || 'Something went wrong!',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
