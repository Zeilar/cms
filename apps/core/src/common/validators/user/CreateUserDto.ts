import { RegisterDto } from "@shared";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto implements RegisterDto {
	@IsEmail()
	public email: string;

	@IsString()
	public name: string;

	@IsString()
	public password: string;
}
