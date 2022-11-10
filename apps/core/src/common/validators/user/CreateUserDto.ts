import { RegisterDto, REGISTER_TOKEN_LENGTH, RegisterValidation } from "@shared";
import { IsEmail, IsString, Length, MaxLength } from "class-validator";

export class CreateUserDto implements RegisterDto {
	@IsEmail()
	@MaxLength(RegisterValidation.EMAIL_MAX_LENGTH)
	public email: string;

	@IsString()
	@Length(RegisterValidation.NAME_MIN_LENGTH, RegisterValidation.NAME_MAX_LENGTH)
	public name: string;

	@IsString()
	@Length(RegisterValidation.PASSWORD_MIN_LENGTH, RegisterValidation.PASSWORD_MAX_LENGTH)
	public password: string;

	@IsString()
	@Length(REGISTER_TOKEN_LENGTH, REGISTER_TOKEN_LENGTH)
	public token: string;
}
