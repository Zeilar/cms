import { IsString } from "class-validator";

export class UpdateSpaceDto {
	@IsString()
	public name: string;
}
