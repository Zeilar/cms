import { RegisterDto, REGISTER_TOKEN_LENGTH, Validation } from "@shared";
import { IsEmail, IsString, Length, MaxLength } from "class-validator";

export class CreateUserDto implements RegisterDto {
	@IsEmail()
	@MaxLength(Validation.EMAIL_MAX_LENGTH)
	public email: string;

	@IsString()
	@Length(Validation.NAME_MIN_LENGTH, Validation.NAME_MAX_LENGTH)
	public name: string;

	@IsString()
	@Length(Validation.PASSWORD_MIN_LENGTH, Validation.PASSWORD_MAX_LENGTH)
	public password: string;

	@IsString()
	@Length(REGISTER_TOKEN_LENGTH, REGISTER_TOKEN_LENGTH)
	public token: string;
}
