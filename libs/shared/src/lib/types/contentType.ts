import { FieldDto } from "./field";
import { Timestamps } from "./repository";

export interface ContentTypeDto extends Timestamps {
	id: string;
	name: string;
	fields: FieldDto[];
}
