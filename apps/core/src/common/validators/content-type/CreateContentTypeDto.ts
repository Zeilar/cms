import { IsString, Length, Matches } from "class-validator";
import {
	ContentTypeValidation,
	CreateContentTypeDto as ICreateContentTypeDto,
	Regex,
} from "@shared";

export class CreateContentTypeDto implements ICreateContentTypeDto {
	@IsString()
	public spaceName: string;

	@Matches(Regex.onlyLetters)
	@Length(ContentTypeValidation.NAME_MIN_LENGTH, ContentTypeValidation.NAME_MAX_LENGTH)
	public name: string;
}
