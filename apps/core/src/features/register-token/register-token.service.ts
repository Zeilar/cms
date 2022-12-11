import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { RegisterTokenRepository } from "./register-token.repository";
import { Cron, CronExpression } from "@nestjs/schedule";
import { RegisterTokenDto } from "../../common/validators/register-token/RegisterTokenDto";
import { RegisterToken } from "./register-token.model";
import base58 from "base58-random";
import { RegisterTokenValidation } from "@shared";

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

@Injectable()
export class RegisterTokenService {
	public constructor(private readonly registerTokenRepository: RegisterTokenRepository) {}

	public create({ email }: RegisterTokenDto): Promise<RegisterToken> {
		const date = new Date();
		date.setMilliseconds(DAY_IN_MILLISECONDS);
		return this.registerTokenRepository.create({
			email,
			expires_at: date.toISOString(),
			token: base58(RegisterTokenValidation.LENGTH),
		});
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	public async removeExpired() {
		this.registerTokenRepository.removeExpired();
	}

	public async assertTokenIsValid(token: string, email: string): Promise<void> {
		const fetchedtoken = await this.registerTokenRepository.findByToken(token);
		if (!fetchedtoken) {
			throw new NotFoundException("Token not found.");
		}
		if (new Date(fetchedtoken.expires_at).getTime() < Date.now()) {
			throw new BadRequestException(
				"Token has expired. Contact the administrator to get a new one."
			);
		}
		if (fetchedtoken.email !== email) {
			throw new BadRequestException(
				"That email address does not belong to this register token."
			);
		}
	}

	public removeByToken(token: string): Promise<number> {
		return this.registerTokenRepository.removeByToken(token);
	}
}
