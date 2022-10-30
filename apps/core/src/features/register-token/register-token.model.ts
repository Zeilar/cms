import { ISOString } from "@shared";
import { Model } from "objection";

export class RegisterToken extends Model {
	public readonly id: string;
	public readonly email: string;
	public readonly token: string;
	public readonly expires_at: ISOString;

	public static tableName = "register_tokens";
}
