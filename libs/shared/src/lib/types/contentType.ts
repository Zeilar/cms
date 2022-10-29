import { FieldDto } from "./field";
import { Timestamps } from "./repository";
import { SpaceDto } from "./space";

export interface ContentTypeDto extends Timestamps {
	id: string;
	name: string;
	space?: SpaceDto;
	fields?: FieldDto[];
}
