import { FieldType, FieldTypeValues } from "@shared";
import { IsString, IsUUID, Matches } from "class-validator";

export class CreateFieldDto {
	@IsUUID("4")
	public contentTypeId: string;

	@IsString()
	public name: string;

	@Matches(`^(${FieldTypeValues.join("|")})$`)
	public type: FieldType;
}
