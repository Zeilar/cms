import { ExecutionContext, Injectable, CanActivate } from "@nestjs/common";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
	public canActivate(context: ExecutionContext): boolean {
		return context.switchToHttp().getRequest().isAuthenticated();
	}
}
