import { Regex } from "@shared";
import { Matches, ValidateNested } from "class-validator";
import { ContentDto } from "./ContentDto";

export class CreateEntryDto {
	@Matches(Regex.onlyLetters)
	public spaceName: string;

	@Matches(Regex.onlyLetters)
	public contentTypeName: string;

	@ValidateNested()
	public content: ContentDto[];
}
