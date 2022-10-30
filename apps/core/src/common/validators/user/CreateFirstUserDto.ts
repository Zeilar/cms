import { FirstRegisterDto, Validation } from "@shared";
import { IsEmail, IsString, Length, MaxLength } from "class-validator";

export class CreateFirstUserDto implements FirstRegisterDto {
	@IsEmail()
	@MaxLength(Validation.EMAIL_MAX_LENGTH)
	public email: string;

	@IsString()
	@Length(Validation.NAME_MIN_LENGTH, Validation.NAME_MAX_LENGTH)
	public name: string;

	@IsString()
	@Length(Validation.PASSWORD_MIN_LENGTH, Validation.PASSWORD_MAX_LENGTH)
	public password: string;
}
