import { IsString } from "class-validator";
import { CreateContentTypeDto as ICreateContentTypeDto } from "@shared";

export class CreateContentTypeDto implements ICreateContentTypeDto {
	@IsString()
	public spaceName: string;

	@IsString()
	public name: string;
}
