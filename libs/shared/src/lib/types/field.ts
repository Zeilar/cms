import { ContentTypeDto } from "./contentType";
import { EntryDto } from "./entry";
import { Timestamps } from "./repository";

export enum FieldType {
	INTEGER = "integer",
	DECIMAL = "decimal",
	DATE = "date",
	RICH_TEXT = "rich-text",
	TEXT_SHORT = "text-short",
	TEXT_LONG = "text-long",
	LOCATION = "location",
}

export interface FieldDto extends Timestamps {
	id: string;
	name: string;
	type: FieldType;
	contentType?: ContentTypeDto;
	entries?: EntryDto[];
}

export const FieldTypeKeys = Object.keys(FieldType) as (keyof typeof FieldType)[];
export const FieldTypeValues = Object.values(FieldType);
