import { FieldType, FieldTypeValues, CreateFieldDto as ICreateFieldDto } from "@shared";
import { IsString, Matches } from "class-validator";

export class CreateFieldDto implements ICreateFieldDto {
	@IsString()
	public contentTypeName: string;

	@IsString()
	public name: string;

	@Matches(`^(${FieldTypeValues.join("|")})$`)
	public type: FieldType;
}
