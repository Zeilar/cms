import { Injectable } from "@nestjs/common";
import { RegisterToken } from "./register-token.model";
import Objection from "objection";

@Injectable()
export class RegisterTokenRepository {
	public create(dto: Objection.PartialModelObject<RegisterToken>): Promise<RegisterToken> {
		return RegisterToken.query().insertAndFetch(dto).execute();
	}

	public findByToken(token: string): Promise<RegisterToken | undefined> {
		return RegisterToken.query().findOne("token", token).execute();
	}

	public async removeExpired(): Promise<void> {
		const expired = await RegisterToken.query().where(
			"expires_at",
			"<=",
			new Date().toISOString()
		);
		await Promise.all(expired.map(token => token.$query().delete().execute()));
	}

	public removeByToken(token: string): Promise<number> {
		return RegisterToken.query().findOne("token", token).delete().execute();
	}
}
