import { FirstRegisterDto, Regex, RegisterValidation } from "@shared";
import { IsEmail, Length, Matches, MaxLength } from "class-validator";

export class CreateFirstUserDto implements FirstRegisterDto {
	@IsEmail()
	@MaxLength(RegisterValidation.EMAIL_MAX_LENGTH)
	public email: string;

	@Matches(Regex.onlyLetters)
	@Length(RegisterValidation.NAME_MIN_LENGTH, RegisterValidation.NAME_MAX_LENGTH)
	public name: string;

	@Matches(Regex.password)
	@Length(RegisterValidation.PASSWORD_MIN_LENGTH, RegisterValidation.PASSWORD_MAX_LENGTH)
	public password: string;
}
