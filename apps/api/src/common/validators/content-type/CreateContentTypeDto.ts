import { IsString, IsUUID } from "class-validator";

export class CreateContentTypeDto {
	@IsUUID("4")
	public spaceId: string;

	@IsString()
	public name: string;
}
