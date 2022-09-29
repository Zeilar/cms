import { FieldDto } from "./field";
import { SpaceDto } from "./space";

export interface ContentTypeDto {
	id: string;
	name: string;
	space?: SpaceDto;
	fields?: FieldDto[];
}
