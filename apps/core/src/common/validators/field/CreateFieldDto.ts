import {
	FieldType,
	FieldTypeValues,
	CreateFieldDto as ICreateFieldDto,
	Regex,
	FieldValidation,
} from "@shared";
import { IsString, Length, Matches } from "class-validator";

export class CreateFieldDto implements ICreateFieldDto {
	@IsString()
	public contentTypeName: string;

	@Matches(Regex.onlyLetters)
	@Length(FieldValidation.NAME_MIN_LENGTH, FieldValidation.NAME_MAX_LENGTH)
	public name: string;

	@Matches(`^(${FieldTypeValues.join("|")})$`)
	public type: FieldType;
}
