import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Response } from "express";

interface ErrorResponse {
	message?: string;
	error: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	public catch(exception: HttpException, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();
		const { message, error } = exception.getResponse() as ErrorResponse;
		response.status(status).json({
			data: {},
			error: {
				message: message ?? error,
			},
		});
	}
}
