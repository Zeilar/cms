import { ISOString } from "@shared";
import { Model } from "objection";
import { Tables } from "../../core/db/tables";

export class RegisterToken extends Model {
	public readonly id: string;
	public readonly email: string;
	public readonly token: string;
	public readonly expires_at: ISOString;

	public static tableName = Tables.REGISTER_TOKENS;
}
