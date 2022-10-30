import { IsEmail } from "class-validator";

export class RegisterTokenDto {
	@IsEmail()
	public email: string;
}
