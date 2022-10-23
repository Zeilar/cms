import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { User } from "../user/user.model";
import { Maybe } from "@shared";

@Injectable()
export class CustomPassportSerializer extends PassportSerializer {
	public serializeUser(user: User, done: (err: Maybe<Error>, user: User) => void) {
		done(null, user);
	}
	public deserializeUser(payload: string, done: (err: Maybe<Error>, payload: string) => void) {
		done(null, payload);
	}
}
