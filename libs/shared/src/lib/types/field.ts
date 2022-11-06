import { ContentTypeDto } from "./contentType";
import { EntryDto } from "./entry";
import { Timestamps } from "./repository";

export enum FieldType {
	INTEGER = "integer",
	DECIMAL = "decimal",
	DATE = "date",
	RICH_TEXT = "rich-text",
	TEXT = "text",
	LOCATION = "location",
}

export interface FieldDto extends Timestamps {
	id: string;
	name: string;
	type: FieldType;
	contentType?: ContentTypeDto;
	entries?: EntryDto[];
}

export const FieldTypeValues = Object.values(FieldType);
