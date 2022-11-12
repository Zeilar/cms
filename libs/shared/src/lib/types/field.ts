import { Timestamps } from "./repository";

export enum FieldType {
	INTEGER = "integer",
	DATE = "date",
	RICH_TEXT = "rich-text",
	TEXT = "text",
	LOCATION = "location",
	BOOLEAN = "boolean",
	JSON = "json",
}

export interface FieldDto extends Timestamps {
	id: string;
	name: string;
	type: FieldType;
}

export interface CreateFieldDto {
	contentTypeName: string;
	name: string;
	type: FieldType;
}

export const FieldTypeValues = Object.values(FieldType);
