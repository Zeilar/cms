import { EntryContentData, FieldType, Regex } from "@shared";
import { Matches } from "class-validator";
import { IsContent } from "./IsContent";

export class ContentDto {
	@Matches(Regex.onlyLetters)
	public field: string;

	@Matches(Regex.fieldType)
	public type: FieldType;

	@IsContent()
	public data: EntryContentData;
}
