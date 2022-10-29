import { FieldDto } from "./field";
import { Timestamps } from "./repository";

export interface EntryDto extends Timestamps {
	id: string;
	field?: FieldDto;
}
