import { IsString } from "class-validator";

export class CreateSpaceDto {
	@IsString()
	public name: string;
}
