import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

interface Response<T> {
	data: T;
}

@Injectable()
export class DataInterceptor<T = unknown> implements NestInterceptor<T, Response<T>> {
	public intercept(_context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
		return next.handle().pipe(map(data => ({ data, error: {} })));
	}
}
